class CreateScreenshots < ActiveRecord::Migration
  def change
    create_table :screenshots do |t|
      t.integer :game_id
      t.string :image_url

      t.timestamps
    end

    add_index :screenshots, :game_id
  end
end
