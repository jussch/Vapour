Vapour.Routers.Root = Backbone.Router.extend({

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.$modalEl = options.$modalEl;
    this.games = options.games;
  },

  routes: {
    "": "gameIndex",
    "games/new": "gameNew",
    "games/:id": "gameShow",
    "games/:id/edit": "gameEdit"
  },

  gameIndex: function () {
    var view = new Vapour.Views.GamesIndex({ collection: this.games });
    this.swapView(view);
  },

  gameNew: function () {
    var game = new Vapour.Models.Game();
    var view = new Vapour.Views.GamesForm({ model: game, collection: this.games });
    this.swapView(view);
  },

  gameShow: function (id) {
    var game = this.games.getOrFetch(id);
    var view = new Vapour.Views.GameShow({ model: game });
    this.swapView(view);
  },

  gameEdit: function (id) {
    var game = this.games.getOrFetch(id);
    var view = new Vapour.Views.GamesForm({ model: game, collection: this.games });
    this.swapView(view);
  },

  swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
