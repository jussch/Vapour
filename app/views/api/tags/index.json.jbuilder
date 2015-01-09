json.array! @tags do |tag|
  json.(tag, :id, :name)
end
