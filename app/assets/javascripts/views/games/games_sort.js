Vapour.Views.GamesSort = Backbone.CompositeView.extend({

  template: JST['games/sort'],

  initialize: function (options) {
    this.listenTo(Vapour.Games, "sync", this.update);
    this.listenTo(this.collection, "sync change", this.render);
    this.listenTo(Vapour.Tags, "sync", this.render);
    this.query = options.query;
    this.searchTags = options.searchTags || [];
  },

  update: function () {
    Vapour.Games.search();
    this.render();
  },

  render: function () {
    var content = this.template({
      games: this.collection,
      search: this.query,
      checkedTags: this.searchTags
    });
    this.$el.html(content);
    this.renderHeader();
    this.populateGames();
    return this;
  },

  events: {
    'change .tag-sort-input': 'filterSearch'
  },

  filterSearch: function (event) {
    $checkbox = $(event.currentTarget)//.children('.tag-sort-input');
    var val = parseInt($checkbox.val());
    if (this.query !== Vapour.Games.searchQuery) {
      Vapour.Games.searchQuery = this.query;
    }
    if ($checkbox.is(':checked')) {
      Vapour.Games.searchTags.push(val);
      this.searchTags.push(val);
    } else {
      var index = Vapour.Games.searchTags.indexOf(val);
      Vapour.Games.searchTags.splice(index, 1);
      index = this.searchTags.indexOf(val);
      this.searchTags.splice(index, 1);
    }
    Vapour.Games.search();
    this.populateGames();
  },

  populateGames: function () {
    var $gameList = this.$('.game-sorted-list')
    $gameList.empty();
    this.collection.each(function (model) {
      var view = new Vapour.Views.GameList({model: model})
      this.addSubview($gameList, view);
    }.bind(this))
  },

  renderHeader: function () {
    var view = new Vapour.Views.GamesHeader();
    this.addSubview(this.$('.games-header'), view);
  },

  remove: function () {
    Vapour.Games.searchQuery = null;
    Vapour.Games.searchTags = [];
    Backbone.CompositeView.prototype.remove.call(this);
  }

});
