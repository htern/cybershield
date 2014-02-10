define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/security_controls/load_security_controls.php'
], function($, _, Backbone, securityControlsTemplate){

  var SecurityControlsView = Backbone.View.extend({
    el: $("#subTabPage"),

    render: function(options){
      
      $('.controls-nav li').removeClass('active');
      $('.controls-nav li a[href="'+window.location.hash+'"]').parent().addClass('active');

      // if (options) {
        // var clientAssessmentID = options.id;
        // var ClientAssessModel = Backbone.Model.extend({});
        // var data = new ClientAssessModel({id: clientAssessmentID});
      //   var data = {client_assess_id: options.id};
      //   var template = _.template( securityControlsTemplate, data );
      //   this.$el.html(template);
      // } else {
      //   this.$el.html(securityControlsTemplate);
      // }
      this.$el.html(securityControlsTemplate);

/*
//      var that = this;
      if(options.id) {
        var user = new User({id: options.id});
        that.user.fetch({
          success: function (user) {    
            var template = _.template($('#edit-user-template').html(), {user: user});
            that.$el.html(template);
          }
        })
      } else {
        var template = _.template($('#edit-user-template').html(), {user: null});
        that.$el.html(template);
      }      


      this.$el.html(securityControlsTemplate);
*/
    }

  });

  return SecurityControlsView;
  
});
