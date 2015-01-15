Vapour.Collections.Friendships = Backbone.Collection.extend({

  url: "api/friendships",

  model: Vapour.Models.Friendship,

  initialize: function (options) {
    this.user = options.user;
  }

})
