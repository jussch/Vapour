Vapour.Views.HeaderMain = Backbone.ExtendedView.extend({

  template: JST['header/main'],

  initialize: function (options) {
    this.listenTo(Vapour.CurrentUser(), "sync change", this.render);
  },

  render: function () {
    var content = this.template({ CurrUser: Vapour.CurrentUser() });
    this.$el.html(content);
    this.addUserThumbs();
    return this;
  },

  events: {
    "click .log-out": "logOut",
    "click .log-in": "logIn",
    "click .sign-up": "signUp",
    "click .cart": "cart"
  },

  logOut: function (event) {
    $.ajax({
      url: "/api/sessions",
      type: 'DELETE',
      dataType: 'json',
      success: function (resp) {
        Vapour.Users.get(Vapour.CurrentUser().id).set({'is_current_user': false});
        console.log(Vapour.Users.get(Vapour.CurrentUser().id))
        Vapour.CurrentUser().clear();
      }
    });
  },

  logIn: function (event) {
    var session = new Vapour.Models.Session();
    var view = new Vapour.Views.SessionsForm({ model: session });
    Vapour.RootRouter.trigger('swapModal', view);
  },

  signUp: function (event) {
    var user = new Vapour.Models.User();
    var view = new Vapour.Views.UsersForm({ model: user });
    Vapour.RootRouter.trigger('swapModal', view);
  },

  cart: function (event) {
    var view = new Vapour.Views.TransactionsIndex({
      collection: Vapour.CurrentUser().gamesInCart()
    });
    Vapour.RootRouter.trigger("swapModal", view);
  }

});
