define([
	'backbone'
],

function(Backbone) {

	var ToolUtilizationCollection = Backbone.Collection.extend({
		initialize: function(question_id) {
			if (question_id) {
				this.question_id = question_id;
			}
		},
//		model: ToolUtilizationModel,
		url: function() {
			return 'api/assessments/tools/' + this.question_id;
		}
	});
  
	return ToolUtilizationCollection;
	
});