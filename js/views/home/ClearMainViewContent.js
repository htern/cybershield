define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){

  var ClearMainViewContent = Backbone.View.extend({
    el: $("#mainView"),

    render: function(){
      this.$el.html('');
    }

  });

  return ClearMainViewContent;
  
});
