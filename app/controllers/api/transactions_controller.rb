class Api::TransactionsController < Api::BaseController

  before_action :api_require_signed_in!

  def index #cart
    @transactions = current_user.pending_transactions.includes(:game)
  end

  def create
    @transaction = current_user.transactions.new(transaction_params)
    if @transaction.save
      render :show
    else
      render json: {errors: ["You already own this game!"]},
        status: :unprocessable_entity
    end
  end

  def destroy
    transaction = Transaction.find(params[:id])
    transaction.destroy
    render json: {notices: ["The game has been successfully removed"]}
  end

  def complete
    if checkout_transactions
      render json: {notices: ["The games have been added to your library"]}
    else
      render json: {errors: ["Not enough Funds: please make more money."]},
        status: :unprocessable_entity
    end
  end

  private
  def transaction_params
    params.require(:transaction).permit(:game_id)
  end

  def checkout_transactions
    @transactions = current_user.pending_transactions.includes(:game)
    new_funds = current_user.funds
    success = false
    begin
      Transaction.transaction do
        @transactions.each do |transaction|
          transaction.complete!
          new_funds -= transaction.game.price
        end
        current_user.update!(funds: new_funds)
        success = true
      end
    rescue ActiveRecord::RecordInvalid => e
    end
    success
  end

end
