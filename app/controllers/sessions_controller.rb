class SessionsController < ApplicationController

  before_action :require_logged_out!, only: [:new, :create]

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
      @user = User.new(username: params[:user][:username])
      render :new
    end
  end

  def destroy
    sign_out
    redirect_to new_sessions_url
  end

end
