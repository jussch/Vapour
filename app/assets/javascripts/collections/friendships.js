Vapour.Collections.Friendships = Backbone.Collections.extend({

  url: "api/friendships",

  model: Vapour.Models.Friendship,

  initialize: function (options) {
    this.user = options.user;
  }

})
