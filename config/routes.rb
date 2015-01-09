Rails.application.routes.draw do
  root 'root#index'
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

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:show]
    resource :sessions, only: [:create, :destroy]
    resources :games, only: [:show, :index, :create, :destroy, :update]
    resources :screenshots, only: [:show, :create, :destroy]
    resources :tags, only: [:index]
  end
end
