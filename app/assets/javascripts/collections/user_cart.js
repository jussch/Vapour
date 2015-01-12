Vapour.Collections.UserCart = Backbone.ExtendedCollection.extend({

  model: Vapour.Models.Transaction,

  url: "api/transactions",

  initialize: function (models, options) {
    this.user = options.user;
  },

  totalPrice: function () {
    var price = 0;

    this.each(function (transaction) {
      price += parseFloat(transaction.game().get('price'));
    });

    return price.toFixed(2);
  }

});
