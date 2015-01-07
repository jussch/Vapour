# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150107212851) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "games", force: true do |t|
    t.string   "title",                               null: false
    t.text     "synopsis",                            null: false
    t.text     "description",                         null: false
    t.decimal  "price",       precision: 6, scale: 2, null: false
    t.integer  "author_id",                           null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "games", ["author_id"], name: "index_games_on_author_id", using: :btree
  add_index "games", ["title"], name: "index_games_on_title", using: :btree

  create_table "screenshots", force: true do |t|
    t.integer  "game_id"
    t.string   "image_url"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "screenshots", ["game_id"], name: "index_screenshots_on_game_id", using: :btree

  create_table "taggings", force: true do |t|
    t.integer  "game_id",    null: false
    t.integer  "tag_id",     null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "taggings", ["game_id"], name: "index_taggings_on_game_id", using: :btree
  add_index "taggings", ["tag_id"], name: "index_taggings_on_tag_id", using: :btree

  create_table "tags", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "name"
  end

  create_table "users", force: true do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "email",           null: false
    t.string   "session_token"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["password_digest"], name: "index_users_on_password_digest", using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
