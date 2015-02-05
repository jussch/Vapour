class Api::ScreenshotsController < Api::BaseController

  def show
    @screenshot = Screenshot.find(params[:id])
  end

  def create
    @screenshot = Screenshot.new(screenshot_params)
    if @screenshot.save
      render json: @screenshot
    else
      render json: {errors: @screenshot.errors.full_messages}
    end
  end

  def destroy
    @screenshot = Screenshot.find(params[:id])
    @screenshot.destroy
    render json: @screenshot
  end

  private
  def screenshot_params
    params.require(:screenshot).permit(:image_url, :game_id, :file)
  end

end
