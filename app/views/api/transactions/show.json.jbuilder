json.(@transaction, :id, :user_id, :game_id)

json.game @transaction.game, :id, :title, :price
