json.array! @users do |user|
  json.(user, :id, :username, :funds, :alias)

  json.bought_games user.bought_games do |game|
    json.(game, :id, :title)
  end

  json.avatar_url asset_path(user.avatar.url)
end
