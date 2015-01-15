Vapour.Views.FriendshipsSend = Backbone.ExtendedView.extend({
  template: JST['friendships/_send'],

  intialize: function () {
    this.listenTo(Vapour.CurrentUser(), "sync change", this.render);
    this.listenTo(this.model, "sync change", this.render);
  },

  render: function () {
    var content = this.template({
      user: this.model,
      currUser: Vapour.CurrentUser()
    })
    this.$el.html(content);
    return this
  },

  events: {
    'click .send-request': 'sendRequest'
  },

  sendRequest: function (event) {
    event.preventDefault();
    var $target = $(event.currentTarget),
        data = {reciever_id: this.model.id},
        friendship = new Vapour.Models.Friendship();
    friendship.save(data,{
      success: function (model) {
        this.model.fetch();
        Vapour.CurrentUser().sentRequests().add(model);
      }.bind(this)
    })
  }

})
