class TransactionsController < ApplicationController

  before_action :require_signed_in!

  def index #cart
    @transactions = current_user.pending_transactions.includes(:game)
  end

  def create
    @transaction = current_user.transactions.new(transaction_params)
    if @transaction.save
      redirect_to transactions_url
    else
      redirect_to game_url(@transaction.game_id)
    end
  end

  def destroy
    transaction = Transaction.find(params[:transaction_id])
    transaction.destroy
    redirect_to transactions_url
  end

  def complete
    if checkout_transactions
      redirect_to user_url(current_user)
    else
      redirect_to transactions_url
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
      flash[:errors] = "not enough funds, please add more funds"
    end
    success
  end
end
