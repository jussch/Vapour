class AddInverseFriendships < ActiveRecord::Migration
  def change
    add_column :friendships, :inverse_id, :integer
    add_index :friendships, :inverse_id
  end
end
