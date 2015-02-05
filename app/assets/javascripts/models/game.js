Vapour.Models.Game = Backbone.Model.extend({

  urlRoot: "/api/games",

  toJSON: function() {
    var json = { game: _.clone( this.attributes ) };

    if (this._cover_image) {
      json.game.cover_image = this._cover_image;
    }

    return json;
  },

  screenshots: function () {
    if (!this._screenshots) {
      this._screenshots = new Vapour.Collections.Screenshots([], {game: this});
    }

    return this._screenshots;
  },

  tags: function () {
    if (!this._tags) {
      this._tags = new Vapour.Collections.GameTags([], {game: this});
    }

    return this._tags;
  },

  tagsInclude: function (tag) {
    for (var i = 0; i < this.tags().length; i++) {
      if (this.tags().models[i].id === tag.id) {
        return true;
      }
    }
    return false;
  },

  checkIfTagsInclude: function (tag) {
    if (this.tagsInclude(tag)) {
      return "checked";
    }
  },

  author: function () {
    if (!this._author) {
      this._author = new Vapour.Models.User()
    }

    return this._author;
  },

  parse: function (resp) {
    if (resp.screenshots) {
      this.screenshots().set(resp.screenshots, {parse: true});
      delete resp.screenshots;
    }
    if (resp.tags) {
      this.tags().set(resp.tags, {parse: true});
      delete resp.tags;
    }
    if (resp.author) {
      this.author().set(resp.author, {parse: true});
      delete resp.author;
    }
    return resp;
  }

});
