class Api::ScreenshotsController < ApplicationController
  def show
    @screenshot = Screenshot.find(params[:id])
  end
end
