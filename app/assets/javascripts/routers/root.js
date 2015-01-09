Vapour.Routers.Root = Backbone.Router.extend({

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.games = options.games;
  },

  routes: {
    "": "gameIndex",
    "games/:id": "gameShow"
  },

  gameIndex: function () {
    var view = new Vapour.Views.GamesIndex({ collection: this.games });
    this._swapView(view);
  },

  gameShow: function (id) {
    var game = this.games.getOrFetch(id);
    var view = new Vapour.Views.GameShow({ model: game });
    this._swapView(view);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
