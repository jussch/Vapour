Vapour.Views.UsersEdit = Backbone.CompositeView.extend({

  template: JST['users/edit'],

  render: function () {
    var content = this.template({
      user: this.model,
      errors: this.errors
    });
    delete this.errors

    this.$el.html(content);
    return this;
  },

  events: {
    'submit .edit-profile': 'createUser',
    'change #input-avatar-upload': 'avatarInputChange',
    'click .close-modal': 'close'
  },

  createUser: function (event) {
    event.preventDefault();
    var $target = $(event.currentTarget);

    var data = $target.serializeJSON().user;

    this.model.save(data, {
      success: function(model, resp) {
        Vapour.CurrentUser().set(resp);
        Vapour.RootRouter.trigger('removeModal');
      }.bind(this),
      error: function(model, resp) {
        this.errors = resp.responseJSON.errors;
        this.render();
      }.bind(this)
    });
  },

  close: function (event) {
    event.preventDefault();
    Vapour.RootRouter.trigger('removeModal');
  },

  avatarInputChange: function (event) {
    var self = this;
    var file = event.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function() {
      self._updatePreview(reader.result);
      self.model._avatar = reader.result;
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this._updatePreview("");
      delete this.model._avatar;
    }
  },

  _updatePreview: function(src) {
    this.$el.find(".preview-avatar-upload").attr("src", src);
  }

});
