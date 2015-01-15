Vapour.Views.SessionsForm = Backbone.CompositeView.extend({

  template: JST['sessions/form'],

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
    'submit .sign-in-form': 'createSession',
    'click .close-modal': 'close'
  },

  createSession: function (event) {
    event.preventDefault();
    var $target = $(event.currentTarget);

    var data = $target.serializeJSON().user;

    this.model.save(data,{
      success: function(model, resp) {
        Vapour.CurrentUser().set(resp);
        Vapour.Users.get(Vapour.CurrentUser().id).set('is_current_user', true);
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
  }

});
