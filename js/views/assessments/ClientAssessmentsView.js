define([
	'jquery',
	'underscore',
	'backbone',
	'models/ClientAssessmentModel',
	'knockout',
	'knockback'
], 

function($, _, Backbone, ClientAssessmentModel, ko, kb) {

	var ClientAssessmentCollection = Backbone.Collection.extend({
		initialize: function(client_id) {
			console.log("ClientAssessmentCollection INIT options: ");
			if (client_id > 0) {
				this.client_id = client_id;
			}
		},
		model: ClientAssessmentModel,
		url: function() {
			return 'api/assessments' + (this.client_id ? '/'+this.client_id : '');
		}
	});
	  
	var ClientAssessmentsView = Backbone.View.extend({
		el: $("#subTabPage"),
		viewModel: null,
//		client_assess_id: null,

		initialize: function() {
			console.log("Initializing ClientAssessmentsView");
	  	    // load template
	  	    $("#subTabPage").load('templates/assessments/client_assessment_list.html');
		},

	    refresh: function() {
		    var self = this;
		    var assessmentList = null;
	        if (Session.get("client_id")) {		// user with client_id
	        	assessmentList = new ClientAssessmentCollection(Session.get("client_id"));
	        } else {	// admin
	        	assessmentList = new ClientAssessmentCollection();
	        } 
		    assessmentList.fetch({
		      success: function (data) {
		    	  console.log("loading assessmentlist");
		    	  self.show(data);
		      },
		      error: function(data) {
		    	  console.log("error retrieving assessmentlist");
		      }

		    });
	    },
	    
	    show: function(assessmentList) {
	    	console.log(assessmentList);
		    var model = new Backbone.Model({
			  assessments: assessmentList,
		    });
		    console.log(model);
		    this.viewModel = kb.viewModel(model);
			ko.applyBindings(this.viewModel, $("#assessment-list").get(0));
		    console.log(this.viewModel);

	    },
	    
	    events: {
	    	"click a.assess_row": "assessmentSelected"
	    }, 
	    
	    assessmentSelected: function(event) {
	    	console.log("assessment row is clicked");
	    	
	    	var $row = $(event.target).closest("tr");
	    	
	    	console.log($($row));
	    	
//	    	Session.set("Assessment:assess_id",this.getKeyValue($($row),"assess_id"));
	    	Session.set("Assessment:assess_id",$($row).attr("assess_id").trim());
	    	Session.set("Assessment:client_id", $($row).attr("client_id").trim());
	    	Session.set("Assessment:client_name", $($row).attr("client_name").trim());
	    	Session.set("Assessment:standard_type", $($row).attr("standard_type").trim());
	    	Session.set("Assessment:start_date",$($row).attr("start_date").trim());
	    	Session.set("Assessment:contact_name",$($row).attr("contact_name").trim());
	    	Session.set("Assessment:assessed_by",$($row).attr("assessed_by").trim());
	    	Session.set("Assessment:status",$($row).attr("status").trim());
	    	Session.set("Assessment:total_controls",$($row).attr("total_controls").trim());
	    	Session.set("Assessment:avg_score",$($row).attr("avg_score").trim());
	    	Session.set("Assessment:complete_percentage",$($row).attr("complete_percentage").trim());
	    	Session.set("Assessment:urlLink",$($row).attr("urlLink").trim());
	    },
	    
	    getKeyValue: function(row,key) {
	    	var value = row.attr(key); 
			console.log(value);
	    	return value.trim();
	    }

	});

	return ClientAssessmentsView;
  
});
