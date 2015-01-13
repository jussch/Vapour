class Game < ActiveRecord::Base
  include PgSearch
  pg_search_scope :search_by_title, against: :title, using: {tsearch: {prefix: true}}

  validates :title, :description, :synopsis, :author_id, :price, presence: true

  belongs_to :author,
    class_name: "User",
    foreign_key: :author_id

  has_many :taggings, inverse_of: :game, dependent: :destroy
  has_many :tags, through: :taggings, source: :tag
  has_many :screenshots, inverse_of: :game, dependent: :destroy
  has_many :transactions, dependent: :destroy

end
