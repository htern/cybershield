define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/assessments/interview_notes_item.html'
], 

function($, _, Backbone, NotesItemTemplate){

	
	InterviewNotesItem = Backbone.View.extend({
		
		tagName: 'tr',
		initialize: function() {
			this.render = _.bind(this.render, this);
			this.template = _.template(NotesItemTemplate);
			this.model.bind('change', this.render);
		},
		events: {
//			'dblclick': 'edit',
//			'change input': 'modify',
			'click a.delete': 'deleteItem'
		},
		render: function() {
//			console.log(this.model.attributes);
			this.$el.html(this.template(this.model.attributes));
			return this;
		},
		deleteItem: function(e) {
			console.log("removing notes.");
			this.model.set("id", this.model.get("assess_note_id"));
			console.log(this.model);
			// Deleting/destroying the model
			this.model.destroy({
				success: function(model, response){
					console.log("Success deleted notes.");
				},
				error: function(model, response){
					console.log("Error deleting notes: " + response.responseText);
				}
			});
			// Removing from view
			this.$el.remove();
			e.preventDefault();
		},
//		edit: function() {
//			new TaskDialog({model: this.model}).show();
//		},
//		/*
//		 * We are listening for status checkbox, it updates the model and presist status to the DB
//		 */
//		modify: function(e) {
//			var status = e.currentTarget.checked ? 1 : 0;
//			this.model.set({status: status});
//			this.model.save();
//			/*
//			 * We'll add strikethrough class to the title and date just to visually distinguish finished from unfinished task
//			 */
//			if (status === 1) {
//				this.$el.find('td').addClass('finished');
//			} else {
//				this.$el.find('td').removeClass('finished');
//			}
//		},
//		/*
//		 * Handling the deletion of item
//		 */
//		delete: function (e) {
//			/*
//			 * Deleting/destroying the model
//			 */
//			this.model.destroy();
//
//			/*
//			 * Removing the single view
//			 */
//			this.$el.remove();
//			e.preventDefault();
//		}
	});

	return InterviewNotesItem;
  
});
