define([
	'backbone',
	'models/ClientToolModel'
],

function(Backbone, ClientToolModel) {

	var ClientToolCollection = Backbone.Collection.extend({
		initialize: function(client_id) {
			if (client_id) {
				this.client_id = client_id;
			}
		},
		model: ClientToolModel,
		url: function() {
			return 'api/clientTools/all' + (this.client_id ? '/'+this.client_id : '');
		}
	});
  
	return ClientToolCollection;
});