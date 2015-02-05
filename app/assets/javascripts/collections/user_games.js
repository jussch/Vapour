Vapour.Collections.UserGames = Backbone.Collection.extend({

  model: Vapour.Models.Game,

  url: "/api/games",

  initialize: function (models, options) {
    this.owner = options.owner;
    this.listenTo(Vapour.Games, "sync", this.getFromGlobal);
  },

  getFromGlobal: function () {
  	this.each(function (game) {
  		var other = Vapour.Games.get(game.id);
  		game.set(other.attributes);
  		game.tags().set(other.tags().models);
  	})
  	return this;
  }

});
