define([
	'backbone'
],

function(Backbone) {

	var ClientModel = Backbone.Model.extend({
		initialize: function(options) {
			if (options) {
				this.client_id = options.client_id;
			}
		},
		urlRoot: 'api/clients',
	});

	return ClientModel;
	
});