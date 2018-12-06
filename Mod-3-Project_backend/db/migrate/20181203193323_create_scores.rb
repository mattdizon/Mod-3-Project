class CreateScores < ActiveRecord::Migration[5.2]
  def change
    create_table :scores do |t|
        t.string :name
        t.integer :points
        t.references :song
        t.timestamps
    end
  end
end
