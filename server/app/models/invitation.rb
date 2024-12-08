# app/models/invitation.rb
class Invitation < ApplicationRecord
  belongs_to :sender, class_name: 'User'
  belongs_to :receiver, class_name: 'User'

  # Define possible statuses
  enum status: { pending: 'pending', accepted: 'accepted', declined: 'declined' }

  # Validations
  validates :sender_id, presence: true
  validates :receiver_id, presence: true
  validates :status, presence: true, inclusion: { in: statuses.keys }

  # Prevent users from sending multiple pending invitations to the same receiver
  validates :receiver_id, uniqueness: { scope: :sender_id, message: "has already been invited by you", if: :pending? }

  private

  def pending?
    status == 'pending'
  end
end
