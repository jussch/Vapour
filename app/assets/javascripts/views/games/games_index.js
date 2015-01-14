Vapour.Views.GamesIndex = Backbone.CompositeView.extend({

  template: JST['games/index'],

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
    // this.listenTo(Vapour.CurrentUser(), "change", this.render);
  },

  render: function () {
    var content = this.template({ games: this.collection });
    this.$el.html(content);
    this.renderHeader();
    this.populateGames();
    return this;
  },

  populateGames: function () {
    var $gameList = this.$('.game-list')
    this.collection.each(function (model) {
      var view = new Vapour.Views.GameList({model: model})
      this.addSubview($gameList, view);
    }.bind(this))
  },

  renderHeader: function () {
    var view = new Vapour.Views.GamesHeader();
    this.addSubview(this.$('.games-header'), view);
  }

});
