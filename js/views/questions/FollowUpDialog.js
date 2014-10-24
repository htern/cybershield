define([
	'jquery',
	'underscore',
	'backbone',
	'knockout',
	'knockback'
], 

// Modal dialog form
function($, _, Backbone, ko, kb){

	var FollowUpDialog = Backbone.View.extend({
		
		initialize: function(options) {

			this.question_id = options.question_id;
//			this.follow_up_with = options.follow_up_with;
//			var questionModel = options.questionModel;

			console.log(this.question_id);
//			console.log(this.follow_up_with);
			console.log(this.model);
			
	  	    this.viewModel = kb.viewModel(this.model);

	  	    var self = this;
			
		    this.$el.load('templates/modals/follow_up_dialog_modal.html', function() {
		    	console.log("successfully loaded follow_up_dialog");
		    	ko.applyBindings(self.viewModel, $("#follow-up-dialog").get(0));
		    	$('#follow-up-dialog').modal({'show': 'true', 'backdrop': 'static'});
		    });
		},
		
		render: function() {
//			console.log(this.model.toJSON());
//			this.$el.html(this.template(this.model.toJSON()));
//			this.$el.load('templates/modals/staff_responsible_dialog_modal.html');

			return this;
		},
		
		show: function(parent) {
			$(document.body).append(this.render().el);
			this.parent = parent;
		},
		
		events: {
			'click .save-action': 'update',
			'click .close,.close-action': 'close',
			'click .clear-action': 'clearFlag',
			'keyup :input': 'logKey',
			'keypress :input': 'logKey'
		},

		logKey: function(e) {
//		    console.log(e.type, e.keyCode);
			// escape key is pressed
		    if (e.keyCode==27) {	
		    	this.close();
		    }
		},
		
		close: function() {
			console.log("closing the follow up modal");
			this.remove();

		},

		update: function() {
			console.log("saving follow up info for question: "+this.question_id);
			console.log($('#followup-notes').val());

			var followup_note = $('#followup-notes').val();
			var followup_flag = 1;
			this.save(followup_note, followup_flag);
		},
		
		clearFlag: function() {
			console.log("clearing follow up flag for question: "+this.question_id);
			console.log($('#followup-notes').val());

			var followup_note = '';
			var followup_flag = 0;
			this.save(followup_note, followup_flag);
		},
		
		save: function(followup_note, followup_flag) {
			
			var self = this;
	    	var followUpModel = this.model;
	    	var now = utils.getCurrentTime();

	    	followUpModel.save({
		    	id: this.question_id,
				assess_question_id: this.question_id,
				follow_up_with: followup_note,
				follow_up_flag: followup_flag,
		        time_now: now,
		        last_touched: Session.get("loginAs")
			},{
	        	success: function(model, response) {
	        		console.log("follow up updated successfully!");
	        		self.parent.refresh();
	        	},
	        	error: function(model, response) {
	        		console.log("error updating follow up question: " + response.responseText);
	        	}
			});
			
			this.close();
		},

	});

	return FollowUpDialog;
  
});
