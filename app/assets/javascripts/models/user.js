Vapour.Models.User = Backbone.Model.extend({

  urlRoot: '/api/users',

  toJSON: function() {
    return { user: _.clone( this.attributes ) };
  },

  boughtGames: function () {
    if (!this._boughtGames) {
      this._boughtGames = new Vapour.Collections.Games([], {owner: this});
    }

    return this._boughtGames;
  },

  parse: function (resp) {
    if (resp.bought_games) {
      this.boughtGames().set(resp.bought_games, { parse: true });
      delete resp.bought_games;
    }

    return resp;
  }

});
