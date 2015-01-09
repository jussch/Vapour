window.Vapour = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var games = new Vapour.Collections.Games();
    games.fetch();
    var $rootEl = $('#content')
    new Vapour.Routers.Root({ games: games, $rootEl: $rootEl})
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Vapour.initialize();
});
