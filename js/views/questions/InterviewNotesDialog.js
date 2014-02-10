define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/modals/interview_notes_dialog_modal.html'
], 

// Modal dialog form
function($, _, Backbone, NotesDialogTemplate){

	var InterviewNotesDialog = Backbone.View.extend({

		initialize: function() {
			this.template = _.template(NotesDialogTemplate);
		},
		
		render: function() {
			console.log(this.model.toJSON());
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},
		
		show: function(parent) {
			$(document.body).append(this.render().el);
			this.parent = parent;
		},
		
		events: {
			'click .save-action': 'save',
			'click .close,.close-action': 'close'
		},
		
		close: function() {
			this.remove();
		},

		save: function() {
			console.log("save note is clicked");
			
			var self = this;
	    	var today = new Date();
	    	var now = today.getFullYear() + '-' + (1 + today.getMonth()) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

//	    	console.log(this.model);
//	    	
//	    	this.model.set({
//				assess_question_id: Session.get("currentQuestionID"),
//				note_created_by: Session.get("loginAs"),
//				note_entry_date: now,
//				notes: $('#notes').val()
//	    	});
//    		notesList.create(this.model);
	    	
//	    	var question = this.model.question;
	    	var interviewNotes = this.model;
			console.log(interviewNotes);
//			console.log(question);
			interviewNotes.save({
				assess_question_id: Session.get("currentQuestionID"),
				note_created_by: Session.get("loginAs"),
				note_entry_date: now,
				notes: $('#notes').val()
			},{
	        	success: function(model, response) {
	        		console.log("note created successfully!");
	        		self.parent.loadInterviewNotes();
//					this.model.set({project_id: currentProjectId});
//	        		console.log(self.model);
//	        		notesList.create(self.model);
	        	},
	        	error: function(model, response) {
	        		console.log("error creating notes!" + response.responseText);
	        	}
			});
			
//			/*
//			 * We'll save a reference to current context
//			 */
//			var that = this;
//
//			/*
//			 * Traversing input elements in current dialog
//			 */
//			$.each(this.$el.find('input'), function(i, item) {
//				var attribute = {};
//				/*
//				 * Matching name and value
//				 */
//				attribute[item.name] = item.value;
//				that.model.set(attribute);
//			});
//
//			/*
//			 * Same logic as in the project dialog, different approach for new and modified task
//			 */
//			if (null == this.model.id) {
//				/*
//				 * Adding project ID information read from "global" variable
//				 */
//				this.model.set({project_id: currentProjectId});
//				tasks.create(this.model);
//			} else {
//				this.model.save();
//			}
			
			this.remove();
		},
	});

	return InterviewNotesDialog;
  
});
