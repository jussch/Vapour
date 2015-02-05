Vapour.Views.UserShow = Backbone.ExtendedView.extend({

  template: JST['users/show'],

  initialize: function () {
    this.listenTo(Vapour.CurrentUser(), "change sync", this.render);
    this.listenTo(this.model, "sync change", this.render);
    this.listenTo(this.model.boughtGames(), "change", this.render);
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    this.appendFriendshipForms();
    this.addUserThumbs();
    this.populateGames('.bought-games-list', this.model.boughtGames().getFromGlobal());
    return this;
  },

  events: {
    'submit .add-funds': "addFunds",
    'click .edit-profile-button': "openEditProfile"
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

  openEditProfile: function (event) {
    var view = new Vapour.Views.UsersEdit({ model: this.model });
    Vapour.RootRouter.trigger('swapModal', view);
  },

  appendFriendshipForms: function () {
    var selector = this.$('.friendships'), view;
    if (this.model.get('is_current_user')) {
      view = new Vapour.Views.FriendshipsForm({model: this.model});
    } else {
      view = new Vapour.Views.FriendshipsSend({model: this.model});
    }
    this.addSubview(selector, view);
  }

});
