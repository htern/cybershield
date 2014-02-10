define([
	'backbone',
], 

function(Backbone) {

	var AssessmentQuestionModel = Backbone.Model.extend({

		initialize: function(options) {
			if (options)
				this.question_id = options.question_id;
			else
				this.question_id = null;
		},
		urlRoot: 'api/questions',
		url: function() {
			return this.urlRoot + '/' + this.question_id;
		}

	});

  	return AssessmentQuestionModel;

});
