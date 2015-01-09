Vapour.Views.GameShow = Backbone.View.extend({

  template: JST['games/show'],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var content = this.template({ game: this.model });
    this.$el.html(content);
    return this;
  }

});
