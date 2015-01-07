Rails.application.routes.draw do
  root 'sessions#new'
  resources :users, only: [:new, :create, :show]
  resource :sessions, only: [:new, :create, :destroy]
  resources :games
end
