# app/models/game.rb

class Game < ApplicationRecord
  belongs_to :player1, class_name: "User"
  belongs_to :player2, class_name: "User", optional: true
  belongs_to :winner, class_name: "User", optional: true

  serialize :moves, Array

  enum status: { waiting: "waiting", ongoing: "ongoing", finished: "finished" }

  validates :player1, presence: true
  validates :status, presence: true

  def as_json(options = {})
    super(options.merge(only: [:id, :status, :player1_id, :player2_id, :winner_id, :moves]))
  end
end
