class Api::PhotosController < ApplicationController
  def show
    @photo = Photo.find(params[:id])
    render json: @photo
  end

  def index
    @photos = Photo.where(owner_id: params[:user_id])
    render json: @photos
  end

  def create
    @photo = Photo.new(params[:photo])
    puts params
    @photo.owner_id = current_user.id

    if @photo.save
      render json: @photo
    else
      render json: @photo.errors, status: 422
    end
  end
end
