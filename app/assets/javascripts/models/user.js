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

  friends: function() {
    if (!this._friends) {
      this._friends = new Vapour.Collections.Users();
    }

    return this._friends;
  },

  friends: function() {
    if (!this._friends) {
      this._friends = new Vapour.Collections.Users();
    }

    return this._friends;
  },

  recievedRequests: function() {
    if (!this._recievedRequests) {
      this._recievedRequests = new Vapour.Collections.Friendships([],{
        user: this
      });
    }

    return this._recievedRequests;
  },

  sentRequests: function() {
    if (!this._sentRequests) {
      this._sentRequests = new Vapour.Collections.Friendships([],{
        user: this
      });
    }

    return this._sentRequests;
  },

  parseSetup: {
    "bought_games": "boughtGames",
    "games_in_cart": "gamesInCart",
    "friends": "friends",
    "recieved_requests": "recievedRequests",
    "sent_requests": "sentRequests"
  },

  parse: function (resp) {
    var respAttr, funcAttr;
    for (var respAttr in this.parseSetup) {
      if (resp[respAttr]) {
        funcAttr = this.parseSetup[respAttr]
        this[funcAttr]().set(resp[respAttr], { parse: true});
        delete resp[respAttr];
      }
    }
    return resp;
  }

});
