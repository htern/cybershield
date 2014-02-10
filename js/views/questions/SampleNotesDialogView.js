define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/modals/notes_dialog_modal.html'
], 

// Modal dialog form
function($, _, Backbone, NotesDialogTemplate){

	var NotesDialogView = Backbone.View.extend({

//		events: {
//			'click .save-action': 'save',
//			'click .close,.close-action': 'close'
//		},
		initialize: function() {
			
			this.template = _.template(NotesDialogTemplate);
			console.log(this);
		},
		render: function() {
			this.$el.html(this.template);
//			/*
//			 * We'll initialize datetime picker
//			 */
//			this.$el.find('#dp1').datetimepicker();
			return this;
		},
		show: function() {
			$(document.body).append(this.render().el);
		},
//		close: function() {
//			this.remove();
//		},
//		/*
//		 * Handling the save click, adding item to collection and persisting data to DB
//		 */
//		save: function() {
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
//			this.remove();
//		},
//
//		render: function(){
//      
//			$('.navbar li').removeClass('active');
//			$('.navbar li a[href="'+window.location.hash+'"]').parent().addClass('active');
//			this.$el.html(assessmentTabs);
//		}
	});

	return NotesDialogView;
  
});
