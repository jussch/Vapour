class GamesController < ApplicationController

  before_action :require_signed_in!, only: [:new, :edit, :create, :update, :destroy]

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

  def destroy
    game = Game.find(params[:id])
  end

  private
  def game_params
    params.require(:game).permit(:title, :description, :synopsis, :price, tag_ids: [])
  end
end
