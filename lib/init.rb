Dir['./lib/isolate*/lib'].each do |dir|
  $: << dir
end

require "rubygems"
require "bundler"

Bundler.require

require 'uri'

db = URI.parse(ENV['DATABASE_URL'] || "sqlite3:///#{Dir.pwd}/gumflap.sqlite3")

ActiveRecord::Base.establish_connection(
  :adapter  => db.scheme == 'postgres' ? 'postgresql' : db.scheme,
  :host     => db.host,
  :username => db.user,
  :password => db.password,
  :database => db.path[1..-1],
  :encoding => 'utf8'
)