# app/models/invitation.rb

class Invitation < ApplicationRecord
  belongs_to :sender, class_name: "User"
  belongs_to :receiver, class_name: "User"

  enum status: { pending: "pending", accepted: "accepted", declined: "declined" }

  validates :sender, presence: true
  validates :receiver, presence: true
  validates :status, presence: true
end
