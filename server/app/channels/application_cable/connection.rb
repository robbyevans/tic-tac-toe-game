# app/channels/application_cable/connection.rb

module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
    end

    private

    def find_verified_user
      token = request.params[:token]
      return reject_unauthorized_connection unless token

      begin
        decoded = JWT.decode(token, Rails.application.credentials.jwt_secret)[0]
        user = User.find(decoded["user_id"])
        user
      rescue ActiveRecord::RecordNotFound, JWT::DecodeError
        reject_unauthorized_connection
      end
    end
  end
end
