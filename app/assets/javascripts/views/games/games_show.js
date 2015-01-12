Vapour.Views.GameShow = Backbone.CompositeView.extend({

  template: JST['games/show'],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.screenshots(), "sync", this.render);
    this.listenTo(Vapour.CurrentUser(), "change", this.render);
  },

  render: function () {
    var content = this.template({ game: this.model });
    this.$el.html(content);
    return this;
  },

  events: {
    'click .add-screenshot': 'screenshotForm',
    'click .add-to-cart': 'addToCart'
  },

  screenshotForm: function (event) {
    event.preventDefault();

    var view = new Vapour.Views.ScreenshotsForm({
      model: new Vapour.Models.Screenshot(),
      collection: this.model.screenshots(),
      game: this.model
    });

    Vapour.RootRouter.trigger('swapModal', view);
  },

  addToCart: function (event) {
    event.preventDefault();

    var transaction = new Vapour.Models.Transaction();
    transaction.save({game_id: this.model.id}, {
      success: function (model) {
        var collection = Vapour.CurrentUser().gamesInCart();
        collection.add(transaction);
        var view = new Vapour.Views.TransactionsIndex({collection: collection})
        Vapour.RootRouter.trigger("swapModal", view)
      },
      error: function (model, resp) {
        this.errors = resp.responseJSON.errors;
        this.render();
      }.bind(this)
    });
  }

});
