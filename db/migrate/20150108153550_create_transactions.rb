class CreateTransactions < ActiveRecord::Migration
  def change
    create_table :transactions do |t|
      t.integer :user_id, null: false
      t.integer :game_id, null: false
      t.string :status, null: false
      t.timestamps
    end

    add_index :transactions, :user_id
    add_index :transactions, :game_id

    add_column :users, :funds, :decimal, scale: 2, precision: 10
  end
end
