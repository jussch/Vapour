Vapour.Models.Session = Backbone.Model.extend({

  urlRoot: '/api/sessions',

  toJSON: function() {
    return { user: _.clone( this.attributes ) };
  }

});
