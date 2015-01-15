class Api::FriendshipsController < Api::BaseController

  before_action :api_require_signed_in!

  def create
    @reciever = User.find(params[:friendship][:reciever_id])
    fs = current_user.sent_requests.new(reciever_id: @reciever.id)
    fr = @reciever.recieved_requests.new(reciever_id: current_user.id)
    fr.inverse, fs.inverse = fs, fr
    if fs.valid? && fr.valid?
      fs.save && fr.save
      render json: {notices: ["Friend Request Sent"]}
    else
      errors = fs.errors.full_messages + fr.errors.full_messages
      render json: {errors: errors}, status: :unprocessable_entity
    end
  end

  def destroy
    @friendship = Friendship.find(params[:id])
    @friendship.destroy
    render json: {notices: ["Unfriended"]}
  end

  def approve
    @friendship = Friendship.find(params[:id])
    if (@friendship.status == "PENDING" &&
        @friendship.sender_id == current_user.id)
      @friendship.status, @friendship.inverse.status = "APPROVED", "APPROVED"
      @friendship.save && @friendship.inverse.save
      render json: {notices: ["Friendship accepted"]}
    else
      render json: {errors: ["unable to accept that friendship"]},
        status: :unprocessable_entity
    end
  end

end
