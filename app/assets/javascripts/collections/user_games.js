Vapour.Collections.UserGames = Backbone.Collection.extend({

  model: Vapour.Models.Game,

  url: "/api/games",

  initialize: function (models, options) {
    this.owner = options.owner;
  }

});
