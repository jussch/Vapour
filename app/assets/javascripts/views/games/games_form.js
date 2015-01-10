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
    delete this.errors

    this.$el.html(content);
    return this;
  },

  events: {
    'submit .game-form': 'createGame'
  },

  createGame: function (event) {
    event.preventDefault();
    var $target = $(event.currentTarget);

    var data = $target.serializeJSON().game;

    this.model.save(data,{
      success: function() {
        this.collection.add(this.model, { merge: true });
        Backbone.history.navigate('games/'+this.model.id, { trigger: true });
      }.bind(this),
      error: function(model, resp) {
        this.errors = resp.responseJSON.errors;
        this.render()
      }.bind(this)
    });
  }

});
