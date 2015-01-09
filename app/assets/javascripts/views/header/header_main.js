Vapour.Views.HeaderMain = Backbone.View.extend({

  template: JST['header/main'],

  initialize: function (options) {
    this.listenTo(Vapour.CurrentUser(), "sync change", this.render);
    this.$modalEl = options.$modalEl;
  },

  render: function () {
    console.log(Vapour.CurrentUser().escape('username'));
    var content = this.template({ CurrUser: Vapour.CurrentUser() });
    this.$el.html(content);
    return this;
  }

});
