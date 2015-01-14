Vapour.Views.GameList = Backbone.CompositeView.extend({

  template: JST['games/_list'],

  tagName: 'li',
  className: 'game-item',

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var content = this.template({ game: this.model });
    this.$el.html(content);
    return this;
  }

});
