define([
	'backbone'
],

function(Backbone) {

	var VendorProductCollection = Backbone.Collection.extend({
		initialize: function(vendor_id) {
			console.log("VendorProductCollection INIT options: ");
			if (vendor_id) {
				this.vendor_id = vendor_id;
			}
		},
//		model: VendorProductModel,
		url: function() {
			return 'api/vendorProducts' + (this.vendor_id ? '/'+this.vendor_id : '');
		}
	});
	  
	return VendorProductCollection;
	
});