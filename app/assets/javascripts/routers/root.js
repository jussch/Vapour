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
    this.removeModal();
    var newView = function () {
      this._currentView = view;
      this.$rootEl.html(view.render().$el);
      this.$rootEl.addClass('ani-zoom-in');
      setTimeout(function () {
        this.$rootEl.removeClass('ani-zoom-in')
      }.bind(this), 300);
    }.bind(this);

    if (this._currentView) {
      this.$rootEl.addClass('ani-zoom-out')
      setTimeout(function () {
        this.$rootEl.removeClass('ani-zoom-out')
        this._currentView.remove();
        newView();
      }.bind(this), 400)
    } else {
      newView();
    }
  },

  swapModal: function (modal) {
    if (this._currentModal) {
      this.$modalEl.addClass('fade-out');
      setTimeout(function () {
        this._currentModal.remove();
        this._currentModal = modal;
        this.$modalEl.html(modal.render().$el);
        this.$modalEl.removeClass('fade-out');
      }.bind(this), 500);
    } else {
      this._currentModal = modal;
      this.$modalEl.html(modal.render().$el);
      this.$modalEl.removeClass('hidden');
      setTimeout(function () {
        this.$modalEl.addClass('expand-width');
      }.bind(this), 1)
      setTimeout(function () {
        this.$modalEl.addClass('expand-height');
        this.$modalEl.removeClass('hidden');
      }.bind(this), 500);
    }
  },

  removeModal: function () {
    if (!this._currentModal) {return}
    this.$modalEl.removeClass('expand-height');
    setTimeout(function () {
      this.$modalEl.removeClass('expand-width');
    }.bind(this), 500)
    setTimeout(function () {
      this.$modalEl.addClass('hidden');
      if (this._currentModal) {
        this._currentModal.remove();
        this._currentModal = null;
      }
    }.bind(this), 1000);
  }
});
