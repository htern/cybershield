define([
	'backbone'
],

function(Backbone) {

	var ClientAssessmentModel = Backbone.Model.extend({
		initialize: function(options) {
			if (options) {
				this.client_assess_id = options.client_assess_id;
			}
		},
//	    defaults: {
//	    	"client_id": null,
//	    	"standard_id": null,
//	    	"assessment_date": "",
//	    	"status": "",
//	    	"contact_name": "",
//	    	"assessed_by": ""
//	    },
		urlRoot: 'api/assessments',
	});

	return ClientAssessmentModel;
	
});