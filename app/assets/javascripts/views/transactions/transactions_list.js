Vapour.Views.TransactionsList = Backbone.CompositeView.extend({

  template: JST['transactions/list'],

  tagName: "li",
  className: "cart-item"

  initialize: function (options) {
    this.listenTo(this.model, "sync change", this.render);
  },

  render: function () {
    var content = this.template({
      transaction: this.model,
      errors: this.errors
    });
    delete this.errors;

    this.$el.html(content);
    return this;
  },

  events: {
    'click .cart-delete': 'removeFromList'
  },

  removeFromList: function (event) {
    this.model.destroy();
    this.remove();
  }

});
