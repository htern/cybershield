define([
	'backbone'
],

function(Backbone) {

	var EmployeeModel = Backbone.Model.extend({
		initialize: function(options) {
			if (options) {
				this.employee_id = options.employee_id;
			}
		},
	    defaults: {
	    	"employee_id": null,
	    	"client_id": null,
	    	"employee_name": "",
	    	"employee_type": "Full Time",
	    	"job_title": "",
	    	"last_promotion_date": null,
	    	"report_to": "",
	    	"department": "",
	    	"fully_burdened_rate": 0,
	    	"company_start_date": null,
	    	"security_start_date": null,
	    	"education_level": "Bachelor",
	    	"certification": "",
	    	"phone_number": "",
	    	"email_address": "",
	    	"total_years_expr": 0,
	    	"security_expr": 0,
	    	"security_ops_percentage": 1
	    },
		urlRoot: 'api/employees',
		url: function() {
			return this.urlRoot + (this.employee_id ? '/'+this.employee_id : '/new');
		}
	});

	return EmployeeModel;
	
});