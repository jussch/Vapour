class AddSaleTypeToGames < ActiveRecord::Migration
  def change
    add_column :games, :sale_type, :string, default: "NORMAL"
  end
end
