# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

TYPICAL_TAGS = %w(role-playing action adventure simulation strategy sports
   first-person third-person puzzle survival singleplayer multiplayer
   co-op indie casual horror)

TYPICAL_TAGS.each do |tag_type|
  Tag.create(name: tag_type)
end

seeded_users = []
5.times do
  user = User.new({
    username: Faker::Internet.user_name,
    password: "password",
    email: Faker::Internet.safe_email
  })
  user.save
  seeded_users.push(user)
end

TYPICAL_GAME_NAMES = %w(Slayer Dragon Keyboard Hero Resident-Evil Mario-Kart
  Super-Smash-Bros James-Bond Water Binding-Of-Isaac Dota2 Hearthstone)

SCREENSHOTS = %w(
https://placekitten.com/g/200/300
https://placekitten.com/g/201/300
https://placekitten.com/g/202/300
https://placekitten.com/g/203/300
https://placekitten.com/g/204/300
https://placekitten.com/g/205/300
https://placekitten.com/g/206/300
https://placekitten.com/g/207/300
https://placekitten.com/g/208/300
https://placekitten.com/g/209/300
https://placekitten.com/g/210/300
https://placekitten.com/g/211/300
https://placekitten.com/g/212/300
https://placekitten.com/g/213/300
https://placekitten.com/g/214/300
https://placekitten.com/g/215/300
https://placekitten.com/g/216/300
https://placekitten.com/g/217/300
https://placekitten.com/g/218/300
https://placekitten.com/g/219/300
)

TYPICAL_GAME_NAMES.each do |game_name|
  game = Game.create({
    title: game_name,
    synopsis: Faker::Lorem.sentence,
    description: Faker::Lorem.paragraph,
    author_id: seeded_users.sample.id,
    price: Faker::Commerce.price
  })
  rand(1..3).floor.times do
    Tagging.create({
      game_id: game.id,
      tag_id: rand(1..TYPICAL_TAGS.length).floor
    })
  end
  rand(2..4).floor.times do
    Screenshot.create({
      game_id: game.id,
      image_url: SCREENSHOTS.sample
    })
  end
end
