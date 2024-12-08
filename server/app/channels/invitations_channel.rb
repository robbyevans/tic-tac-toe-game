# app/channels/invitations_channel.rb

module InvitationsChannel
  class InvitationsChannel < ApplicationCable::Channel
    def subscribed
      # Stream from "invitations:<user_id>" where <user_id> is the current user's ID
      stream_from "invitations:#{current_user.id}"
    end

    def unsubscribed
      # Any cleanup needed when channel is unsubscribed
    end
  end
end
