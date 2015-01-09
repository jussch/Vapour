class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_creds(
      params[:username],
      params[:password]
    )
    if @user
      sign_in(@user)
      render json: @user
    else
      @user = User.new(username: params[:username])
      render json: {errors: ['incorrect username or password']}, status: :unprocessable_entity
    end
  end

  def destroy
    sign_out
    render json: {notices: ['signed out']}
  end

end
