module Api
  module V1
    class RegistrationsController < ApplicationController
      skip_before_action :authenticate_user, only: [:create]

      def create
        user = User.new(user_params)

        if user.save
          # Attach avatar if provided
          if params[:user][:avatar]
            user.avatar.attach(params[:user][:avatar])
            user.avatar_url = url_for(user.avatar) if user.avatar.attached?
            user.save
          end

          token = encode_token({ user_id: user.id })
          render json: { user: user_response(user), token: token }, status: :created
        else
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def user_params
        params.require(:user).permit(:username, :pin, :email, :password)
      end

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
