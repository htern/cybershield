define([
	'jquery',
	'underscore',
	'backbone',
	'models/AssessmentQuestionModel',
	'models/EmployeeCollection',
	'models/EmployeeUtilizationModel',
	'models/EmployeeUtilizationCollection',
	'models/ClientToolCollection',
	'models/InterviewNotesModel',
	'models/InterviewNotesCollection',
	'models/ToolUtilizationModel',
	'models/ToolUtilizationCollection',
	'views/questions/InterviewNotesDialog',
	'views/questions/InterviewNotesList',
	'views/questions/EmployeeResponsibleDialog',
	'views/questions/EmployeeResponsibleList',
	'views/questions/ToolResponsibleDialog',
	'views/questions/ToolResponsibleList',
	'knockout',
	'knockback'
], 

function($, _, Backbone, AssessmentQuestionModel, EmployeeCollection, 
		EmployeeUtilizationModel, EmployeeUtilizationCollection,
		ClientToolCollection, InterviewNotesModel, InterviewNotesCollection, 
		ToolUtilizationModel, ToolUtilizationCollection,
		InterviewNotesDialog, InterviewNotesList, 
		EmployeeResponsibleDialog, EmployeeResponsibleList, 
		ToolResponsibleDialog, ToolResponsibleList, ko, kb){

//	var InterviewNotes = Backbone.Model.extend({
//		initialize: function(options) {
//			if (options) {
//				this.question = options.question;
//			}
//		},
//		defaults: {
//			id: null,
//			assess_question_id: null,
//			note_created_by: "",
//			note_entry_date: "",
//			notes: ""
//		},
//		urlRoot: 'api/assessments/notes',
//	});
	
	var AssessmentQuestionDetailsView = Backbone.View.extend({

		el: $("#subTabPage"),
		viewModel: null,
		question_id: null,
		questionItem: null,
		question: null,
		
		initialized: function(question_id) {
	    	this.question_id = question_id;
	    	console.log("initialize question details: "+this.question_id);
			if (this.question)
		    	this.question.set({question_id: this.question_id});
			else
				this.question = new AssessmentQuestionModel({question_id: this.question_id});
		},

	    refresh: function(question_id) {
	    	console.log("AssessmentQuestionView.refresh is called.");
	    	this.question_id = question_id;
	    	
		    var self = this;
		    if (this.question) {
		    	console.log('reuse this.question');
		    	this.question.set({question_id: this.question_id});
		    }
		    else {
		    	console.log('create new this.question');
			    this.question = new AssessmentQuestionModel({question_id: this.question_id});
		    }
		    
		    this.question.fetch({
		    	success: function (data) {
		    		console.log("fetching question");
		    		self.show(data);
		    	},
		    	error: function(data) {
		    		console.log("error retrieving question");
		    	}
		    });
	    },

	    show: function(data) {
	    	
//	    	console.log(data);
	    	
	    	this.questionItem = data.attributes;
		  	this.questionItem.client_name = Session.get("Assessment:client_name");
		  	this.questionItem.standard_framework = Session.get("Assessment:standard_type");
	    	this.questionItem.complete = this.questionItem.complete==0 ? false : true;
	    	this.questionItem.DFARS = this.questionItem.DFARS==0 ? false : true;

	    	this.questionItem.manualProcessCoverage = 
	    		[ {"val":0, "coverage":"0 %"}, 
	    		  {"val":0.1, "coverage":"10 %"}, {"val":0.2, "coverage":"20 %"},
	    		  {"val":0.3, "coverage":"30 %"}, {"val":0.4, "coverage":"40 %"},
	    		  {"val":0.5, "coverage":"50 %"}, {"val":0.6, "coverage":"60 %"},
	    		  {"val":0.7, "coverage":"70 %"}, {"val":0.8, "coverage":"80 %"},
	    		  {"val":0.9, "coverage":"90 %"}, {"val":1, "coverage":"100 %"} ];
	    	this.questionItem.manualComplianceRating = [{"val":0,"optionName":"No"},{"val":1.5,"optionName":"Partially"},{"val":3,"optionName":"Yes"}];
	    	this.questionItem.manualDocumentationRating = [{"val":0,"optionName":"No"},{"val":1,"optionName":"Partially"},{"val":2,"optionName":"Yes"}];
	    	this.questionItem.autoProcessCoverage = 
	    		[ {"val":0, "coverage":"0 %"}, 
	    		  {"val":0.1, "coverage":"10 %"}, {"val":0.2, "coverage":"20 %"},
	    		  {"val":0.3, "coverage":"30 %"}, {"val":0.4, "coverage":"40 %"},
	    		  {"val":0.5, "coverage":"50 %"}, {"val":0.6, "coverage":"60 %"},
	    		  {"val":0.7, "coverage":"70 %"}, {"val":0.8, "coverage":"80 %"},
	    		  {"val":0.9, "coverage":"90 %"}, {"val":1, "coverage":"100 %"} ];
	    	this.questionItem.autoComplianceRating = [{"val":0,"optionName":"No"},{"val":1.5,"optionName":"Partially"},{"val":3,"optionName":"Yes"}];
	    	this.questionItem.autoDocumentationRating = [{"val":0,"optionName":"No"},{"val":1,"optionName":"Partially"},{"val":2,"optionName":"Yes"}];

//	    	console.log(this.questionItem);
	    	
	    	var model = new Backbone.Model(this.questionItem);
	    	
		    this.viewModel = kb.viewModel(model);
		    
		    // observe status
		    this.viewModel.complete = ko.observable(this.questionItem.complete);
		    this.viewModel.statusText = ko.observable(this.questionItem.status);
		    this.viewModel.dfars = ko.observable(this.questionItem.DFARS);
		    
		    // set manual process observable
		    this.viewModel.selectedManualProcessCoverageValue = ko.observable(this.questionItem.manual_coverage);	// default to manual process to 100%
		    this.viewModel.selectedManualComplianceValue = ko.observable(this.questionItem.manual_compliance);
		    this.viewModel.selectedManualDocumentationValue = ko.observable(this.questionItem.manual_documentation);
		    this.viewModel.manualComplianceScore = ko.computed(function() {
	    		return (( this.viewModel.selectedManualComplianceValue() + this.viewModel.selectedManualDocumentationValue() ) * this.viewModel.selectedManualProcessCoverageValue()).toFixed(2); 
	    	}, this);
		    
		    var self = this;
		    
		    // set auto process observable
		    this.viewModel.selectedAutoProcessCoverageValue = ko.computed({
		    	read: function() {
		    		return (1-parseFloat(self.viewModel.selectedManualProcessCoverageValue())).toFixed(2);
		    	},
		    	write: function(val) {
		    		self.viewModel.selectedManualProcessCoverageValue((1-parseFloat(val)).toFixed(2));
		    	}
		    });
		    this.viewModel.selectedAutoComplianceValue = ko.observable(this.questionItem.auto_compliance);
		    this.viewModel.selectedAutoDocumentationValue = ko.observable(this.questionItem.auto_documentation);
		    this.viewModel.autoComplianceScore = ko.computed(function() {
	    		return (( this.viewModel.selectedAutoComplianceValue() + this.viewModel.selectedAutoDocumentationValue() ) * this.viewModel.selectedAutoProcessCoverageValue()).toFixed(2); 
	    	}, this);
		    
		    // set final score
		    this.viewModel.finalComplianceScore = ko.computed(function() {
		    	return (parseFloat(this.viewModel.manualComplianceScore()) + parseFloat(this.viewModel.autoComplianceScore())).toFixed(2);
		    }, this);
		    
		    // set last url
			this.viewModel.last_url = Session.get("Category:urlLink");
			
//			console.log("last_url: " + this.viewModel.last_url);


		    $("#subTabPage").load('templates/assessments/assessment_question_details.html', function() {
	    		ko.applyBindings(self.viewModel, $("#question-detail").get(0));
	    	});

		    // load employee responsible
		    this.loadEmployeeUtilization();
		    
		    // load security tool
		    this.loadToolUtilization();
		    
		    // load interview notes
		    this.loadInterviewNotes();
	    },

	    loadToolUtilization: function() {
	    	console.log("load Security Tools Responsible");
	    	
	    	this.$("#securityToolResponsible").empty();
	    	
	    	var self = this;
	    	toolList = new ToolUtilizationCollection(this.question_id);
		    toolList.fetch({
		    	success: function (data) {
		    		console.log("loading security tools responsible for: "+self.question_id);
//		    		console.log(data);
		    		self.showSecurityToolResponsible(data);
		    	},
		    	error: function(data) {
		    		console.log("error retrieving security tools responsible");
		    	}
		    });
	    },
	    
	    showSecurityToolResponsible: function(toolList) {
	    	console.log("rendering tool utilization collections");
			toolResponsibleListView = new ToolResponsibleList({
				collection: toolList,
				el: $("#securityToolResponsible"),
			});
			toolResponsibleListView.render();
	    },

	    loadEmployeeUtilization: function() {
	    	console.log("load Employee Responsible");
	    	
	    	this.$("#employeeResponsible").empty();
	    	
	    	var self = this;
	    	employeeList = new EmployeeUtilizationCollection(this.question_id);
		    employeeList.fetch({
		    	success: function (data) {
		    		console.log("loading employee responsible for: "+self.question_id);
//		    		console.log(data);
		    		self.showEmployeeResponsible(data);
		    	},
		    	error: function(data) {
		    		console.log("error retrieving employee responsible");
		    	}
		    });
	    },
	    
	    showEmployeeResponsible: function(employeeList) {
	    	console.log("rendering employee utilization collections");
			employeeResponsibleListView = new EmployeeResponsibleList({
				collection: employeeList,
				el: $("#employeeResponsible"),
			});
			employeeResponsibleListView.render();
	    },

	    $notes: $("#interviewNotes"),
	    
	    loadInterviewNotes: function() {
	    	console.log("load Interview Notes");
	    	
//	    	this.$notes.empty();
	    	this.$("#interviewNotes").empty();
	    	
	    	var self = this;
	    	notesList = new InterviewNotesCollection({question_id: this.question_id});
		    notesList.fetch({
		    	success: function (data) {
		    		console.log("loading noteslist for: "+self.question_id);
//		    		console.log(data);
		    		self.showNotes(data);
		    	},
		    	error: function(data) {
		    		console.log("error retrieving questionlist");
		    	}
		    });
	    },

	    showNotes: function(notesList) {
	    	console.log("rendering notes collections");
//	    	console.log(notesList);
//	    	console.log(this.$notes);
			interviewNotesListView = new InterviewNotesList({
				collection: notesList,
				el: this.$notes
			});
			interviewNotesListView.render();
	    },

	    events: {
	      "click .update": "updateAndExitNotes",
	      "click .cancel": "exitOut",
	      "click .mark, .unmark": "clickComplete",
	      "click #add-interview-notes": "addNotes",
	      "click #add-staff-responsible": "addStaffResponsible",
	      "click #add-tool-responsible": "addToolResponsible"
	    },

	    clickComplete: function() {
	    	console.log("complete clicked");
	    	$('#done').click();
	    	this.updateAndExitNotes();
	    	//this.saveNotes();
	    },
	    
	    employeeModel: null,
	    staffResponsibleView: null,
	    
	    addStaffResponsible: function() {
	    	console.log("add staff responsible clicked!");
//	    	if (!this.employeeModel) {
	    		var client_id = Session.get("Assessment:client_id");
	    		// load employeeModel from the database
	    		this.employeeModel = new EmployeeCollection(client_id);
			    var self = this;
			    this.employeeModel.fetch({
			      success: function (data) {
			    	  console.log("loading employeelist");
			    	  self.showStaffResponsibleDialog(data);
			      },
			      error: function(data) {
			    	  console.log("error retrieving employeelist");
			      }
			    });
//	    	} else {
//	    		this.showStaffResponsibleDialog(this.employeeModel);
//	    	}
	    },
	    
	    showStaffResponsibleDialog: function(employeeData) {
//	    	if (!this.staffResponsibleView) {
//	    		this.staffResponsibleView = new EmployeeResponsibleDialog( {model: employeeModel, question_id: this.question_id} );
//	    	}
	    	var employeeDataModel = new Backbone.Model({
	    		employees: employeeData,
	    		employeeOptions: employeeData.toJSON(),
	    	});
    		this.staffResponsibleView = new EmployeeResponsibleDialog( 
    				{model: new EmployeeUtilizationModel(), employeeModel: employeeDataModel, question_id: this.question_id} );

	    	this.staffResponsibleView.show(this);
	    	$('#staff-responsible-dialog').modal('show');
//	    	this.saveNotes();
	    	return false;
	    },
	    
	    addToolResponsible: function() {
	    	console.log("add security tool clicked!");
    		var client_id = Session.get("Assessment:client_id");
    		// load clientTools from the database
    		var clientToolList = new ClientToolCollection(client_id);
		    var self = this;
		    clientToolList.fetch({
		      success: function (data) {
		    	  console.log("loading clientToollist");
//		    	  console.log(data);
		    	  self.showToolResponsibleDialog(data);
		      },
		      error: function(data) {
		    	  console.log("error retrieving clientToollist");
		      }
		    });
	    },
	    
	    showToolResponsibleDialog: function(toolData) {
	    	var toolDataModel = new Backbone.Model({
	    		tools: toolData,
	    		toolOptions: toolData.toJSON(),
	    	});
    		this.toolResponsibleView = new ToolResponsibleDialog( 
    				{model: new ToolUtilizationModel(), toolModel: toolDataModel, question_id: this.question_id} );

	    	this.toolResponsibleView.show(this);
	    	$('#tool-responsible-dialog').modal('show');
//	    	this.saveNotes();
	    	return false;
	    },
	    
	    addNotes: function() {
	    	console.log("Add Interview Notes is click!");
//	    	console.log(this.questionItem);
	    	var view = new InterviewNotesDialog( {model: new InterviewNotesModel({question: this.questionItem})} );
	    	view.show(this);
	    	$('#interview-notes').modal('show');
//	    	this.saveNotes();
	    	return false;
	    },

	    saveNotes: function() {
	    	
	    	console.log("saving notes for id: "+ this.question_id);
	    	var questionModel = this.question;
	    	var now = utils.getCurrentTime();
	    	
	    	questionModel.save({
	    	  id: this.question_id,
//	    	  question_id: this.question_id,
	    	  assess_question_id: this.question_id,
	    	  assess_question: $('#control_question').val(),
	    	  response_notes: $('#response_notes').val(),
	    	  manual_coverage: $('#manual_coverage').val(),
	    	  manual_compliance: $('#manual_compliance_rating').val(),
	    	  manual_documentation: $('#manual_documentation_rating').val(),
	    	  manual_process: $('#manual_process_desc').val(),
	    	  manual_score: $('#manaul_process_score').val(),
	    	  auto_coverage: $('#auto_coverage').val(),
	    	  auto_compliance: $('#auto_compliance_rating').val(),
	    	  auto_documentation: $('#auto_documentation_rating').val(),
	    	  auto_process: $('#auto_process_desc').val(),
	    	  auto_score: $('#auto_process_score').val(),
	    	  score: this.viewModel.finalComplianceScore(),
	    	  status: $('#done').is(':checked') ? "Complete" : "In progress",
	          complete: $('#done').is(':checked') ? 1 : 0,
	          time_now: now,
	          last_touched: Session.get("loginAs")
	    	},{
	    		success: function() {
	    			console.log('question detail updated successfully!');
	    		}
	    	});
//	    	window.history.back();
//	    	return false;
	    },
	
	    updateAndExitNotes: function() {
	    	this.saveNotes();
//	    	this.exitOut();
	    },
	    	  
	    exitOut: function() {
	    	this.undelegateEvents();
	    	console.log("go to url: "+this.viewModel.last_url);
//	    	Backbone.history.navigate(this.viewModel.last_url, {trigger: true});
	    	window.history.back();
	    	return false;
	    },
	    
	});

	return AssessmentQuestionDetailsView;

});
