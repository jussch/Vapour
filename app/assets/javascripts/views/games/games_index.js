Vapour.Views.GamesIndex = Backbone.View.extend({

  template: JST['games/index'],

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
  },

  render: function () {
    var content = this.template({ games: this.collection });
    this.$el.html(content);
    return this;
  }

});
