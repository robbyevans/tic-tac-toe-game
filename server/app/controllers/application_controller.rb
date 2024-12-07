# app/controllers/application_controller.rb
class ApplicationController < ActionController::API
  before_action :authenticate_user

  private

  def authenticate_user
    header = request.headers['Authorization']
    Rails.logger.info "AuthenticateUser: Authorization header: #{header.inspect}"

    if header.present?
      token = header.split(' ').last
      Rails.logger.info "AuthenticateUser: Extracted token: #{token}"
      decoded = decode_token(token)
      Rails.logger.info "AuthenticateUser: Decoded token: #{decoded.inspect}"
      @current_user = User.find(decoded["user_id"])
      Rails.logger.info "AuthenticateUser: Current user: #{@current_user.inspect}"
    else
      Rails.logger.info "AuthenticateUser: No Authorization header present"
      render json: { errors: ["Unauthorized"] }, status: :unauthorized
    end
  rescue ActiveRecord::RecordNotFound, JWT::DecodeError => e
    Rails.logger.error "AuthenticateUser: Error decoding token - #{e.message}"
    render json: { errors: ["Unauthorized"] }, status: :unauthorized
  end

  def current_user
    @current_user
  end

  def decode_token(token)
    JWT.decode(token, Rails.application.credentials.jwt_secret, true, algorithm: 'HS256')[0]
  end
end
