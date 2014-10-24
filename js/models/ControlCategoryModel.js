define([
	'backbone'
],

function(Backbone) {

	var ControlCategoryModel = Backbone.Model.extend({
		initialize: function(options) {
			if (options) {
				this.assessment_id = options.assessment_id;
				this.category_id = options.category_id;
			}
		},
		urlRoot: 'api/categories',
		url: function() {
			return this.urlRoot + (this.assessment_id ? '/'+this.assessment_id+'/'+this.category_id : '' );
		}
	});

	return ControlCategoryModel;
	
});