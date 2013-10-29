(function(root) {

  var PhotoFormView = PT.PhotoFormView = function() {
    $('#new-photo-form').on("submit", function(){
      console.log(this)
    });
  }

  PhotoFormView.prototype.render = function() {
    var that = this;
    var renderedContent = JST["photos/new"]({});
    that.$el = $("<div>");
    that.$el.html(renderedContent);
    return that;
  }

  PhotoFormView.prototype.submit = function(event) {
    console.log(event)
    event.preventDefault();
    var formData = $('#new-photo-form').serializeJSON();
    var photo = new PT.Photo(formData);
    photo.create(function () {
      PT.Photo.trigger('add');
    });
  }

})(this);