define([
	'jquery',
	'underscore',
	'backbone',
	'views/questions/InterviewNotesItem'
], 

function($, _, Backbone, InterviewNotesItem){

	var InterviewNotesList = Backbone.View.extend({

		initialize: function() {
			
			_(this).bindAll('add');
			
			this._notes = [];
			
			this.collection.each(this.add);
			
			this.collection.bind('add', this.add);
		},
		
		render: function() {
			this._rendered = true;
			// clear note list
			this.$el.empty();
			console.log(this._notes);
			_(this._notes).each( function(item) {
//				console.log("added from render()");
//				console.log(item.render().el);
				$("#interviewNotes").append(item.render().el);
			});
		},
		
		add: function(note) {
			var noteItem = new InterviewNotesItem({model: note});
			this._notes.push(noteItem);
			if (this._rendered) {
				console.log("added from add()");
				console.log(noteItem.render().el);
				this.$el.append(noteItem.render().el);
			}
		},

	});

	return InterviewNotesList;
  
});
