Vapour.Collections.GameTags = Backbone.Collection.extend({

  model: Vapour.Models.Tag,

  url: "api/tags",

  initialize: function (options) {
    this.game = options.game;
  }

});
