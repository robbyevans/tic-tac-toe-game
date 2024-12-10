module Api
  module V1
    class InvitationsController < ApplicationController
      before_action :authenticate_user

      def create
        receiver = User.find(params[:receiver_id])
        
        # Prevent sending invitations to oneself
        if receiver == current_user
          return render_error("You cannot invite yourself", :unprocessable_entity)
        end

        # Prevent duplicate pending invitations
        if Invitation.exists?(sender_id: current_user.id, receiver_id: receiver.id, status: "pending")
          return render_error("You already have a pending invitation for this user", :unprocessable_entity)
        end

        invitation = current_user.sent_invitations.build(receiver: receiver, status: "pending")

        if invitation.save
          # Schedule the expiration job
          ExpireInvitationJob.set(wait: 30.seconds).perform_later(invitation.id)

          # Broadcast the new invitation
          ActionCable.server.broadcast(
            "invitations:#{receiver.id}",
            {
              type: "NEW_INVITATION",
              invitation: invitation.as_json(
                only: [:id, :sender_id, :status],
                methods: [:sender_username, :sender_avatar_url]
              )
            }
          )
          render json: invitation, status: :created
        else
          render json: { errors: invitation.errors.full_messages }, status: :unprocessable_entity
        end
      rescue ActiveRecord::RecordNotFound
        render_error("Receiver not found", :not_found)
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
      
            # Broadcast game creation to both players
           
               ActionCable.server.broadcast "invitations:#{game.player1.id}", {
                  type: "GAME_STARTED",
                  game_id: game.id
                }
              
             
               ActionCable.server.broadcast "invitations:#{game.player2.id}", {
                  type: "GAME_STARTED",
                  game_id: game.id
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

      def render_error(message, status)
        render json: { errors: [message] }, status: status
      end

      def invitation_params
        params.require(:invitation).permit(:receiver_id)
      end
    end
  end
end
