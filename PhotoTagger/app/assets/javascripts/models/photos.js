(function(root){
  var PT = root.PT = (root.PT || {});

  var Photo = PT.Photo = function (attributes) {
    this.attributes = attributes;
  };

  _.extend(Photo.prototype, {
    get: function (attrName) {
      return this.attributes[attrName];
    },

    set: function (attrName, val) {
      _.extend(this.attributes, { attrName: val });
    },

    create: function (callback) {
      var that = this;
      $.ajax({
        type: "post",
        url: "/api/photos",
        data: that.attributes,
        success: function (data) {
          that.set("id", data.id);
          callback(data);
          all.push(that);
        },
        error: function(data) {
          console.log(data);
        }
      });
    }

  });

  _.extend(Photo, {
    all: [],
    _events: {},
    fetchByUserId: function(userId, callback) {

      $.ajax({
        type: "get",
        url: "/api/users/" + userId + "/photos",
        success: function(data) {
          var photos = [];

          _(data).each(function(photo) {
            photos.push(new Photo(photo));
          });

          callback(photos);
          PT.Photo.all = photos;
          return photos;
        }
      });
    },
    on: function (eventName, callback) {
      if (this._events[eventName]) {
        this._events[eventName].push(callback);
      } else {
        this._events[eventName] = [];
      }
    },
    trigger: function (eventName) {
      _(this._events[eventName]).each(function (callback) {
        callback();
      });
    }

  });
})(this);