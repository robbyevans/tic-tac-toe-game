module Api
  module V1
    class PlayersController < ApplicationController
      def available
        # Current logic:
        ongoing_game_ids = Game.where(status: :ongoing).pluck(:player1_id, :player2_id).flatten
        available_users = User.where.not(id: ongoing_game_ids).where.not(id: current_user.id)

        # Classify users based on last_seen_at
        now = Time.current
        online_users = available_users.select { |u| u.last_seen_at && u.last_seen_at > now - 5.minutes }
        recent_users = available_users.select { |u| u.last_seen_at && u.last_seen_at <= now - 5.minutes && u.last_seen_at > now - 1.hour }
        offline_users = available_users.select { |u| u.last_seen_at.nil? || u.last_seen_at <= now - 1.hour }

        # Combine in desired order: online first, then recent, then offline
        ordered_users = online_users + recent_users + offline_users

        render json: ordered_users.map { |u|
          {
            id: u.id,
            username: u.username,
            avatar_url: u.avatar_url,
            stars: u.stars,
            last_seen_at: u.last_seen_at
          }
        }, status: :ok
      end
    end
  end
end
