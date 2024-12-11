# app/controllers/api/v1/registrations_controller.rb
def create
  user = User.new(user_params)
  if user.save
    token = encode_token({ user_id: user.id })
    # After creating a new user, broadcast the updated player list event
    ActionCable.server.broadcast("players_channel", { type: "PLAYER_LIST_UPDATED" })
    render json: { user: user_response(user), token: token }, status: :created
  else
    render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
  end
end
