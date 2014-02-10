define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/assessments/assessmentTabs.html'
], function($, _, Backbone, assessmentTabs){

  var AssessmentTabsView = Backbone.View.extend({
    el: $("#mainView"),

    render: function(){
      
      $('.navbar li').removeClass('active');
      $('.navbar li a[href="'+window.location.hash+'"]').parent().addClass('active');
      this.$el.html(assessmentTabs);

    }

  });

  return AssessmentTabsView;
  
});
