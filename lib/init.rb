Dir['./lib/isolate*/lib'].each do |dir|
  $: << dir
end

require "rubygems"
require "bundler"

Bundler.require

ActiveRecord::Base.establish_connection(
  :adapter => "sqlite3",
  :database  => "db/gumflap.sqlite3"
)