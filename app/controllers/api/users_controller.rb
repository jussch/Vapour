class Api::UsersController < Api::BaseController

  def index
    @users = User.includes(:bought_games).all
  end

  def show
    @user = User.find(params[:id])
    render :show
  end

  def current
    if signed_in?
      @user = current_user
      render :show
    else
      render json: {notices: ["no current user"]}
    end
  end

  def create
    @user = User.new(user_params)
    puts user_params
    if @user.save
      sign_in(@user)
      render :show
    else
      render json: {errors: @user.errors.full_messages},
        status: :unprocessable_entity
    end
  end

  def add_funds
    @user = User.find(params[:id])
    new_funds = @user.funds + params[:add_funds].to_f
    @user.update(funds: new_funds)
    render json: {notices: ["funds have been added"]}
  end

  private
  def user_params
    params.require(:user).permit(:password, :username, :email)
  end
end
