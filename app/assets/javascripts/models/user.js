Vapour.Models.User = Backbone.Model.extend({

  urlRoot: '/api/users',

  toJSON: function() {
    return { user: _.clone( this.attributes ) };
  },

  boughtGames: function () {
    if (!this._boughtGames) {
      this._boughtGames = new Vapour.Collections.UserGames([], {owner: this});
    }

    return this._boughtGames;
  },

  gamesInCart: function () {
    if (!this._gamesInCart) {
      this._gamesInCart = new Vapour.Collections.UserCart([], {user: this});
      this._gamesInCart.fetch();
    }

    return this._gamesInCart;
  },

  parse: function (resp) {
    if (resp.bought_games) {
      this.boughtGames().set(resp.bought_games, { parse: true });
      delete resp.bought_games;
    }

    if (resp.games_in_cart) {
      this.gamesInCart().set(resp.games_in_cart, { parse: true });
      delete resp.gamesInCart;
    }

    return resp;
  }

});
