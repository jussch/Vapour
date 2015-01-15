Vapour.Views.FriendshipsForm = Backbone.ExtendedView.extend({
  template: JST['friendships/_form'],

  intialize: function () {
    // this.listenTo(Vapour.CurrentUser, "sync change", this.render);
    // this.listenTo(this.model, "sync change", this.render);
    // this.listenTo(this.models.recievedRequests(), "change", this.render);
  },

  render: function () {
    var content = this.template({
      user: this.model
    })
    this.$el.html(content);
    this.addUserThumbs();
    return this
  },

  events: {
    "click .accept-request": "acceptRequest",
    "click .ignore-request": "ignoreRequest"
  },

  acceptRequest: function (event) {
    event.preventDefault();
    var $target = $(event.currentTarget),
        userId =  parseInt($target.parent().data('user-id')),
        user = Vapour.Users.getOrFetch(userId),
        id = parseInt($target.parent().data('req-id'));

    $.ajax({
      url: "/api/friendships/"+id+"/approve",
      type: 'POST',
      dataType: 'json',
      success: function (resp) {
        this.model.fetch();
      }.bind(this)
    });
  },

  ignoreRequest: function (event) {
    event.preventDefault();
    var $target = $(event.currentTarget),
    userId =  parseInt($target.parent().data('user-id')),
    user = Vapour.Users.getOrFetch(userId),
    id = parseInt($target.parent().data('req-id'));

    $.ajax({
      url: "/api/friendships/"+id+"/destroy",
      type: 'DELETE',
      dataType: 'json',
      success: function (resp) {
        // this.model.fetch();
      }.bind(this)
    });
  }

})
