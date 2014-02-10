define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/security_controls/add_new_control.html.php'
], function($, _, Backbone, addNewControlTemplate){

  var AddNewControlView = Backbone.View.extend({
    el: $("#subTabPage"),

    render: function(){
      
      $('.controls-nav li').removeClass('active');
      $('.controls-nav li a[href="'+window.location.hash+'"]').parent().addClass('active');
      this.$el.html(addNewControlTemplate);
    }

  });

  return AddNewControlView;
  
});
