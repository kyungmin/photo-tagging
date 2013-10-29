class PhotoTagging < ActiveRecord::Base
  attr_accessible :photo_id, :user_id, :x_pos, :y_pos
  validates :photo_id, :user_id, :x_pos, :y_pos, presence: true

  belongs_to :photo
  belongs_to :tagged_user, class_name: 'User', foreign_key: :user_id
end
