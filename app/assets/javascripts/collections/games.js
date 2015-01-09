Vapour.Collections.Games = Backbone.Collection.extend({

  model: Vapour.Models.Game,

  url: "/api/games",

  getOrFetch: function(id){
    var game = this.get(id);

    if (!game) {
      game = new Vapour.Models.Game({id: id});
      var games = this;
      game.fetch({
        success: function() {
          games.add(game);
        }
      });
    } else {
      game.fetch();
    }

    return game;
  }

});
