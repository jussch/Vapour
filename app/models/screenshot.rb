class Screenshot < ActiveRecord::Base
  validates :game, :image_url, presence: true
  validates_uniqueness_of :image_url, scope: :game_id

  belongs_to :game
end
