// Filename: app.js
define([
  'jquery', 
  'underscore', 
  'backbone',
  'router' ], 

function($, _, Backbone, Router) {

  var initialize = function() {
    // Pass in our Router module and call it's initialize function
    try {
      Router.initialize();
    } catch (e) {
      console.log(e);
    }
  };

  return { 
    initialize: initialize
  };
});
