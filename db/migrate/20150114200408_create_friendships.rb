class CreateFriendships < ActiveRecord::Migration
  def change
    create_table :friendships do |t|
      t.integer :sender_id, null: false
      t.integer :reciever_id, null: false
      t.string :status, null: false

      t.timestamps
    end

    add_index :friendships, :sender_id
    add_index :friendships, :reciever_id
  end
end
