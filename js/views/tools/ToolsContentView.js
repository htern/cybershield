define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/tools/tools_content_template.html'],

function($, _, Backbone, toolsContentTemplate){

  var ToolsContentView = Backbone.View.extend({
    el: $("#toolsMainView"),

    render: function(){

      $("#toolsMainView").html(toolsContentTemplate);

    }

  });

  return ToolsContentView;
  
});
