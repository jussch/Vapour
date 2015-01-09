Vapour.Models.Game = Backbone.Model.extend({

  urlRoot: "/api/games",

  screenshots: function () {
    if (!this._screenshots) {
      this._screenshots = new Vapour.Collections.Screenshots([], {game: this});
    }

    return this._screenshots;
  },

  parse: function (resp) {
    if (resp.screenshots) {
      this.screenshots().set(resp.screenshots, {parse: true});
      delete resp.screenshots;
    }
    return resp;
  }

});
