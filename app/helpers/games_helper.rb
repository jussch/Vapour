module GamesHelper
  def check_box?(tag, game)
    game.tags.include?(tag) ? "checked" : ""
  end
end
