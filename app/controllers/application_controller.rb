class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user, :signed_in?

  private
  def current_user
    @current_user ||= User.find_by_session_token(session[:token])
  end

  def signed_in?
    !!current_user
  end

  def sign_in(user)
    @current_user = user
    session[:token] = user.reset_token!
  end

  def sign_out
    current_user.try(:reset_token!)
    session[:token] = nil
  end

  def require_signed_in!
    unless signed_in?
      flash[:errors] = "You must be logged in"
      redirect_to new_sessions_url
    end
  end

  def require_logged_out!
    if signed_in?
      flash[:errors] = "You must be logged out"
      redirect_to games_url
    end
  end

end
