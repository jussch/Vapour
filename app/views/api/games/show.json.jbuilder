json.extract!(@game, :id, :title, :synopsis, :description, :price)

json.author do
  json.(@game.author, :id, :username)
end

json.screenshots @game.screenshots do |screenshot|
  json.(screenshot, :id, :image_url)
end
