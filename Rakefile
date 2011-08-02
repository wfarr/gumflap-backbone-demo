require './lib/init'
require './lib/models'

desc "Run the server"
task :server do
  system "rackup config.ru"
end

namespace :db do
  require 'logger'
  task :migrate do
    ActiveRecord::Base.logger = Logger.new(STDOUT)
    ActiveRecord::Migration.verbose = true
    ActiveRecord::Migrator.migrate("db/migrate")
  end
  task :rollback do
    ActiveRecord::Base.logger = Logger.new(STDOUT)
    ActiveRecord::Migration.verbose = true
    ActiveRecord::Migrator.rollback("db/migrate", 1)
  end
  task :seed do
    load File.join(File.dirname(__FILE__), 'db/seeds.rb')
  end
end