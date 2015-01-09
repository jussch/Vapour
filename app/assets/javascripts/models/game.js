Vapour.Models.Game = Backbone.Model.extend({

  urlRoot: "/api/games",

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
    this.tags().each(function (myTag) {
      if (myTag.id === tag.id) {
        return true;
      }
    });
    return false;
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
