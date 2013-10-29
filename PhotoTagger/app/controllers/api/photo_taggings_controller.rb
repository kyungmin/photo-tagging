class Api::PhotoTaggingsController < ApplicationController

  before_filter :user_owns_photo, only: [:create]

  def index
    @photo_taggings = PhotoTagging.all
  end

  def create
    @photo_tagging = PhotoTagging.new(params[:photo_tagging])
    if @photo_tagging.save
      render json: @photo_tagging
    else
      render json: @photo_tagging.errors, status: 422
    end
  end

  def user_owns_photo
    current_user.id == @photo_taggings.photo.owner.id
  end
end