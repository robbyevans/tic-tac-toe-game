class Invitation < ApplicationRecord
  belongs_to :sender, class_name: 'User'
  belongs_to :receiver, class_name: 'User'

  # Define possible statuses
  enum status: { pending: 'pending', accepted: 'accepted', declined: 'declined', expired: 'expired' }

  # Validations
  validates :sender_id, presence: true
  validates :receiver_id, presence: true
  validates :status, presence: true, inclusion: { in: statuses.keys }

  # Prevent users from sending multiple pending invitations to the same receiver
  validates :receiver_id, uniqueness: { 
    scope: :sender_id, 
    message: "has already been invited by you", 
    conditions: -> { where(status: 'pending') } 
  }

  # Instance methods to retrieve sender details
  def sender_username
    sender.username
  end

  def sender_avatar_url
    sender.avatar_url
  end

  private

  def pending?
    status == 'pending'
  end

  def schedule_expiration
    ExpireInvitationJob.set(wait: 30.seconds).perform_later(id)
  end
end
