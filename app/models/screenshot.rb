class Screenshot < ActiveRecord::Base
  validates :game, presence: true

  has_attached_file :file, default_url: "missing_game.jpg"
  validates_attachment_content_type :file, content_type: /\Aimage\/.*\Z/

  belongs_to :game

  def get_image_url
  	self.image_url.empty? ? self.file.url : self.image_url
  end
end
