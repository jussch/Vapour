Vapour.Views.GamesHeader = Backbone.CompositeView.extend({

  template: JST['games/_header'],

  tagName: "header",
  className: "game-store-header group",

  initialize: function () {
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  events: {
    'change .search-bar': 'toSearchView',
    'click .to-browse': 'fixBrowse'
  },

  toSearchView: function (event) {
    event.preventDefault();
    $searchBar = $(event.currentTarget);
    if (Backbone.history.fragment === "games/search") {
      Backbone.history.fragment = null;
    }
    Vapour.Games.searchQuery = $searchBar.val();
    Backbone.history.navigate("games/search", {trigger: true});
  },

  fixBrowse: function (event) {
    if (Backbone.history.fragment === "games/search") {
      Backbone.history.fragment = null;
      Vapour.Games.searchQuery = null;
      Vapour.Games.searchTags = [];
    }
    Backbone.history.navigate("games/search", {trigger: true});
  }

});
