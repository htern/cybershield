/**
 * Wrapper for web console
 * @type {{enabled: boolean, log: Function}}
 *
 */
Logger = {
  enabled: true,
  log: function(msg, object) {
    if(this.enabled) {
      if (object)
          console.log(msg, object);
      else
          console.log(msg);
    }
  }
}


window.Shield = {

  Lib: {},
  Collections: {},
  Models: {},
  Views: {},

  init: function() {

    console.log("INIT CyberShield...")

    // Require.js allows us to configure shortcut alias
    // Original concepts provided by Backbone Boilerplate project: https://github.com/tbranyen/backbone-boilerplate
    require.config({

      //deps: ["main"],

      paths: {
      	// libraries
        jquery: 'libs/jquery.min',
        underscore: 'libs/underscore-min',
        backbone: 'libs/backbone-min',
        knockout: 'libs/knockout',
        knockback: 'libs/knockback.min',
        jsonSerial: 'libs/json-serialization',
        session: 'libs/session',
        utils: 'utils',
        templates: '../templates'
      }
    });

    // Load our app module and pass it to our definition function
    require(['app'], function (App) {
      try {
        App.initialize();
      } catch (e) {
        console.log(e);
      }
    });
  }
};

Shield.init();
