class Simplify < ActiveRecord::Migration
  def self.up
    drop_table :users

    remove_column :messages, :user_id
    add_column :messages, :username, :string
  end

  def self.down
    create_table :users do |t|
      t.integer :id
      t.string  :name
    end
    
    add_column :messages, :user_id
    remove_column :messages, :username, :string
  end
end