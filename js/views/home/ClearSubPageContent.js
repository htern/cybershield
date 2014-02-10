define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){

  var ClearSubPageContent = Backbone.View.extend({
    el: $("#subTabPage"),

    render: function(){
      this.$el.html('');
    }

  });

  return ClearSubPageContent;
  
});
