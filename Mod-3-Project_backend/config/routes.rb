Rails.application.routes.draw do

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
get 'songs/:song_id/scores', to: 'scores#showScore'
  resources :songs do
      resources :scores
  end
  resources :scores


end
