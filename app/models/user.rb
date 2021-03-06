class User < ActiveRecord::Base
  validates :username, :password_digest, :email, :funds, :alias, presence: true
  validates :username, :email, uniqueness: true
  validates :password, length: {minimum: 6, allow_nil: true}
  validates :funds, numericality: { greater_than_or_equal_to: 0}

  has_attached_file :avatar, default_url: "missing.jpg"
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/

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

  has_many :sent_requests,
    -> {where status: "REQUESTED"},
    dependent: :destroy,
    class_name: "Friendship",
    foreign_key: :sender_id
  has_many :recieved_requests,
    -> {where status: "PENDING"},
    dependent: :destroy,
    class_name: "Friendship",
    foreign_key: :sender_id
  has_many :completed_friendships,
    -> {where status: "APPROVED"},
    dependent: :destroy,
    class_name: "Friendship",
    foreign_key: :sender_id
  has_many :friends, through: :completed_friendships, source: :reciever

  has_many :games, through: :transactions, source: :game
  has_many :bought_games, through: :complete_transactions, source: :game
  has_many :games_in_cart, through: :pending_transactions, source: :game

  attr_reader :password

  after_initialize :ensure_session_token, :ensure_funds, :ensure_alias

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

  def round_funds
    '%.2f' % [(self.funds * 100).round / 100.0]
  end

  private
  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end

  def ensure_funds
    self.funds ||= 0
  end

  def ensure_alias
    self.alias ||= self.username
  end

end
