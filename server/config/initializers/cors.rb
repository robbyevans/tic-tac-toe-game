# config/initializers/cors.rb

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "http://localhost:5173" # Replace with your frontend URL in production

    resource "*",
             headers: :any,
             methods: [:get, :post, :put, :patch, :delete, :options, :head],
             expose: ["Authorization"]
  end
end
