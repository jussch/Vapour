class AddFileToScreenshots < ActiveRecord::Migration
  def change
  	change_table :screenshots do |t|
      t.attachment :file
    end
  end
end
