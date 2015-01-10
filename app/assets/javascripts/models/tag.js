Vapour.Models.Tag = Backbone.Model.extend({

  urlRoot: "/api/tags",

  toJSON: function() {
    return { tag: _.clone( this.attributes ) };
  }

});
