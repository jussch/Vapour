Vapour.Routers.Root = Backbone.Router.extend({

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.$modalEl = options.$modalEl;
    this.$headerEl = options.$headerEl;
    this.games = options.games;

    var header = new Vapour.Views.HeaderMain();
    this.$headerEl.html(header.render().$el);

    this.listenTo(this, 'swapModal', this.swapModal);
    this.listenTo(this, 'removeModal', this.removeModal);
  },

  routes: {
    "": "gameIndex",
    "games": "gameIndex",
    "games/new": "gameNew",
    "games/search(/:tag_id)": "gameSort",
    "games/:id": "gameShow",
    "games/:id/edit": "gameEdit",
    "users": "userIndex",
    "users/:id": "userShow"
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

  gameSort: function (tag_id) {
    var query = this.games.searchQuery;
    var tags = this.games.searchTags;
    if (tag_id) {tags.push(parseInt(tag_id))}
    var sortedGames = this.games.search();
    var view = new Vapour.Views.GamesSort({
      collection: sortedGames,
      query: query,
      searchTags: tags
    });
    this.swapView(view);
  },

  gameShow: function (id) {
    var game = this.games.getAndFetch(id);
    var view = new Vapour.Views.GameShow({ model: game });
    this.swapView(view);
  },

  gameEdit: function (id) {
    var game = this.games.getAndFetch(id);
    var view = new Vapour.Views.GamesForm({ model: game, collection: this.games });
    this.swapView(view);
  },

  userIndex: function () {
    var view = new Vapour.Views.UsersIndex({ collection: Vapour.Users });
    this.swapView(view);
  },

  userShow: function (id) {
    var user = Vapour.Users.getAndFetch(id);
    var view = new Vapour.Views.UserShow({ model: user });
    this.swapView(view);
  },

  swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
    this.removeModal();
  },

  swapModal: function (modal) {
    this._currentModal && this._currentModal.remove();
    this._currentModal = modal;
    this.$modalEl.html(modal.render().$el);
    this.$modalEl.removeClass('hidden');
  },

  removeModal: function () {
    this._currentModal && this._currentModal.remove();
    this.$modalEl.addClass('hidden');
  }
});
