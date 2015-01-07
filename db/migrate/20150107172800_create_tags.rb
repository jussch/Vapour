class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.integer :game_id, null: false
      t.string :type, null: false

      t.timestamps
    end

    add_index :tags, :game_id
  end
end
