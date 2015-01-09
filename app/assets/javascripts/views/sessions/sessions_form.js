Vapour.Views.SessionsForm = Backbone.View.extend({

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
    'submit .sign-in-form': 'createSession'
  },

  createSession: function (event) {
    event.preventDefault();
    var $target = $(event.currentTarget);

    var data = $target.serializeJSON().user;

    this.model.save(data,{
      success: function() {
        Vapour.CurrentUser().set(this.model.attributes);
        this.remove()
      }.bind(this),
      error: function(model, resp) {
        this.errors = resp.responseJSON.errors;
        this.render()
      }.bind(this)
    });
  }

});
