Vapour.Views.ScreenshotsForm = Backbone.CompositeView.extend({

  template: JST['screenshots/form'],

  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render);
    this.game = options.game;
  },

  render: function () {
    var content = this.template({
      screenshot: this.model,
      errors: this.errors
    });
    delete this.errors

    this.$el.html(content);
    return this;
  },

  events: {
    'submit .screenshot-form': 'createScreenshot',
    'click .close-modal': 'close',
    'change #file-screenshot-upload': 'fileInputChange'
  },

  createScreenshot: function (event) {
    event.preventDefault();
    var $target = $(event.currentTarget);

    var data = $target.serializeJSON().screenshot;
    data.game_id = this.game.id;

    if (this.model._file && data.image_url !== "") {
      this.errors = ["Please only do one: upload from file or give a URL"];
      delete this.model._file;
      this.render();
      return;
    } else if (!data.image_url.match(/http(s)?:\/\//) && !this.model._file) {
      this.errors = ["Please give a valid http url."];
      this.render();
      return;
    }

    this.$('.submit').prop('disabled', true);

    this.model.save(data,{
      success: function() {
        this.collection.add(this.model, { merge: true });
        Vapour.RootRouter.trigger('removeModal');
      }.bind(this),
      error: function(model, resp) {
        this.errors = resp.responseJSON.errors;
        this.$('.submit').prop('disabled', false);
        this.render()
      }.bind(this)
    });
  },

  close: function (event) {
    event.preventDefault();
    Vapour.RootRouter.trigger('removeModal');
  },

  fileInputChange: function (event) {
    var self = this;
    var file = event.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function() {
      self._updatePreview(reader.result);
      self.$(".url-upload").val("");
      self.model._file = reader.result;
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this._updatePreview("");
      delete this.model._file;
    }
  },

  _updatePreview: function(src) {
    this.$el.find(".preview-screenshot-upload").attr("src", src);
  }


});
