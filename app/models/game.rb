class Game < ActiveRecord::Base
  include PgSearch
  pg_search_scope :search_by_title, against: :title, using: {tsearch: {prefix: true}}

  validates :title, :description, :synopsis, :author_id, :price, presence: true

  has_attached_file :cover_image, default_url: "missing_game.jpg"
  validates_attachment_content_type :cover_image, content_type: /\Aimage\/.*\Z/

  belongs_to :author,
    class_name: "User",
    foreign_key: :author_id

  has_many :taggings, inverse_of: :game, dependent: :destroy
  has_many :tags, through: :taggings, source: :tag
  has_many :screenshots, inverse_of: :game, dependent: :destroy
  has_many :transactions, dependent: :destroy

  def round_price
    '%.2f' % [(self.price * 100).round / 100.0]
  end

end
