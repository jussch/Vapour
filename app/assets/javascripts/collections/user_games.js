Vapour.Collections.UserGames = Backbone.Collection.extend({

  model: Vapour.Models.Game,

  url: "/api/games",

  initialize: function (options) {
    this.owner = options.owner;
  }

});
