json.array! @games do |game|
  json.(game, :id, :title)
end
