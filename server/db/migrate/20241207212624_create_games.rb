class CreateGames < ActiveRecord::Migration[7.0]
  def change
    create_table :games do |t|
      t.references :player1, null: false, foreign_key: { to_table: :users }
      t.references :player2, foreign_key: { to_table: :users }
      t.references :winner, foreign_key: { to_table: :users }
      t.string :status, null: false, default: "waiting"
      t.text :moves

      t.timestamps
    end
  end
end
