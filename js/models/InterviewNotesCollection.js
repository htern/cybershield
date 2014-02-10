define([
	'backbone'
],

function(Backbone) {

	var InterviewNotesCollection = Backbone.Collection.extend({
		initialize: function(options) {
			this.question_id = options.question_id;
		},
//		model: InterviewNotes,
		url: function() {
			return 'api/assessments/notes/' + this.question_id;
		},
	});
  
	return InterviewNotesCollection;
});