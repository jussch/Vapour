class User < ActiveRecord::Base
  validates :username, :password_digest, :email, :funds, presence: true
  validates :username, :email, uniqueness: true
  validates :password, length: {minimum: 6, allow_nil: true}
  validates :funds, numericality: { greater_than_or_equal_to: 0}

  has_many :authored_games,
    class_name: "Game",
    foreign_key: :author_id

  has_many :transactions, dependent: :destroy
  has_many :complete_transactions,
    -> {where status: "COMPLETE"},
    class_name: "Transaction",
    dependent: :destroy
  has_many :pending_transactions,
    -> {where status: "PENDING"},
    class_name: "Transaction",
    dependent: :destroy
    
  has_many :games, through: :transactions, source: :game
  has_many :bought_games, through: :complete_transactions, source: :game
  has_many :games_in_cart, through: :pending_transactions, source: :game

  attr_reader :password

  after_initialize :ensure_session_token, :ensure_funds

  def self.find_by_creds(username, password)
    user = User.find_by_username(username)
    if user && user.is_password?(password)
      user
    else
      nil
    end
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_token!
    self.session_token = SecureRandom.urlsafe_base64
    self.save!
    self.session_token
  end

  private
  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end

  def ensure_funds
    self.funds ||= 0
  end

end
