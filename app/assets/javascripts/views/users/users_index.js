Vapour.Views.UsersIndex = Backbone.ExtendedView.extend({

  template: JST['users/index'],

  initialize: function () {
    this.listenToOnce(this.collection, "sync", this.render);
  },

  render: function () {
    var content = this.template({ users: this.collection });
    this.$el.html(content);
    this.addUserThumbs();
    return this;
  }

});
