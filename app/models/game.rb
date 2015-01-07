class Game < ActiveRecord::Base
  validates :title, :description, :synopsis, :author_id, :price, presence: true

  belongs_to :author,
    class_name: "User",
    foreign_key: :author_id

  has_many :tags, inverse_of: :game, dependent: :destroy
end
