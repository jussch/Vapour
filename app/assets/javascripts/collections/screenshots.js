Vapour.Collections.Screenshots = Backbone.Collection.extend({

  model: Vapour.Models.Screenshot,

  url: "api/screenshot",

  initialize: function (options) {
    this.game = options.game;
  }

});
