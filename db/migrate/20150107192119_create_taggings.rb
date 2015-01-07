class CreateTaggings < ActiveRecord::Migration
  def change
    create_table :taggings do |t|
      t.integer :game_id, null: false
      t.integer :tag_id, null: false
      t.timestamps
    end

    add_index :taggings, :game_id
    add_index :taggings, :tag_id

    remove_column :tags, :game_id
  end
end
