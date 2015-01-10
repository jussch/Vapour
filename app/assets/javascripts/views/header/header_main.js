Vapour.Views.HeaderMain = Backbone.ExtendedView.extend({

  template: JST['header/main'],

  initialize: function (options) {
    this.listenTo(Vapour.CurrentUser(), "sync change", this.render);
    this.router = options.router;
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
    "click .sign-up": "signUp"
  },

  logOut: function (event) {
    $.ajax({
      url: "/api/sessions",
      type: 'DELETE',
      dataType: 'json',
      success: function (resp) {
        Vapour.CurrentUser().clear();
      }
    });
  },

  logIn: function (event) {
    this.router.sessionNew();
  },

  signUp: function (event) {
    this.router.userNew();
  }

});
