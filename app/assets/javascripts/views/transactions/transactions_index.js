Vapour.Views.TransactionsIndex = Backbone.CompositeView.extend({

  template: JST['transactions/index'],

  initialize: function (options) {
    this.listenTo(this.collection, "sync remove", this.render);
  },

  render: function () {
    var content = this.template({
      transactions: this.collection,
      errors: this.errors
    });
    delete this.errors;

    this.$el.html(content);

    this.collection.each(function (transaction) {
      var view = new Vapour.Views.TransactionsList({model: transaction});
      this.addSubview('.cart-list', view);
    }.bind(this));

    return this;
  },

  events: {
    'click .checkout': 'checkout'
  },

  checkout: function (event) {
    event.preventDefault();
    $.ajax({
      url: "/api/transactions/complete",
      type: 'POST',
      dataType: 'json',
      success: function (resp) {
        this.collection.reset( [], { user: this.collection.user } );
        Backbone.history.navigate("users/"+this.collection.user.id, { trigger: true });
        this.remove();
      }.bind(this),
      errors: function (resp) {
        this.errors = resp.responseJSON.errors;
        this.render();
      }.bind(this)
    });
  }

});
