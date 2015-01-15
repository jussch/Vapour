Vapour.Views.UserShow = Backbone.CompositeView.extend({

  template: JST['users/show'],

  initialize: function () {
    this.listenTo(Vapour.CurrentUser(), "change sync", this.render);
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    this.appendFriendshipForms();
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
  },

  appendFriendshipForms: function () {
    var $selector = this.$('.friendships'), view;
    if (this.model.get('is_current_user')) {
      view = new Vapour.Views.FriendshipsForm({model: this.model});
    } else {
      view = new Vapour.Views.FriendshipsSend({model: this.model});
    }
    this.addSubview($selector, view);
  }

});
