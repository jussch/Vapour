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
    var $rootEl = $('#content');
    new Vapour.Routers.Root({ games: Vapour.Games, $rootEl: $rootEl});
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Vapour.initialize();
});
