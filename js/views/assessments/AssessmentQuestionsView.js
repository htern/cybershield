define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/security_controls/control_question-list.html',
	'models/AssessmentQuestionModel',
	'knockout',
	'knockback'
], 

function($, _, Backbone, controlQuestionsTemplate, AssessmentQuestionModel, ko, kb) {

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

		initialize: function(options) {
			console.log("Initializing AssessmentQuestionsView");
			this.assess_id = Session.get("Assessment:assess_id");
			this.category_id = options.category_id;

	  	    // load template
	  	    $("#subTabPage").load('templates/assessments/assessment_question_list.html');
		},

	    refresh: function() {
		    var self = this;
		    var questionList = new AssessmentQuestionCollection(this.assess_id, this.category_id);
//		    console.log(questionList);
		    questionList.fetch({
		      success: function (data) {
		    	  console.log("loading questionlist");
//		    	  console.log(data);
		    	  self.show(data);
		      },
		      error: function(data) {
		    	  console.log("error retrieving questionlist");
		      }

		    });
	    },
	    
	    show: function(questionList) {
	    	
//	    	console.log(questionList);
	    	
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
				last_url: Session.get("Assessment:urlLink")
		    });

		    this.viewModel = kb.viewModel(model);
			ko.applyBindings(this.viewModel, $("#question-list").get(0));
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
