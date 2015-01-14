class Friendship < ActiveRecord::Base
  validates :sender_id, :reciever_id, :status, :inverse, presence: true
  VALID_STATUSES = %w(APPROVED PENDING REQUESTED)
  validates :status, inclusion: { in: VALID_STATUSES }
  validate :sender_is_not_reciever

  belongs_to :sender,
    class_name: "User",
    foreign_key: :sender_id

  belongs_to :reciever,
    class_name: "User",
    foreign_key: :reciever_id

  belongs_to :inverse,
    dependent: :destroy,
    inverse_of: :inverse,
    class_name: "Friendship",
    foreign_key: :inverse_id

  private
  def sender_is_not_reciever
    if self.sender_id == self.reciever_id
      errors.add(:reciever_id, "cannot friend yourself")
      errors.add(:sender_id, "cannot friend yourself")
    end
  end

end
