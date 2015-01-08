json.extract!(@user, :id, :username, :funds)

json.bought_games @user.bought_games do |game|
  json.(game, :id, :title)
end

json.is_current_user (@user.id == current_user.try(:id))
