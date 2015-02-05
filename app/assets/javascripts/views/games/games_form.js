Vapour.Views.GamesForm = Backbone.CompositeView.extend({

  template: JST['games/form'],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(Vapour.Tags, "sync", this.render);
  },

  render: function () {
    var content = this.template({
      game: this.model,
      tags: Vapour.Tags,
      errors: this.errors
    });
    delete this.errors;

    this.$el.html(content);
    return this;
  },

  events: {
    'submit .game-form': 'createGame',
    'change #game-cover-image-upload': 'coverImageInputChange'
  },

  createGame: function (event) {
    event.preventDefault();
    var $target = $(event.currentTarget);

    var data = $target.serializeJSON().game;

    this.model.save(data,{
      success: function(updated) {
        this.collection.add(this.model, { merge: true });
        this.model.set(this.model.parse(updated));
        delete this.model._cover_image;
        Backbone.history.navigate('games/'+this.model.id, { trigger: true });
      }.bind(this),
      error: function(model, resp) {
        console.log(resp);
        this.errors = resp.responseJSON.errors;
        this.render();
      }.bind(this)
    });
  },

  coverImageInputChange: function (event) {
    var self = this;
    var file = event.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function() {
      self._updatePreview(reader.result);
      self.model._cover_image = reader.result;
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this._updatePreview("");
      delete this.model._cover_image;
    }
  },

  _updatePreview: function(src) {
    this.$el.find("#game-cover-image-preview").attr("src", src);
  }

});
