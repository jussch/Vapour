class Api::GamesController < ApplicationController

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
    @game = Game.find(params[:id])
    unless @game.author_id == current_user.id
      render json: "you don't have access to that"
      return
    end
    if @game.update(game_params)
      render json: @game
    else
      render json: @game.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @game = Game.find(params[:id])
    unless @game.author_id == current_user.id
      render json: "you don't have access to that"
      return
    end
    @game.destroy
    redirect_to games_url
  end

  private
  def game_params
    params.require(:game).permit(:title, :description, :synopsis, :price, tag_ids: [])
  end

end
