define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/home/home.php'
], function($, _, Backbone, homeView){

  var HomeView = Backbone.View.extend({
    el: $("#mainView"),

    render: function(){
      this.$el.html(homeView);
    },

  });

  return HomeView;
  
});
