class Api::BaseController < ApplicationController

  def api_require_signed_in!
    unless signed_in?
      render json: {errors: ["you must be signed in"], type: "user_auth"}, status: :unprocessable_entity
    end
  end

end
