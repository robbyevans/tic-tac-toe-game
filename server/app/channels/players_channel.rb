# app/channels/players_channel.rb
class PlayersChannel < ApplicationCable::Channel
  def subscribed
    stream_from "players_channel"
  end

  def unsubscribed
    # cleanup
  end
end
