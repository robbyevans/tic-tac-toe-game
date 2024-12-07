# app/controllers/api/v1/players_controller.rb

module Api
  module V1
    class PlayersController < ApplicationController
      def available
        # List users who are not currently in an ongoing game
        ongoing_game_ids = Game.where(status: :ongoing).pluck(:player1_id, :player2_id).flatten
        available_users = User.where.not(id: ongoing_game_ids).where.not(id: current_user.id)

        render json: available_users.as_json(only: [:id, :username, :avatar_url, :stars]), status: :ok
      end
    end
  end
end
