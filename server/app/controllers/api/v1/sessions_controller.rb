module Api
  module V1
    class SessionsController < ApplicationController
      skip_before_action :authenticate_user, only: [:create]

      def create
        user = User.find_by(username: params[:user][:username])
        if user&.authenticate(params[:user][:pin])
          token = encode_token({ user_id: user.id })
          render json: { user: user_response(user), token: token }, status: :ok
        else
          render json: { errors: ["Invalid username or PIN"] }, status: :unauthorized
        end
      end

      private

      def encode_token(payload)
        JWT.encode(payload, Rails.application.credentials.jwt_secret, 'HS256')
      end

      def user_response(user)
        {
          id: user.id,
          username: user.username,
          avatar_url: user.avatar_url || default_avatar_url(user),
          email: user.email,
          stars: user.stars
        }
      end

      def default_avatar_url(user)
        user.avatar.attached? ? url_for(user.avatar) : "https://example.com/default_avatar.png"
      end
    end
  end
end
