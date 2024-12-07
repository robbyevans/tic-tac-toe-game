# app/models/user.rb

class User < ApplicationRecord
  has_secure_password

  has_one_attached :avatar

 # Games where the user is player1
 has_many :player1_games, class_name: 'Game', foreign_key: 'player1_id', dependent: :destroy

 # Games where the user is player2
 has_many :player2_games, class_name: 'Game', foreign_key: 'player2_id', dependent: :destroy

 # Games where the user is the winner
 has_many :won_games, class_name: 'Game', foreign_key: 'winner_id', dependent: :destroy

  has_many :sent_invitations, class_name: "Invitation", foreign_key: "sender_id", dependent: :destroy
  has_many :received_invitations, class_name: "Invitation", foreign_key: "receiver_id", dependent: :destroy

  validates :username, presence: true, uniqueness: true
  validates :pin, presence: true, length: { is: 4 }, numericality: { only_integer: true }
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, presence: true, length: { minimum: 4 }, on: :create

  validate :avatar_validation

  private

  def avatar_validation
    return unless avatar.attached?

    allowed_types = %w[
      image/jpeg
      image/png
      image/gif
      image/webp
      image/svg+xml
      image/bmp
      image/tiff
    ]

    unless avatar.content_type.in?(allowed_types)
      errors.add(:avatar, "must be a JPEG, PNG, GIF, WEBP, SVG, BMP, or TIFF image")
    end

    if avatar.byte_size > 5.megabytes
      errors.add(:avatar, "size should be less than 5MB")
    end
  end
end
