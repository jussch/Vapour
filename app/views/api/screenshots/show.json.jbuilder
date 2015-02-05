json.extract!(@screenshot, :id, :game_id)

json.image_url asset_path(@screenshot.get_image_url)
