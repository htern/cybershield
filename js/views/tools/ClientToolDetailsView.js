define([
	'jquery',
	'underscore',
	'backbone',
	'models/ClientToolModel',
	'models/VendorProductCollection',
	'knockout',
	'knockback'
], 

function($, _, Backbone, ClientToolModel, VendorProductCollection, ko, kb) {

	var ClientToolDetailsView = Backbone.View.extend({
		
		el: $("#subTabPage"),
		viewModel: null,
		clientToolModel: null,
		clientToolItem: null,
		vendorProducts: null,
    
		initialize: function(client_tool_id) {
			console.log("ClientToolDetailsView is initializing for: "+ client_tool_id);
    	
	    	// reset errorMsg
	    	Session.set("errorMsg", "");
	    	
	    	this.client_tool_id = client_tool_id;
	    	
	    	// load Vendor Products first
	    	this.getVendorProducts();
//			this.getClientTool(client_tool_id);
		},

		getVendorProducts: function() {
	    	console.log("Retrieving Vendor Products...");
	    	var self = this;
	    	this.vendorProducts = new VendorProductCollection();
	    	this.vendorProducts.fetch({
		    	success: function (data) {
		    		console.log("success getting vendor products");
		    		
		    		// successfully loading vendor products
		    		self.vendorProduct =  JSON.parse(ko.toJSON(data));
//		    		console.log(ko.toJSON(data, null, 2));
		    		
		    		// now load the Client Tool data
					self.getClientTool(self.client_tool_id);
		    	},
		    	error: function(data) {
		    		console.log("error retrieving vendor products");
		    	}
	    	});
			
		},
		
	    getClientTool: function(client_tool_id) {
	    	console.log("Retrieving Client Tool data...");
	    	
		    var self = this;
		    
		    this.clientToolModel = new ClientToolModel({client_tool_id: client_tool_id});
	    	
		    this.clientToolModel.fetch({
		    	success: function (data) {
		    		console.log("successfully fetching client tools");
		    		self.show(data);
		    	},
		    	error: function(data) {
		    		console.log("error retrieving client tool");
		    	}
		    });
	    },
	    
	    refresh: function() {
	    	console.log("ClientToolDetailsView.refresh is called.");
	    	if (this.clientToolItem) {
		    	this.clientToolItem.failedValidation = Session.get("errorMsg") ? true : false;
		    	this.clientToolItem.errorMsg = Session.get("errorMsg") ? Session.get("errorMsg") : "";
		    	this.clientToolItem.admin= Session.get("admin") ? Session.get("admin") : false;
	    	}
	    },
	    
	    show: function(data) {
	    	this.clientToolItem = data.attributes;
	    	this.clientToolItem.failedValidation = Session.get("errorMsg") ? true : false;
	    	this.clientToolItem.errorMsg = Session.get("errorMsg") ? Session.get("errorMsg") : "";
	    	this.clientToolItem.admin= Session.get("admin") ? Session.get("admin") : false;
		  	this.clientToolItem.client_name = Session.get("Client:client_name");
		  	this.clientToolItem.vendorOptions = this.vendorProduct;
	    	this.clientToolItem.deployedPercentage = 
	    		[ {"val":0, "percent":"0 %"}, 
	    		  {"val":0.1, "percent":"10 %"}, {"val":0.2, "percent":"20 %"},
	    		  {"val":0.3, "percent":"30 %"}, {"val":0.4, "percent":"40 %"},
	    		  {"val":0.5, "percent":"50 %"}, {"val":0.6, "percent":"60 %"},
	    		  {"val":0.7, "percent":"70 %"}, {"val":0.8, "percent":"80 %"},
	    		  {"val":0.9, "percent":"90 %"}, {"val":1, "percent":"100 %"} ];
	    	this.clientToolItem.utilizationPercentage = 
	    		[ {"val":0, "percent":"0 %"}, 
	    		  {"val":0.1, "percent":"10 %"}, {"val":0.2, "percent":"20 %"},
	    		  {"val":0.3, "percent":"30 %"}, {"val":0.4, "percent":"40 %"},
	    		  {"val":0.5, "percent":"50 %"}, {"val":0.6, "percent":"60 %"},
	    		  {"val":0.7, "percent":"70 %"}, {"val":0.8, "percent":"80 %"},
	    		  {"val":0.9, "percent":"90 %"}, {"val":1, "percent":"100 %"} ];

//		  	this.clientToolItem.productTypeOptions = [
//				"Application Firewall",
//				"Application Security Testing",
//				"Application Whitelisting",
//				"Backup Software",
//				"Configuration Compliance Management",
//				"Data Loss Prevention",
//				"eGRC",
//				"Email/Spam Filtering",
//				"Encryption",
//				"Endpoint Protection / AntiVirus",
//				"Enterprise Architecture",
//				"Enterprise Portfolio Management",
//				"Firewall",
//				"Forensics",
//				"Incident Response Management",
//				"Intrusion Prevention System",
//				"IT Asset Inventory",
//				"IT Service Management Ticketing",
//				"Mobile Device Management",
//				"Network Access Control",
//				"Network Policy Management",
//				"Patch Management",
//				"Penetration Testing",
//				"Privileged Identity and Access Management",
//				"Remote Server Administration",
//				"Security Awareness Delivery Software",
//				"SIEM",
//				"Software Change Management",
//				"VPN",
//				"Vulnerability Management",
//				"Web Application Firewall",
//				"Wireless LAN Intrusion Prevention System"];
		  	
		  	this.clientToolItem.purchase_cost = "$" + parseFloat(this.clientToolItem.purchase_cost).toLocaleString();
		  	this.clientToolItem.annual_maint_cost = "$" + parseFloat(this.clientToolItem.annual_maint_cost).toLocaleString();
		  	this.clientToolItem.depreciation_cost = "$" + parseFloat(this.clientToolItem.depreciation_cost).toLocaleString();

	    	console.log(this.clientToolItem);
	    	
		    var model = new Backbone.Model(this.clientToolItem);
		    var self = this;
	    	
		    this.viewModel = kb.viewModel(model);
		    
		    this.viewModel.vendorSelectedValue = ko.observable(this.clientToolItem.vendor_id);
		    this.viewModel.productSelectedValue = ko.observable(this.clientToolItem.vendor_product_id);
		    this.viewModel.productTypeSelectedValue = ko.observable(this.clientToolItem.tool_type);
		    this.viewModel.deployedSelectedValue = ko.observable(this.clientToolItem.deployed_percentage);
		    this.viewModel.utilizationSelectedValue = ko.observable(this.clientToolItem.utilization_percentage);
		    
		    // build/filter product option list based on the selected vendor
		    this.viewModel.productOptions = ko.computed( function() {
		    	var vendorArray = self.clientToolItem.vendorOptions;
			    var selectedVendor = self.viewModel.vendorSelectedValue();
		    	for (var i=0; i < vendorArray.length; i++) {
		    		if (vendorArray[i].vendor_id == selectedVendor) {
		    			return vendorArray[i].products;
		    		}		    		
		    	}
		    	return null;
		    });
		    
		    // display tool type based on the selected product
		    this.viewModel.selectedToolType = ko.computed( function() {
		    	var productArray = self.viewModel.productOptions();
		    	var selectedProduct = self.viewModel.productSelectedValue();
		    	if (productArray) {
			    	for (var i=0; i < productArray.length; i++ ) {
			    		if (productArray[i].vendor_product_id == selectedProduct) {
			    			return productArray[i].tool_type;
			    		}
			    	}
		    	}
		    	return "";
		    });
		    
		    // Whenever the category changes, reset the product selection
		    this.viewModel.vendorSelectedValue.subscribe( function() {
		        self.viewModel.productSelectedValue(undefined);
		    });
		    
	    	$("#subTabPage").load('templates/tools/client_tool_details.html', function() {
	    		ko.applyBindings(self.viewModel, $("#client-tool-details").get(0));
	    	});
	    },
	    
	    events: {
	    	"click .update": "updateClientTool",
	    	"click .cancel": "exitOut"
	    },
	    
	    validateFields: function() {
	    	
	    	// reset errorMsg
	    	Session.set("errorMsg", "");
	    	
	    	if (utils.empty($('#vendor_name'))) {
	    		Session.set("errorMsg", "Vendor Name is required, please enter vendor name");
	    		return false;
	    	};

	    	return true;
	    },
	
		updateClientTool: function() {
		    
	    	console.log("saving client tool id: "+ this.client_tool_id);

	    	// validate input fields
	    	if (!this.validateFields()) {
	    		console.log("failed validation");
	    		this.refresh();
	    		return false;
	    	}

	    	var self = this;
	    	
	    	// save client tool
	    	this.clientToolModel.save({
	    		id: this.client_tool_id ? this.client_tool_id : null, 
	    		client_tool_id: this.client_tool_id,
	    		client_id: Session.get("Client:client_id"),
	    		vendor_product_id: $('#vendor_product_id').val(),
	            version_number: $('#version_number').val(),
	            purchase_date: $('#purchase_date').val(),
	            purchase_cost: $('#purchase_cost').val().replace(/[$,]+/g,''),
	            depreciation_cost: $('#depreciation_cost').val().replace(/[$,]+/g,''),
	            annual_maint_cost: $('#annual_maint_cost').val().replace(/[$,]+/g, ''),
	            maint_expiration_date: $('#maint_expiration_date').val(),
	            license_purchased: $('#license_purchased').val(),
	            license_used: $('#license_used').val(),
	            deployed_percentage: $('#deployed_percentage').val(),
	            utilization_percentage: $('#utilization_percentage').val()
	        },{
	        	success: function(model, response) {
	        		console.log(self.clientToolModel);
	        		console.log("client tool saved successfully!");
	        	},
	        	error: function(model, response) {
	        		console.log(self.clientToolModel);
	        		console.log("error saving client tool changes!" + response.responseText);
	        		Session.set("errorMsg", response.responseText);
	        		return false;
	        	}
	        });
	    	
	    	this.exitOut();
	    },
	      
	    exitOut: function() {
	    	this.undelegateEvents();
	    	window.history.back();
	    	return false;
	    },
	      
	});

	return ClientToolDetailsView;
  
});
