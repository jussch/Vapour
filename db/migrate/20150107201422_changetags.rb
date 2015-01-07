class Changetags < ActiveRecord::Migration
  def change
    remove_column :tags, :type
    add_column :tags, :name, :string
  end
end
