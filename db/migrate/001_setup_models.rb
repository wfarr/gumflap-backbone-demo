class SetupModels < ActiveRecord::Migration
  def self.up
    create_table :users do |t|
      t.integer :id
      t.string  :name
    end

    create_table :messages do |t|
      t.string :body
      t.integer :user_id
    end
  end

  def self.down
    drop_table :users
    drop_table :messages
  end
end