json.array! @games do |game|
  json.(game, :id, :title, :price)

  json.tags game.tags do |tag|
    json.(tag, :id, :name)
  end
end
