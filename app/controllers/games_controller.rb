class GamesController < ApplicationController

  before_action :require_signed_in!, only: [:new, :edit, :create, :update, :destroy]
  before_action :must_be_author, only: [:edit, :update, :destroy]

  def index
    @games = Game.all
  end

  def show
    @game = Game.find(params[:id])
  end

  def new
    @game = Game.new
  end

  def create
    @game = current_user.authored_games.new(game_params)
    if @game.save
      redirect_to game_url(@game)
    else
      flash.now[:errors] = @game.errors.full_messages
      render :new
    end
  end

  def edit
  end

  def update
    if @game.update(game_params)
      redirect_to game_url(@game)
    else
      render :edit
    end
  end

  def destroy
    @game.destroy
    redirect_to games_url
  end

  private
  def game_params
    params.require(:game).permit(:title, :description, :synopsis, :price, tag_ids: [], :cover_image)
  end

  def must_be_author
    @game = Game.find(params[:id])
    flash[:errors] = "You do not own this game."
    redirect_to game_url(@game) if @game.author_id != current_user.id
  end
end
