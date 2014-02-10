define([
	'backbone'
],

function(Backbone) {

	var ClientToolModel = Backbone.Model.extend({
		initialize: function(options) {
			if (options) {
				this.client_tool_id = options.client_tool_id;
			}
		},
	    defaults: {
	    	"client_tool_id": null,
	    	"client_id": null,
	    	"vendor_product_id": null,
	    	"vendor_id": null,
	    	"vendor_name": "",
	    	"tool_type_id": null,
	    	"product_name": "",
	    	"version_number": "",
	    	"purchase_date": null,
	    	"purchase_cost": 0.00,
	    	"depreciation_cost": 0.00,
	    	"annual_maint_cost": 0.00,
	    	"maint_expiration_date": null,
	    	"license_purchased": 0,
	    	"license_used": 0,
	    	"deployed_percentage": 0,
	    	"utilization_percentage": 0
	    },
		urlRoot: 'api/clientTools',
		url: function() {
			return this.urlRoot + (this.client_tool_id ? '/'+this.client_tool_id : '/new');
		}
	});

	return ClientToolModel;
	
});