Vapour.Models.User = Backbone.Model.extend({

  urlRoot: '/api/users',

  toJSON: function() {
    return { user: _.clone( this.attributes ) };
  },

  bought_games: function () {
    if (!this._bought_games) {
      this._bought_games = new Vapour.Collections.Games([], {owner: this});
    }

    return this._bought_games;
  },

  parse: function (resp) {
    if (resp.bought_games) {
      this.bought_games().set(resp.bought_games, { parse: true });
      delete resp.bought_games;
    }

    return resp;
  }

});
