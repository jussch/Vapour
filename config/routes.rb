Rails.application.routes.draw do
  root 'sessions#new'
  resources :users, only: [:new, :create, :show] do
    post 'add_funds', on: :member
  end
  resource :sessions, only: [:new, :create, :destroy]
  resources :games do
    resources :screenshots, only: [:new]
    resources :transactions, only: [:create]
  end
  resources :screenshots, only: [:destroy, :create]
  resources :transactions, only: [:index, :destroy] do
    post 'complete', on: :collection
  end
end
