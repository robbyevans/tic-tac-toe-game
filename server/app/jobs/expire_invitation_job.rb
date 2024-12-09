class ExpireInvitationJob < ApplicationJob
  queue_as :default

  def perform(invitation_id)
    invitation = Invitation.find_by(id: invitation_id, status: "pending")
    if invitation
      invitation.update(status: "expired") # Update the status
      ActionCable.server.broadcast(
        "invitations:#{invitation.receiver_id}",
        {
          type: "INVITATION_EXPIRED",
          invitation_id: invitation.id
        }
      )
    end
  end
end
