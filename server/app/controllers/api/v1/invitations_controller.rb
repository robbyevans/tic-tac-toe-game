# app/controllers/api/v1/invitations_controller.rb

module Api
  module V1
    class InvitationsController < ApplicationController
      before_action :authenticate_user

      def create
        receiver = User.find(params[:receiver_id])

        # Prevent sending invitations to oneself
        if receiver == current_user
          render json: { errors: ["You cannot invite yourself"] }, status: :unprocessable_entity
          return
        end

        # Check if an invitation already exists
        existing_invitation = current_user.sent_invitations.find_by(receiver: receiver, status: 'pending')

        if existing_invitation
          render json: { errors: ["An invitation to this user is already pending"] }, status: :unprocessable_entity
          return
        end

        invitation = current_user.sent_invitations.build(receiver: receiver, status: "pending")

        if invitation.save
          # Broadcast to receiver via Action Cable, include sender_avatar_url
          ActionCable.server.broadcast "invitations:#{receiver.id}", {
            invitation_id: invitation.id,
            sender_id: current_user.id,
            sender_username: current_user.username,
            sender_avatar_url: current_user.avatar_url, # Added
            status: invitation.status
          }

          render json: { invitation: invitation }, status: :created
        else
          render json: { errors: invitation.errors.full_messages }, status: :unprocessable_entity
        end
      rescue ActiveRecord::RecordNotFound
        render json: { errors: ["Receiver not found"] }, status: :not_found
      end

      def respond
        invitation = current_user.received_invitations.find(params[:id])

        if invitation.update(status: params[:status])
          if invitation.accepted?
            # Create a new game between sender and receiver
            game = Game.create(
              player1: invitation.sender,
              player2: current_user,
              status: 'ongoing'
            )

            # Broadcast the game creation to both players
            ActionCable.server.broadcast "games:#{game.player1.id}", {
              game_id: game.id,
              opponent_id: game.player2.id,
              opponent_username: game.player2.username,
              status: game.status
            }

            ActionCable.server.broadcast "games:#{game.player2.id}", {
              game_id: game.id,
              opponent_id: game.player1.id,
              opponent_username: game.player1.username,
              status: game.status
            }
          end

          render json: { invitation: invitation }, status: :ok
        else
          render json: { errors: invitation.errors.full_messages }, status: :unprocessable_entity
        end
      rescue ActiveRecord::RecordNotFound
        render json: { errors: ["Invitation not found"] }, status: :not_found
      end

      private

      def invitation_params
        params.require(:invitation).permit(:receiver_id)
      end
    end
  end
end
