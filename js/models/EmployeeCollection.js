define([
	'backbone'
],

function(Backbone) {

	var EmployeeCollection = Backbone.Collection.extend({
		initialize: function(client_id) {
			if (client_id) {
				this.client_id = client_id;
			}
		},
//		model: EmployeeModel,
		url: function() {
			return 'api/employees/all' + (this.client_id ? '/'+this.client_id : '');
		}
	});
  
	return EmployeeCollection;
	
});