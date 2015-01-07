class UsersController < ApplicationController

  before_action :require_logged_out!, only: [:new, :create]

  def show
    @user = User.find(params[:id])
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      sign_in(@user)
      redirect_to games_url
    else
      render :new
    end
  end

  private
  def user_params
    params.require(:user).permit(:password, :username, :email)
  end

end
