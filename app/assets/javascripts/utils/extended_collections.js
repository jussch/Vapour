Backbone.ExtendedCollection = Backbone.Collection.extend({

  getOrFetch: function(id){
    var model = this.get(id);

    if (!model) {
      model = new this.model({id: id});
      var collection = this;
      model.fetch({
        success: function() {
          collection.add(model);
        }
      });
    } else {
      model.fetch();
    }

    return model;
  }

});