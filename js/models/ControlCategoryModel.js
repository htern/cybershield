define([
	'backbone'
],

function(Backbone) {

	var ControlCategoryModel = Backbone.Model.extend({
		initialize: function(options) {
			if (options) {
				this.control_category_id = options.control_category_id;
			}
		},
		urlRoot: 'api/categories',
	});

	return ControlCategoryModel;
	
});