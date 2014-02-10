define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/modals/employee_responsible_dialog_modal.html',
	'knockout',
	'knockback'
], 

// Modal dialog form
function($, _, Backbone, EmployeeResponsibleDialogTemplate, ko, kb){

	var EmployeeResponsibleDialog = Backbone.View.extend({

		initialize: function(options) {
//			this.template = _.template(StaffResponsibleDialogTemplate);

			this.question_id = options.question_id;
			var employeeModel = options.employeeModel;
			
	  	    this.viewModel = kb.viewModel(employeeModel);
	  	    this.viewModel.selectedEmployeeValue = ko.observable();

	  	    var self = this;
			
		    this.$el.load('templates/modals/employee_responsible_dialog_modal.html', function() {
		    	console.log("successfully loaded employee_responsible_dialog");
		    	ko.applyBindings(self.viewModel, $("#staff-responsible-dialog").get(0));
		    	$('#staff-responsible-dialog').modal('show');
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
			console.log("closing add staff modal");
			this.remove();
		},

		save: function() {
			console.log("saving staff responsible");
			console.log($('#selected_employee').val());
			
			var self = this;
	    	var employeeUtilizationModel = this.model;

	    	console.log(employeeUtilizationModel);

	    	employeeUtilizationModel.save({
				assess_question_id: this.question_id,
				employee_id: $('#selected_employee').val(),
			},{
	        	success: function(model, response) {
	        		console.log("employee added successfully!");
	        		self.parent.loadEmployeeUtilization();
	        	},
	        	error: function(model, response) {
	        		console.log("error adding employee: " + response.responseText);
	        	}
			});
			
			this.remove();
		},
	});

	return EmployeeResponsibleDialog;
  
});
