class Tag < ActiveRecord::Base
  validates :type, :game_id, presence: true
  validates_uniqueness_of :type, scope: :game_id
  validates :type, inclusion: { in: VALID_TAGS }

  VALID_TAGS = %w(role-playing action adventure simulation strategy sports
    first-person third-person puzzle survival singleplayer multiplayer
    co-op indie casual horror)

  belongs_to :game, inverse_of: :tags
end
