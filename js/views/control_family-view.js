define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/security_controls/control_family-list.html' ],

function($, _, Backbone, controlFamilyTemplate) {

  var ControlFamily = Backbone.Model.extend({
    urlRoot: 'api/controlfamilies'
  });

  var ControlFamilyCollection = Backbone.Collection.extend({
    model: ControlFamily,
    url: 'api/controlfamilies'
  });

  var ControlFamilyView = Backbone.View.extend({
    el: $("#subTabPage"),

    render: function(){

      var self = this;
      var controlfamilies = new ControlFamilyCollection();
      controlfamilies.fetch({
        success: function (controlfamilies) {
          var template = _.template(controlFamilyTemplate, {controlfamilies: controlfamilies.models});
          self.$el.html(template);
        }
      })
      
      $('.controls-nav li').removeClass('active');
      $('.controls-nav li a[href="'+window.location.hash+'"]').parent().addClass('active');
    }

  });

  return ControlFamilyView;
  
});
