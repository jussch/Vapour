Vapour.Models.Transaction = Backbone.Model.extend({

  urlRoot: "/api/transactions",

  toJSON: function() {
    return { transaction: _.clone( this.attributes ) };
  },

  game: function () {
    if (!this._game) {
      this._game = new Vapour.Models.Game();
    }

    return this._game;
  },

  parse: function (resp) {
    if (resp.game) {
      this.game().set(resp.game);
      delete resp.game;
    }

    return resp;
  }

});
