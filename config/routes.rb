Rails.application.routes.draw do
  root 'sessions#new'
  resources :users, only: [:new, :create, :show] do
    post 'add_funds', on: :member
  end
  resource :sessions, only: [:new, :create, :destroy]
  resources :games do
    resources :screenshots, only: [:new]
  end
  resources :screenshots, only: [:destroy, :create]
end
