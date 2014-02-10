define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/security_controls/controlTabs.html'
], function($, _, Backbone, controlTabs){

  var ControlTabsView = Backbone.View.extend({
    el: $("#mainView"),

    render: function(){
      
      $('.nav li').removeClass('active');
      $('.nav li a[href="'+window.location.hash+'"]').parent().addClass('active');
      this.$el.html(controlTabs);

    }

  });

  return ControlTabsView;
  
});
