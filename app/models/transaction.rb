class Transaction < ActiveRecord::Base
  validates :game_id, :user_id, :status, presence: true
  validates_uniqueness_of :user_id, scope: :game_id
  validates :status, inclusion: { in: %w(PENDING COMPLETE)}

  belongs_to :game
  belongs_to :user

  after_initialize :ensure_status

  def complete!
    self.status = "COMPLETE"
    self.save!
  end

  private
  def ensure_status
    self.status ||= "PENDING"
  end
end
