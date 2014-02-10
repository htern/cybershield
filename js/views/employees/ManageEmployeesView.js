define([
  'jquery',
  'underscore',
  'backbone',
  'models/EmployeeModel',
  'knockout',
  'knockback'],

function($, _, Backbone, EmployeeModel, ko, kb) {

	var EmployeeCollection = Backbone.Collection.extend({
		initialize: function(client_id) {
			if (client_id) {
				this.client_id = client_id;
			}
		},
		model: EmployeeModel,
		url: function() {
			return 'api/employees/all' + (this.client_id ? '/'+this.client_id : '');
		}
	});
  
  var ManageEmployeesView = Backbone.View.extend({
	  el: $("#subTabPage"),
	  viewModel: null,

	  initialize: function(client_id) {
		  console.log("Initializing ManageEmployeesView");
		  this.client_id = client_id;
		  // load template
		  $("#subTabPage").load('templates/employees/employee_list.html');
	  },

//    initialize: function(client_id) {
//    	console.log("Initializing ManageEmployeesView");
//    	
//    	this.client_id = client_id;
//    	console.log("client_id: "+this.client_id);
//    	
//	    var self = this;
//
//	    var model = new Backbone.Model({
//    		employees: new EmployeeCollection(),
//    	});
//    	
//  	    this.viewModel = kb.viewModel(model);
//  	    
//        console.log("binding ManageEmployee");
//    	$("#subTabPage").load('templates/employees/employee_list.html', function() {
//    		ko.applyBindings(self.viewModel, $("#employee-list").get(0));
//    	});
//    },
    
    refresh: function() {
    	console.log("ManageEmployeesView.refresh is called.");
    	var self = this;
    	console.log("client_id: "+this.client_id);
	    var employeeList = new EmployeeCollection(this.client_id);
	    employeeList.fetch({
	      success: function (data) {
	    	  console.log("loading employeelist");
	    	  self.show(data);
	      },
	      error: function(data) {
	    	  console.log("error retrieving employeelist");
	      }
	    });
    },
	  
    show: function(employeeList) {
    	
    	var model = new Backbone.Model({
    		employees: employeeList,
    		client_id: this.client_id,
		  	client_name: Session.get("Client:client_name"),
    	});
    	
    	console.log(model);
  	    this.viewModel = kb.viewModel(model);
  	    console.log(this.viewModel);
  	    
  	    this.viewModel.deleteEmployee = function (data, event) {
  	    	console.log("Deleting employee: "+data.employee_name());
//  	    $row = $(event.target).closest("tr");
//          var username = $($row).attr("id");

	    	// delete employee
  	    	var employee = new EmployeeModel({employee_id: data.employee_id()});
  	    	employee.id = data.employee_id();
  	    	employee.destroy({
	  	        success: function(model, response){
	  	          console.log("Success deleted employee");
	  	        },
	  	        error: function(model, response){
	  	          console.log("Error deleting employee");
	  	        }
  	    	});  	    	
            // delete user - from the viewModel
	    	data.model().destroy();
        };
        
  	    ko.applyBindings(this.viewModel, $("#employee-list").get(0));
  	    
  	},

//    events: {
//    	"click a.delete-employee": "deleteEmployee"
//    }, 
//    
//    deleteEmployee: function() {
//    	console.log("deleteEmployee is clicked");
//    }
    
  	});

  	return ManageEmployeesView;
  
});
