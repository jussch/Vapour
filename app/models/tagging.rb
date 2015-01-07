class Tagging < ActiveRecord::Base
  validates :game, :tag_id, presence: true
  validates_uniqueness_of :game_id, scope: :tag_id

  belongs_to :tag
  belongs_to :game
end
