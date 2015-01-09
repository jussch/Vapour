class Api::UsersController < Api::BaseController

  def show
    @user = User.find(params[:id])
    render :show
  end

  private
  def user_params
    params.require(:user).permit(:password, :username, :email)
  end
end
