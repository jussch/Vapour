Vapour.Views.UserThumb = Backbone.CompositeView.extend({

  template: JST['users/thumb'],

  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render);
    this.displayName = (options && options.displayName) || false;
  },

  render: function () {
    
    var content = this.template({
      user: this.model,
      displayName: this.displayName
    });
    this.$el.html(content);
    return this;
  }

});
