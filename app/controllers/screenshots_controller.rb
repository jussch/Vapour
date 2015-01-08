class ScreenshotsController < ApplicationController

  def new
    @screenshot = Screenshot.new
    @game = Game.find(params[:game_id])
  end

  def create
    @screenshot = Screenshot.new(screenshot_params)
    if @screenshot.save
      redirect_to game_url(@screenshot.game_id)
    else
      @game = Game.find(@screenshot.game_id)
      render :new
    end
  end

  def destroy
    @screenshot = Screenshot.find(params[:id])
    @screenshot.destroy
    redirect_to game_url(@screenshot.game_id)
  end

  private
  def screenshot_params
    params.require(:screenshot).permit(:image_url, :game_id)
  end

end
