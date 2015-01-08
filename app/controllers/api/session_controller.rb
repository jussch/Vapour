class Api::SessionController < ApplicationController

  def create
    @user = User.find_by_creds(
      params[:user][:username],
      params[:user][:password]
    )
    if @user
      sign_in(@user)
      render json: @user
    else
      @user = User.new(username: params[:user][:username])
      render json: {errors: "invalid username or password"}, status: :unprocessable_entity
    end
  end

  def destroy
    sign_out
    render json: {notice: "signed out"}
  end


end
