define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/security_controls/control_question-list.html'], 

function($, _, Backbone, controlQuestionsTemplate){

  var ControlQuestion = Backbone.Model.extend({
    urlRoot: 'api/controlquestions'
  });

  var ControlQuestionCollection = Backbone.Collection.extend({
    initialize: function(options) {
      this.id = options.id;
    },
    model: ControlQuestion,
    url: function() {
      return 'api/controlquestions/'+this.id;
    }

  });

  var ControlQuestionsView = Backbone.View.extend({
    el: $("#subTabPage"),

    render: function(options){
      
      var self = this;

      if (options.id) {
        var controlquestions = new ControlQuestionCollection({id: options.id});
        controlquestions.fetch({
          success: function (controlquestions) {
            var template = _.template(controlQuestionsTemplate, {controlquestions: controlquestions.models});
            self.$el.html(template);
          }
        })
      }

      $('.controls-nav li').removeClass('active');
      $('.controls-nav li a[href="'+window.location.hash+'"]').parent().addClass('active');

    }

  });

  return ControlQuestionsView;
  
});
