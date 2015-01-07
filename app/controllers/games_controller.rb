class GamesController < ApplicationController

  def index
    @games = Game.all
  end

  def show
    @game = Game.find(params[:id])
  end

  def new
    require_signed_in!
    @game = Game.new
  end

  def create
    @game = Game.new(game_params)
    @game.author_id = current_user.id
    if @game.save
      redirect_to game_url(@game)
    else
      render :new
    end
  end

  def edit
    require_signed_in!
    @game = Game.find(params[:id])
    redirect_to game_url(@game) if @game.author_id != current_user.id
  end

  def update
    @game = Game.find(params[:id])
    if @game.update(game_params)
      redirect_to game_url(@game)
    else
      render :edit
    end
  end

  private
  def game_params
    params.require(:game).permit(:title, :description, :synopsis, :price)
  end
end
