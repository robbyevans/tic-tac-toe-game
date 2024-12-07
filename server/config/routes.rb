# config/routes.rb

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post 'register', to: 'registrations#create'
      post 'login', to: 'sessions#create'

      get 'players/available', to: 'players#available'

      resources :invitations, only: [:create, :update]
      resources :games, only: [:create, :show] do
        member do
          put 'move', to: 'games#update_move'
        end
      end
    end
  end

  # Mount Action Cable
  mount ActionCable.server => '/cable'
end
