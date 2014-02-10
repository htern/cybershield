define([
	'backbone'
],

function(Backbone) {

	var InterviewNotesModel = Backbone.Model.extend({
		initialize: function(options) {
			if (options) {
				this.question = options.question;
			}
		},
		defaults: {
			id: null,
			assess_note_id: null,
			assess_question_id: null,
			note_created_by: "",
			note_entry_date: "",
			notes: ""
		},
		urlRoot: 'api/assessments/notes',
		url: function() {
			return this.urlRoot + (this.assess_note_id ? '/'+this.assess_note_id : '');
		}
	});
	
	return InterviewNotesModel;
	
});