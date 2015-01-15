Vapour.Views.GamesIndex = Backbone.ExtendedView.extend({

  template: JST['games/index'],

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
    // this.listenTo(Vapour.CurrentUser(), "change", this.render);
  },

  render: function () {
    var content = this.template({ games: this.collection });
    this.$el.html(content);
    this.renderHeader();
    this.populateGames(".game-list", this.collection);
    return this;
  },

  renderHeader: function () {
    var view = new Vapour.Views.GamesHeader();
    this.addSubview(this.$('.games-header'), view);
  }

});
