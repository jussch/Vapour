Vapour.Models.Screenshot = Backbone.Model.extend({

  urlRoot: "/api/screenshots",

  toJSON: function() {
    var json = { screenshot: _.clone( this.attributes ) };

    if (this._file) {
      json.screenshot.file = this._file;
    }

    return json;
  }

});
