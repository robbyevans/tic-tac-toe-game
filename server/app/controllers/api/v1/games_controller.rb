# app/controllers/api/v1/games_controller.rb

module Api
  module V1
    class GamesController < ApplicationController
      before_action :set_game, only: [:show, :update_move]

      def create
        game = Game.create(player1: current_user, status: "waiting", moves: [])
        render json: { game: game.as_json }, status: :created
      end

      def show
        render json: { game: @game.as_json }, status: :ok
      end

      def update_move
        if @game.ongoing?
          move = params[:move].to_i
          # Validate move
          if move < 0 || move > 8 || @game.moves.any? { |m| m[:move] == move }
            render json: { errors: ["Invalid move"] }, status: :unprocessable_entity
            return
          end

          # Determine current player
          current_turn = @game.moves.size.even? ? "X" : "O"
          current_player = current_turn == "X" ? @game.player1 : @game.player2

          if current_player != current_user
            render json: { errors: ["Not your turn"] }, status: :forbidden
            return
          end

          # Record the move
          @game.moves << { player_id: current_user.id, move: move }
          @game.save

          # Check for winner
          winner = check_winner(@game.moves)
          if winner
            @game.update(winner: current_turn == "X" ? @game.player1 : @game.player2, status: "finished")
            # Increment stars
            @game.winner.increment!(:stars)
          elsif @game.moves.size >= 9
            @game.update(status: "finished")
          else
            @game.update(status: "ongoing")
          end

          # Broadcast the updated game state
          GamesChannel.broadcast_to(@game, { game: @game.as_json })

          render json: { game: @game.as_json }, status: :ok
        else
          render json: { errors: ["Game is not ongoing"] }, status: :unprocessable_entity
        end
      end

      private

      def set_game
        @game = Game.find(params[:id])
      end

      def check_winner(moves)
        board = Array.new(9, nil)
        moves.each_with_index do |move, index|
          board[move[:move]] = move[:player_id] == @game.player1.id ? "X" : "O"
        end

        winning_combinations = [
          [0,1,2], [3,4,5], [6,7,8], # Rows
          [0,3,6], [1,4,7], [2,5,8], # Columns
          [0,4,8], [2,4,6]           # Diagonals
        ]

        winning_combinations.each do |combo|
          if board[combo[0]] && board[combo[0]] == board[combo[1]] && board[combo[1]] == board[combo[2]]
            return board[combo[0]]
          end
        end

        return nil
      end
    end
  end
end
