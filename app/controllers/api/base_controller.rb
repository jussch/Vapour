class Api::BaseController < ApplicationController

  def require_signed_in!
    unless signed_in?
      render json: {errors: ["you must be signed in"]}, status: :unprocessable_entity
    end
  end

end
