Vapour.Views.UserShow = Backbone.CompositeView.extend({

  template: JST['users/show'],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);

    return this;
  },

  events: {
    'submit .add-funds': "addFunds"
  },

  addFunds: function (event) {
    event.preventDefault();
    var $target = $(event.currentTarget);

    var data = $target.serializeJSON().user;

    $.ajax({
      url: "/api/users/"+this.model.id+'/add_funds',
      type: 'POST',
      data: data,
      dataType: 'json',
      success: function (resp) {
        this.model.fetch();
      }.bind(this)
    });
  }

});
