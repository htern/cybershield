define([
	'backbone'
],

function(Backbone) {

	var ToolUtilizationModel = Backbone.Model.extend({
		initialize: function(options) {
			if (options) {
				this.client_tool_id = options.client_tool_id;
			}
		},
		defaults: {
			id: null,
			assess_question_id: null,
			client_tool_id: null
		},
		urlRoot: 'api/assessments/tools',
		url: function() {
			return this.urlRoot + (this.client_tool_id ? '/'+this.client_tool_id : '');
		}
	});
	
	return ToolUtilizationModel;
	
});