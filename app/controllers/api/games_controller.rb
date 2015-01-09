class Api::GamesController < Api::BaseController

  before_action :ensure_correct_author, only: [:update, :destroy]
  before_action :require_signed_in!, only: [:new, :edit, :create, :update, :destroy]

  def index
    @games = Game.all
  end

  def show
    @game = Game.find(params[:id])
  end

  def create
    @game = current_user.authored_games.new(game_params)
    if @game.save
      render json: @game
    else
      render json: @game.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    if @game.update(game_params)
      render json: @game
    else
      render json: @game.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @game.destroy
    render json: @game
  end

  private
  def game_params
    params.require(:game).permit(:title, :description, :synopsis, :price, tag_ids: [])
  end

  def ensure_correct_author
    @game = Game.find(params[:id])
    unless @game.author_id == current_user.id
      render json: "you don't have access to that" and return
    end
  end

end
