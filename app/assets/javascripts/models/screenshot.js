Vapour.Models.Screenshot = Backbone.Model.extend({

  urlRoot: "/api/screenshots",

  toJSON: function() {
    return { screenshot: _.clone( this.attributes ) };
  }

});
