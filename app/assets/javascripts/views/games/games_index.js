Vapour.Views.GamesIndex = Backbone.CompositeView.extend({

  template: JST['games/index'],

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(Vapour.CurrentUser(), "change", this.render);
  },

  render: function () {
    var content = this.template({ games: this.collection });
    this.$el.html(content);
    return this;
  }

});
