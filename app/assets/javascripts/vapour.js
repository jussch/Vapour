window.Vapour = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    Vapour.Games = new Vapour.Collections.Games();
    Vapour.Games.fetch();
    Vapour.Tags = new Vapour.Collections.Tags();
    Vapour.Tags.fetch();
    new Vapour.Routers.Root({
      games: Vapour.Games,
      $rootEl: $('#content'),
      $modalEl: $('#modal'),
      $headerEl: $('#header')
    });

    $.ajax({
      url: "/api/users/current",
      dataType: 'json',
      success: function (resp) {
        Vapour.CurrentUser().set(resp);
      }
    });
    Backbone.history.start();
  },
  CurrentUser: function () {
    if (!Vapour._CurrentUser) {
      Vapour._CurrentUser = new Vapour.Models.User();
    }
    return Vapour._CurrentUser;
  }
};

$(document).ready(function(){
  Vapour.initialize();
});
