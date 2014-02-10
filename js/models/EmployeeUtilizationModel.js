define([
	'backbone'
],

function(Backbone) {

	var EmployeeUtilizationModel = Backbone.Model.extend({
		initialize: function(options) {
			if (options) {
				this.employee_id = options.employee_id;
			}
		},
		defaults: {
			id: null,
			assess_question_id: null,
			employee_id: null
		},
		urlRoot: 'api/assessments/employees',
		url: function() {
			return this.urlRoot + (this.employee_id ? '/'+this.employee_id : '');
		}
	});
	
	return EmployeeUtilizationModel;
	
});