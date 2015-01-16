Vapour.Views.GamesIndex = Backbone.ExtendedView.extend({

  template: JST['games/index'],

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
    // this.listenTo(Vapour.CurrentUser(), "change", this.render);
  },

  render: function () {
    var featured = this.collection.filter(function (game) {
      return game.get('sale_type') === "FEATURED";
    });
    var featuredCollection = new Vapour.Collections.Games(featured);

    var content = this.template();
    this.$el.html(content);
    this.renderHeader();
    this.populateGames(".game-list", featuredCollection);
    return this;
  },

  renderHeader: function () {
    var view = new Vapour.Views.GamesHeader();
    this.addSubview(this.$('.games-header'), view);
  }

});
