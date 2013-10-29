(function(root) {

  var PhotoListView = PT.PhotoListView = function() {
    this.$el = "";
    PT.Photo.on('add', this.render.call(this));
  }

  PhotoListView.prototype.render = function(photos) {
    var that = this;
    var renderedContent = JST["photos/list"]({
      photos: photos
    });
    that.$el = $("<div>");
    that.$el.html(renderedContent);
    return that;
  }

})(this);