define([
	'backbone'
],

function(Backbone) {

	var EmployeeUtilizationCollection = Backbone.Collection.extend({
		initialize: function(question_id) {
			if (question_id) {
				this.question_id = question_id;
			}
		},
//		model: EmployeeUtilizationModel,
		url: function() {
			return 'api/assessments/employees/' + this.question_id;
		}
	});
  
	return EmployeeUtilizationCollection;
	
});