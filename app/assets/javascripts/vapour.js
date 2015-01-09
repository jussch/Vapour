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
    var $modalEl = $('#modal')
    new Vapour.Routers.Root({ games: Vapour.Games, $rootEl: $rootEl, $modalEl: $modalEl});
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Vapour.initialize();
});
