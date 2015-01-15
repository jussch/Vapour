class AddAttachmentAvatarToUsers < ActiveRecord::Migration
  def change
    change_table :users do |t|
      t.attachment :avatar
    end
  end
end
