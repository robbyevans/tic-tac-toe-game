module Api
  module V1
    class UsersController < ApplicationController
      before_action :authenticate_user
      
      def show
        user = User.find(params[:id])
        render json: {
          id: user.id,
          username: user.username,
          avatar_url: user.avatar_url,
          stars: user.stars
        }, status: :ok
      rescue ActiveRecord::RecordNotFound
        render json: { errors: ["User not found"] }, status: :not_found
      end
    end
  end
end
