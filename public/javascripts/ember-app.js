App = Ember.Application.create();
App.ApplicationAdapter = DS.RESTAdapter.extend();
App.ApplicationAdapter.reopen({
  host: "http://localhost:3000",
  corsWithCredentials: true,
  pathForType: function(type) {
    if(type === "tinystore")
      return "stores";
    else
      return Ember.String.pluralize(type);
  }
});

App.ApplicationSerializer = DS.RESTSerializer.extend({
    typeForRoot: function(root) {
      if(root === "stores" || root === "store")
        return "tinystore";
      else
        return Ember.String.singularize(root);
    }
});

App.Router.map(function() {
  this.resource('stores', { path: "/" });
  this.resource('tinystore', { path: "/stores/:tinystore_id"});
});

App.StoresRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('tinystore');
  }
});

App.Tinystore = DS.Model.extend({
  name: DS.attr('string'),
  products: DS.hasMany('product', { async: true })
});

App.Product = DS.Model.extend({
  name: DS.attr('string'),
  price: DS.attr('number'),
  image: DS.attr('string')
});

App.Product.FIXTURES = [
  {
    id: 1,
    name: "Xbox Game",
    price: 60,
    image: "images/game.png"
  }
];

App.Tinystore.FIXTURES = [
  {
    id: 1,
    name: "Sticks & Stones",
    products: [1]
  },
  {
    id: 2,
    name: "Sofas Co."
  }
];
