define([
  'jquery',
  'underscore',
  'backbone',
  'views/tools/ToolsContentView',
  'text!templates/tools/tools_page_template.html'],

function($, _, Backbone, ToolsContentView, toolsTemplate){

  var ToolsView = Backbone.View.extend({
    el: $("#mainView"),

    render: function(){
      this.$el.html(toolsTemplate);

      var toolsContentView = new ToolsContentView();
      toolsContentView.render();
    },

  });

  return ToolsView;
  
});
