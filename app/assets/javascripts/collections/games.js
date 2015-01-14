Vapour.Collections.Games = Backbone.ExtendedCollection.extend({

  model: Vapour.Models.Game,

  url: "/api/games",

  initialize: function () {
    this.searchTags = [];
    this.searchQuery = null;
    this.searchResults = new Vapour.Collections.SearchGames()
  },

  search: function () {
    var filterTags = function () {
      if (this.searchTags.length < 1) {
        return;
      }
      var filter = this.searchResults.filter(function(model) {
        var modelTagIds = model.tags().pluck('id');
        for (var i = 0; i < this.searchTags.length; i++) {
          if (modelTagIds.indexOf(this.searchTags[i]) < 0) {return false;}
        }
        return true;
      }.bind(this));
      this.searchResults.set(filter);
    }.bind(this)

    if (this.searchQuery) {
      var data = {query: this.searchQuery};
      this.searchResults.fetch({
        data: data,
        success: filterTags
      });
    } else {
      this.searchResults.set(this.models);
      filterTags();
    }
    return this.searchResults;
  }


});
