json.extract!(@game, :id, :title, :synopsis, :description)

json.price(@game.round_price)

json.cover_image_url asset_path(@game.cover_image.url)

json.author do
  json.(@game.author, :id, :username)
end

json.screenshots @game.screenshots do |screenshot|
  json.(screenshot, :id, :image_url)
end

json.tags @game.tags do |tag|
  json.(tag, :id, :name)
end
