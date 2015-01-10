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
    'submit .screenshot-form': 'createScreenshot'
  },

  createScreenshot: function (event) {
    event.preventDefault();
    var $target = $(event.currentTarget);

    var data = $target.serializeJSON().screenshot;
    data.game_id = this.game.id;

    this.model.save(data,{
      success: function() {
        this.collection.add(this.model, { merge: true });
        this.remove();
      }.bind(this),
      error: function(model, resp) {
        this.errors = resp.responseJSON.errors;
        this.render()
      }.bind(this)
    });
  }

});
