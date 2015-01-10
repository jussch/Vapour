json.array! @users do |user|
  json.(user, :id, :username, :funds)

  json.bought_games user.bought_games do |game|
    json.(game, :id, :title)
  end
end
