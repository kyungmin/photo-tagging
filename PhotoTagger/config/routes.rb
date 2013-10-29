PhotoTagger::Application.routes.draw do

  resources :users, :only => [:create, :new, :show]
  resource :session, :only => [:create, :destroy, :new]

  namespace :api, default: { format: :json } do
    resources :users, :only => [:show] do
      resources :photos, :only => [:index]
    end

    resources :photos, :only => [:show] do
      resources :photo_taggings, :only => [:index, :create]
    end

    resources :photos, :only => [:create, :destroy]
  end

  root :to => "static_pages#root"
end