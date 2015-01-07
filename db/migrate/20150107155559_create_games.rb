class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string :title, null: false
      t.text :synopsis, null: false
      t.text :description, null: false
      t.decimal :price, scale: 2, precision: 6, null: false
      t.integer :author_id, null: false
      t.timestamps
    end

    add_index :games, :author_id
    add_index :games, :title
  end
end
