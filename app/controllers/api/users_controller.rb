class Api::UsersController < Api::BaseController

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
      render json: {errors: @user.errors.full_messages}, status: :unprocessable_entity
    end
  end

  private
  def user_params
    params.require(:user).permit(:password, :username, :email)
  end
end
