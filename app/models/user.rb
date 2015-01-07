class User < ActiveRecord::Base
  validates :username, :password_digest, :email, presence: true
  validates :username, :email, uniqueness: true
  validates :password, length: {minimum: 6, allow_nil: true}

  has_many :authored_games,
    class_name: "Game",
    foreign_key: :author_id

  attr_reader :password

  after_initialize :ensure_session_token

  def self.find_by_creds(username, password)
    user = User.find_by_username(username)

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

end
