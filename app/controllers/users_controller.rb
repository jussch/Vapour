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

  def add_funds
    @user = User.find(params[:id])
    new_funds = @user.funds + params[:user][:add_funds].to_f
    @user.update(funds: new_funds)
    redirect_to user_url(@user)
  end

  private
  def user_params
    params.require(:user).permit(:password, :username, :email)
  end

end
