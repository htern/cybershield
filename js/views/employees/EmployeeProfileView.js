define([
	'jquery',
	'underscore',
	'backbone',
	'models/EmployeeModel',
	'knockout',
	'knockback'
], 

function($, _, Backbone, EmployeeModel, ko, kb) {

	var EmployeeProfileView = Backbone.View.extend({
		
		el: $("#subTabPage"),
		viewModel: null,
		employeeModel: null,
		employeeItem: null,
    
		initialize: function(employee_id) {
			console.log("EmployeeProfileView is initializing for: "+ employee_id);
    	
	    	// reset errorMsg
	    	Session.set("errorMsg", "");
	    	
			this.employee_id = employee_id;
			this.getEmployee(employee_id);
		},

	    getEmployee: function(employee_id) {
	    	console.log("Retrieving Employee data...");
	    	
		    var self = this;
		    
		    this.employeeModel = new EmployeeModel({employee_id: employee_id});
	    	console.log('created new employeeModel');
	    	console.log(this.employeeModel);
	    	
		    this.employeeModel.fetch({
		    	success: function (data) {
		    		console.log("fetching employee");
		    		self.show(data);
		    	},
		    	error: function(data) {
		    		console.log("error retrieving employee");
		    	}
		    });
	    },
	    
	    refresh: function() {
	    	console.log("EmployeeProfileView.refresh is called.");
	    	
	    	console.log(this.employeeItem);
	    	
	    	if (this.employeeItem) {
		    	this.employeeItem.failedValidation = Session.get("errorMsg") ? true : false;
		    	this.employeeItem.errorMsg = Session.get("errorMsg") ? Session.get("errorMsg") : "";
		    	this.employeeItem.admin= Session.get("admin") ? Session.get("admin") : false;
	    	}
	    	
//	    	var model = new Backbone.Model({
//		    	failedValidation: Session.get("errorMsg") ? true : false,
//		    	errorMsg: Session.get("errorMsg") ? Session.get("errorMsg") : "",
//		    	admin: Session.get("admin") ? Session.get("admin") : false
//	    	});
//	    	
//	        this.viewModel.model(model);
	    },
	    
	    refresh2: function() {
	    	console.log("refresh Employee profile is called.");
	    	
		    var self = this;
		    if (this.employeeModel) {
		    	console.log('employeeModel already exist');
		    	console.log(this.employeeModel);
		    	this.show(this.employeeModel);
//		    	this.employeeModel.set({employee_id: this.employee_id});
		    }
		    else {
			    this.employeeModel = new EmployeeModel({employee_id: this.employee_id});
		    	console.log('created new employeeModel');
		    	console.log(this.employeeModel);
		    	
			    this.employeeModel.fetch({
			    	success: function (data) {
			    		console.log("fetching employee");
			    		self.show(data);
			    	},
			    	error: function(data) {
			    		console.log("error retrieving employee");
			    	}
			    });
		    }
	    },
	    
	    show: function(data) {
	    	
	    	this.employeeItem = data.attributes;
	    	this.employeeItem.failedValidation = Session.get("errorMsg") ? true : false;
	    	this.employeeItem.errorMsg = Session.get("errorMsg") ? Session.get("errorMsg") : "";
	    	this.employeeItem.admin= Session.get("admin") ? Session.get("admin") : false;
		  	this.employeeItem.client_name = Session.get("Client:client_name");
		  	this.employeeItem.fully_burdened_rate = "$" + parseFloat(this.employeeItem.fully_burdened_rate).toLocaleString();
		  	this.employeeItem.employeeTypeOptions = ["Full Time","Part Time", "Contractor"];
		  	this.employeeItem.educationLevelOptions = ["High School", "Bachelor", "Master", "Doctorate"];
		  	
	    	this.employeeItem.securityOpsPercentage = 
	    		[ {"val":0, "percent":"0 %"}, 
	    		  {"val":0.05, "percent":"5 %"}, {"val":0.1, "percent":"10 %"}, {"val":0.15, "percent":"15 %"}, {"val":0.2, "percent":"20 %"},
	    		  {"val":0.25, "percent":"25 %"}, {"val":0.3, "percent":"30 %"}, {"val":0.35, "percent":"35 %"}, {"val":0.4, "percent":"40 %"},
	    		  {"val":0.45, "percent":"45 %"}, {"val":0.5, "percent":"50 %"}, {"val":0.55, "percent":"55 %"}, {"val":0.6, "percent":"60 %"},
	    		  {"val":0.65, "percent":"65 %"}, {"val":0.7, "percent":"70 %"}, {"val":0.75, "percent":"75 %"}, {"val":0.8, "percent":"80 %"},
	    		  {"val":0.85, "percent":"85 %"}, {"val":0.9, "percent":"90 %"}, {"val":0.95, "percent":"95 %"}, {"val":1, "percent":"100 %"} ];
	    	this.employeeItem.otherOpsPercentage = 
	    		[ {"val":0, "percent":"0 %"}, 
	    		  {"val":0.05, "percent":"5 %"}, {"val":0.1, "percent":"10 %"}, {"val":0.15, "percent":"15 %"}, {"val":0.2, "percent":"20 %"},
	    		  {"val":0.25, "percent":"25 %"}, {"val":0.3, "percent":"30 %"}, {"val":0.35, "percent":"35 %"}, {"val":0.4, "percent":"40 %"},
	    		  {"val":0.45, "percent":"45 %"}, {"val":0.5, "percent":"50 %"}, {"val":0.55, "percent":"55 %"}, {"val":0.6, "percent":"60 %"},
	    		  {"val":0.65, "percent":"65 %"}, {"val":0.7, "percent":"70 %"}, {"val":0.75, "percent":"75 %"}, {"val":0.8, "percent":"80 %"},
	    		  {"val":0.85, "percent":"85 %"}, {"val":0.9, "percent":"90 %"}, {"val":0.95, "percent":"95 %"}, {"val":1, "percent":"100 %"} ];
	
	    	console.log(this.employeeItem);
	    	
		    var model = new Backbone.Model(this.employeeItem);
		    var self = this;
	    	
		    this.viewModel = kb.viewModel(model);
		    console.log(this.viewModel);
	
		    this.viewModel.employeeTypeSelectedValue = ko.observable(this.employeeItem.employee_type);
		    this.viewModel.educationLevelSelectedValue = ko.observable(this.employeeItem.education_level);
		    
		    this.viewModel.securityOpsSelectedValue = ko.observable(this.employeeItem.security_ops_percentage);
		    // set otherOps observable
		    this.viewModel.otherOpsSelectedValue = ko.computed({
		    	read: function() {
		    		return (1-parseFloat(self.viewModel.securityOpsSelectedValue())).toFixed(2);
		    	},
		    	write: function(val) {
		    		self.viewModel.securityOpsSelectedValue((1-parseFloat(val)).toFixed(2));
		    	}
		    });
//		    this.viewModel.failedValidation = ko.observable(this.employeeItem.failedValidation);
//		    this.viewModel.errorMsg = ko.observable(this.employeeItem.errorMsg);
	
		    console.log(this.viewModel);
		    
	    	$("#subTabPage").load('templates/employees/employee_profile.html', function() {
	    		ko.applyBindings(self.viewModel, $("#employee-profile").get(0));
	    	});
	
	    },
	    
	    events: {
	    	"click .update": "updateEmployee",
	    	"click .cancel": "exitOut"
	    },
	    
	    validateFields: function() {
	    	// reset errorMsg
	    	Session.set("errorMsg", "");
	    	
	    	if (utils.empty($('#employee_name'))) {
	    		Session.set("errorMsg", "Employee Name is required, please enter employee name");
	    		return false;
	    	};

	    	return true;
	    },
	
		updateEmployee: function() {
		    
	    	console.log("saving employee id: "+ this.employee_id);

	    	// validate input fields
	    	if (!this.validateFields()) {
	    		console.log("failed validation");
	    		this.refresh();
	    		return false;
	    	}

	    	var self = this;
	    	
	    	// save employee
	    	this.employeeModel.save({
	    		id: this.employee_id ? this.employee_id : null, 
//	    		id: this.employee_id,
	    		employee_id: this.employee_id,
	            employee_name: $('#employee_name').val(),
	    		client_id: Session.get("Client:client_id"),
	            employee_type: $('#employee_type').val(),
	            job_title: $('#job_title').val(),
	            last_promotion_date: $('#promotion_date').val(),
	            report_to: $('#report_to').val(),
	            department: $('#department').val(),
	            fully_burdened_rate: $('#fully_burdened_rate').val().replace(/[$,]+/g,''),
	            security_ops_percentage: $('#security_ops_percentage').val(),
	            phone_number: $('#phone_number').val(),
	            email_address: $('#email_address').val(),
	            education_level: $('#education_level').val(),
	            certification: $('#certification').val(),
	            company_start_date: $('#company_start_date').val(),
	            security_start_date: $('#security_start_date').val(),
	            total_years_expr: $('#total_years_expr').val(),
	            security_expr: $('#security_expr').val()
	        },{
	        	success: function(model, response) {
	        		console.log(self.employeeModel);
	        		console.log("employee saved successfully!");
	        	},
	        	error: function(model, response) {
	        		console.log(self.employeeModel);
	        		console.log("error saving employee changes!" + response.responseText);
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

	return EmployeeProfileView;
  
});
