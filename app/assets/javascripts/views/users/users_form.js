Vapour.Views.UsersForm = Backbone.CompositeView.extend({

  template: JST['users/form'],

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
    'submit .sign-up-form': 'createUser',
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
  }

});
