json.extract!(@user, :id, :username, :funds)

json.bought_games @user.bought_games do |game|
  json.(game, :id, :title)
end

json.friends @user.friends do |friend|
  json.(friend, :id, :username)
end

json.is_current_user (@user.id == current_user.try(:id))
if (@user.id == current_user.try(:id))

  json.recieved_requests @user.recieved_requests do |friendship|
    json.(friendship, :id, :reciever_id)
  end

  json.sent_requests @user.sent_requests do |friendship|
    json.(friendship, :id, :reciever_id)
  end

end
