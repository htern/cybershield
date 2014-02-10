define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/assessments/employee_responsible_item.html'
], 

function($, _, Backbone, EmployeeResponsibleItemTemplate){

	
	EmployeeResponsibleItem = Backbone.View.extend({
		
		tagName: 'tr',
		initialize: function() {
			this.render = _.bind(this.render, this);
			this.template = _.template(EmployeeResponsibleItemTemplate);
			this.model.bind('change', this.render);
		},
		events: {
//			'dblclick': 'edit',
//			'change input': 'modify',
			'click a.delete': 'deleteItem',
		},
		render: function() {
//			console.log(this.model.attributes);
			this.$el.html(this.template(this.model.attributes));
			return this;
		},
		deleteItem: function(e) {
			console.log("removing employee.");
			this.model.set("id", this.model.get("employee_id"));
			// Deleting/destroying the model
			this.model.destroy({
				success: function(model, response){
					console.log("Success deleted employee.");
				},
				error: function(model, response){
					console.log("Error deleting employee utilization: " + response.responseText);
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
		
	});

	return EmployeeResponsibleItem;
  
});
