define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/security_controls/control_question-list.html',
	'models/ControlCategoryModel',
	'models/AssessmentQuestionModel',
	'models/FollowUpFlagModel',
	'views/questions/FollowUpDialog',
	'knockout',
	'knockback'
], 

function($, _, Backbone, controlQuestionsTemplate, ControlCategoryModel, AssessmentQuestionModel, 
		FollowUpFlagModel, FollowUpDialog, ko, kb) {

	var AssessmentQuestionCollection = Backbone.Collection.extend({
		initialize: function(assess_id, category_id) {
			console.log("AssessmentQuestionCollection INIT options: ");
			console.log("assess id: " + assess_id);
			this.assess_id = assess_id;
			this.category_id = category_id;
		},
		model: AssessmentQuestionModel,
		url: function() {
			return 'api/assessmentQuestions/' + this.assess_id + '/' + this.category_id;
		}
	});

	var AssessmentQuestionsView = Backbone.View.extend({
		el: $("#subTabPage"),
		viewModel: null,
		assess_id: null,
		category_id: null,
		category_stats: null,

		initialize: function(options) {
			console.log("Initializing AssessmentQuestionsView");
			this.assess_id = Session.get("Assessment:assess_id");
			this.category_id = options.category_id;
		},
		
		getCategoryStats: function() {
	    	console.log("Retrieving Control Category Stats...");

	    	var self = this;
			
		    this.controlCategoryModel = new ControlCategoryModel({assessment_id: this.assess_id, category_id: this.category_id});
	    	
		    this.controlCategoryModel.fetch({
		    	success: function (data) {
		    		console.log("successfully fetching control category stats for: "+self.category_id);
		    		self.category_stats = data.attributes[0];
			    	Session.set("Category:control_category_id", self.category_stats.control_category_id);
			    	Session.set("Category:control_function_name", self.category_stats.control_function_name);
			    	Session.set("Category:identifier", self.category_stats.identifier);
			    	Session.set("Category:control_category_name", self.category_stats.control_category_name);
			    	Session.set("Category:controlCnt", self.category_stats.controlCnt);
			    	Session.set("Category:complete_percentage", self.category_stats.complete_percentage);
			    	Session.set("Category:avg_score", self.category_stats.avg_score);
			    	Session.set("Category:urlLink", self.category_stats.urlLink);
		    		self.refresh();
		    	},
		    	error: function(data) {
		    		console.log("error retrieving control category stats");
		    	}
		    });
		},

	    refresh: function() {
		    var self = this;
		    var questionCollection = new AssessmentQuestionCollection(this.assess_id, this.category_id);

		    questionCollection.fetch({
		      success: function (data) {
		    	  console.log("loading questionlist");
		    	  self.show(data);
		      },
		      error: function(data) {
		    	  console.log("error retrieving questionlist");
		      }

		    });
	    },
	    
	    show: function(questionList) {
	    	
//	    	console.log(questionList);
	    	var self = this;
	    	
		    var model = new Backbone.Model({
		    	questions: questionList,
		    	assess_id: Session.get("Assessment:assess_id"),
			  	client_name: Session.get("Assessment:client_name"),
			  	standard_type: Session.get("Assessment:standard_type"),
			  	start_date: Session.get("Assessment:start_date"),
				contact_name: Session.get("Assessment:contact_name"),
				assessed_by: Session.get("Assessment:assessed_by"),
				status: Session.get("Assessment:status"),
				total_controls: Session.get("Category:controlCnt"),
				avg_score: Session.get("Category:avg_score"),
				complete_percentage: Session.get("Category:complete_percentage"),
				control_function_name: Session.get("Category:control_function_name"),
				control_category_name: Session.get("Category:control_category_name"),
				category_identifier: Session.get("Category:identifier"),
				last_url: Session.get("Assessment:urlLink")
		    });
		    
		    Session.set("questionList",questionList);

		    this.viewModel = kb.viewModel(model);

		    $("#subTabPage").load('templates/assessments/assessment_question_list.html', function() {
	  	    	ko.applyBindings(self.viewModel, $("#question-list").get(0));
	  	    });

	    },
	    
	    events: {
	    	"click #follow-up-flag-icon": "showFollowUpDialog"
	    },

	    showFollowUpDialog: function() {
	    	console.log("Follow-up flag clicked!");
	    	
	    	var $row = $(event.target).closest("tr");
	    	var question_id = $($row).attr("assess_question_id").trim();
	    	var follow_up_with = $($row).attr("follow_up_with");
	    	var control_number = $($row).attr("control_number");

			var followUpModel = new FollowUpFlagModel({
										question_id: question_id, 
										follow_up_with: follow_up_with,
										control_number: control_number});

    		this.followUpView = new FollowUpDialog( {model: followUpModel, question_id: question_id} );

	    	this.followUpView.show(this);
	    	$('#follow-up-dialog').modal('show');
	    	return false;
	    },
	    
	    render: function(options){
      
			var self = this;

			if (options.id) {
		        var controlquestions = new ControlQuestionCollection({id: options.id});
		        controlquestions.fetch({
		          success: function (controlquestions) {
		            var template = _.template(controlQuestionsTemplate, {controlquestions: controlquestions.models});
		            self.$el.html(template);
		          }
		        })
			}

			$('.controls-nav li').removeClass('active');
			$('.controls-nav li a[href="'+window.location.hash+'"]').parent().addClass('active');
	    }
 	});

	return AssessmentQuestionsView;
  
});
