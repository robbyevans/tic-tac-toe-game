# app/controllers/api/v1/invitations_controller.rb

module Api
  module V1
    class InvitationsController < ApplicationController
      before_action :set_invitation, only: [:update]

      def create
        receiver = User.find(params[:receiver_id])
        invitation = current_user.sent_invitations.build(receiver: receiver, status: "pending")

        if invitation.save
          # Broadcast to receiver via Action Cable
          InvitationsChannel.broadcast_to(receiver, { invitation: invitation.as_json(include: :sender) })
          render json: { message: "Invitation sent" }, status: :created
        else
          render json: { errors: invitation.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        if @invitation.update(status: params[:status])
          if @invitation.accepted?
            # Create a new game session
            game = Game.create(player1: @invitation.sender, player2: @invitation.receiver, status: :ongoing, moves: [])

            # Broadcast game start to both players
            GamesChannel.broadcast_to(@invitation.sender, { game: game.as_json })
            GamesChannel.broadcast_to(@invitation.receiver, { game: game.as_json })

            render json: { message: "Invitation accepted", game: game.as_json }, status: :ok
          else
            render json: { message: "Invitation declined" }, status: :ok
          end
        else
          render json: { errors: @invitation.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def set_invitation
        @invitation = Invitation.find(params[:id])
      end
    end
  end
end
