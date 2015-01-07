class SessionsController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.find_by_creds(
      params[:user][:username],
      params[:user][:password]
    )
    if @user
      sign_in(@user)
      redirect_to games_url
    else
      render :new
    end
  end

  def destroy
    sign_out
    redirect_to new_sessions_url
  end

end
