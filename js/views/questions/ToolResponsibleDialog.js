define([
	'jquery',
	'underscore',
	'backbone',
	'knockout',
	'knockback'
], 

// Modal dialog form
function($, _, Backbone, ko, kb){

	var ToolResponsibleDialog = Backbone.View.extend({

		initialize: function(options) {
//			this.template = _.template(StaffResponsibleDialogTemplate);

			this.question_id = options.question_id;
			var toolModel = options.toolModel;
			
	  	    this.viewModel = kb.viewModel(toolModel);
	  	    this.viewModel.selectedToolValue = ko.observable();

	  	    var self = this;
			
		    this.$el.load('templates/modals/tool_responsible_dialog_modal.html', function() {
		    	console.log("successfully loaded tool_responsible_dialog");
		    	ko.applyBindings(self.viewModel, $("#tool-responsible-dialog").get(0));
		    	$('#tool-responsible-dialog').modal('show');
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
			'click .save-action': 'save',
			'click .close,.close-action': 'close'
		},
		
		close: function() {
			console.log("closing add security tool modal");
			this.remove();
		},

		save: function() {
			console.log("saving security tool responsible");
			console.log($('#selected_tool').val());
			
			var self = this;
	    	var toolUtilizationModel = this.model;

	    	console.log(toolUtilizationModel);

	    	toolUtilizationModel.save({
				assess_question_id: this.question_id,
				client_tool_id: $('#selected_tool').val(),
			},{
	        	success: function(model, response) {
	        		console.log("security tool added successfully!");
	        		self.parent.loadToolUtilization();
	        	},
	        	error: function(model, response) {
	        		console.log("error adding security tool: " + response.responseText);
	        	}
			});
			
			this.remove();
		},
	});

	return ToolResponsibleDialog;
  
});
