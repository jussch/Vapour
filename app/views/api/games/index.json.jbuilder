json.array! @games do |game|
  json.(game, :id, :title, :sale_type)

  json.price(game.round_price)

  json.cover_image_url asset_path(game.cover_image.url)

  json.tags game.tags do |tag|
    json.(tag, :id, :name)
  end
end
