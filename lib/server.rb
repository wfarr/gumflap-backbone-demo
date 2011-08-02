require "./lib/init"
require "./lib/models"

disable :logging
set :root, File.dirname(__FILE__) + "/../"

Pusher.app_id = '7310'
Pusher.key = '11e41d2376a5e674b676'
Pusher.secret = '9ce059d432095df3b7cb'

get "/" do
  File.readlines("public/index.html")
end

get "/messages" do
  content_type "application/json"
  '[' + Message.all.map(&:to_json).join(',') + ']'
end

# create
post "/messages" do
  #content_type "application/json"
  raw = request.env["rack.input"].read
  params = JSON.parse(raw)
  if params["username"] && params["body"]
    username = params["username"]
    body = params["body"]
    message = Message.create!(:username => username, :body => body)
    Pusher['test_channel'].trigger('new_message', message.attributes)
    message.to_json
  else
    return [500, "Requires a legal username and message."]
  end
end

# read
get '/messages/:id' do
  content_type "application/json"
  message = Message.find params[:id]
  message.to_json
end

get "/favicon.ico" do
  ""
end
