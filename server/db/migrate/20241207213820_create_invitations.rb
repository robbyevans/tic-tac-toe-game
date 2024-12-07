class CreateInvitations < ActiveRecord::Migration[7.0]
  def change
    create_table :invitations do |t|
      t.references :sender, null: false, foreign_key: true
      t.references :receiver, null: false, foreign_key: true
      t.string :status

      t.timestamps
    end
  end
end
