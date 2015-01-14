Vapour.Models.Friendship = Backbone.Model.extend({

  urlRoot: "api/friendships",

  toJSON: function() {
    return { friendship: _.clone( this.attributes ) };
  }

})
