define([
  'backbone',
  'models/ClientAssessmentModel',
  'knockout',
  'knockback'
], 

function(Backbone, ClientAssessmentModel, ko, kb) {

  var CreateNewAssessmentrView = Backbone.View.extend({
    el: $("#subTabPage"),
    viewModel: null,
    
    initialize: function() {
    	console.log("CreateNewAssessmentView is initialized.");
    	
    	//reset ErrorMsg
    	Session.set("errorMsg","");
    	
    	var self = this;
    	var model = new Backbone.Model({
        	failedValidation: false,
        	errorMsg: ""
    	});
    	
    	this.viewModel = kb.viewModel(model);
    	
    	$("#subTabPage").load('templates/assessments/new_client_assessment.html', function() {
    		ko.applyBindings(self.viewModel, $("#new-assessment").get(0));
    	});
    },
    
    refresh: function() {
    	var model = new Backbone.Model({
        	failedValidation: Session.get("errorMsg") ? true : false,
        	errorMsg: Session.get("errorMsg") ? Session.get("errorMsg") : ""
    	});
        this.viewModel.model(model);
    },
    	
    events: {
    	"click .create": "createAssessment",
    	"click .cancel": "exitOut"
    },
    
    validateFields: function() {
    	if ($('#client_name').val()==="null") {
    		Session.set("errorMsg", "Client Name is required, please select a client.");
    		return false;
    	};
    	
    	if ($('#security_standard').val()==="null") {
    		Session.set("errorMsg", "Security Framework is required, please select a Security Framework.");
    		return false;
    	};

    	if (utils.empty($('#assessment_date'))) {
    		Session.set("errorMsg", "Assessment Date is required, please enter Assessment Start Date.");
    		return false;
    	};
    	
    	if (!utils.validateDate($('#assessment_date').val())) {
    		Session.set("errorMsg", "Assessment Date is invalid, " +
    				"please enter a valid Assessment Start Date with format: yyyy-mm-dd.");
    		return false;
    	};
    	
    	if (utils.empty($('#assessor'))) {
    		Session.set("errorMsg", "Assessor Name is required, please enter Assessor name.");
    		return false;
    	};
    	
    	// reset errorMsg
    	Session.set("errorMsg", "");
    	return true;
    },

    createAssessment: function() {
    	
    	console.log("Create Assessment clicked.");
    	
    	// validate input fields
    	if (!this.validateFields()) {
    		this.refresh();
    		return false;
    	}

    	// save user
    	var assessment = new ClientAssessmentModel();
        assessment.save({
        	client_id: $('#client_name').val(),
        	standard_id: $('#security_standard').val(),
            assessment_date: $('#assessment_date').val(),
            assessed_by: $('#assessor').val(),
            contact_name: $('#client_contact').val(),
            status: "In Progress"
        },{
        	success: function(model, response) {
        		console.log("assessment for "+$('#client_name').val()+" created successfully!");
                window.history.back();
                return false;
        	},
        	error: function(model, response) {
        		console.log("error creating user!" + response.responseText);
        		Session.set("errorMsg", response.responseText);
        		return false;
        	}
        });
      },

      exitOut: function() {
        window.history.back();
        return false;
      }

  });

  return CreateNewAssessmentrView;
  
});
