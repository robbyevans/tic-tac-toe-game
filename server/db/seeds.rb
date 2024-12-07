# db/seeds.rb

# Create default avatars
default_avatar_urls = [
  "https://example.com/avatars/avatar1.png",
  "https://example.com/avatars/avatar2.png",
  "https://example.com/avatars/avatar3.png",
  # Add more URLs as needed
]

default_avatar_urls.each do |url|
  # Since Active Storage handles attachments, you might need to download and attach them to a dummy user or store URLs
  # Alternatively, you can serve them from a static server and reference their URLs directly
end

puts "Default avatars seeded."
