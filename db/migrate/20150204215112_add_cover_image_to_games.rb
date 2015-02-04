class AddCoverImageToGames < ActiveRecord::Migration
  def change
  	change_table :games do |t|
      t.attachment :cover_image
    end
  end
end
