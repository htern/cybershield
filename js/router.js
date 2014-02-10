// Filename: router.js
define([

  'jquery',
  'underscore',
  'backbone',
  'views/MainView',
  'views/home/HomeView',
  'views/home/ClearMainViewContent',
  'views/home/ClearSubPageContent',

  'views/security_controls/ControlTabsView',
  'views/control_family-view',
  'views/control_questions-view',
  'views/security_controls/SecurityControlsView',
  'views/security_controls/AddNewControlView',

  'views/assessments/AssessmentTabsView',
  'views/assessments/ClientAssessmentsView',
  'views/assessments/CreateNewAssessmentView',

  'views/tools/ToolsView',
  'views/tools/ToolsContentView',
  'views/tools/ManageClientToolsView',
  'views/tools/ClientToolDetailsView',
  
  'views/clients/ManageClientsView',

  'views/users/CreateNewUserView',
  'views/users/UpdateUserView',
  'views/users/ManageUsersView',
  
  'views/employees/ManageEmployeesView',
  'views/employees/EmployeeProfileView',

  "views/control_categories/CategoriesByAssessmentView",
  "views/assessments/AssessmentQuestionsView",
  "views/assessments/AssessmentQuestionDetailsView"
], 

function($, _, Backbone, MainView, HomeView, ClearMainViewContent, ClearSubPageContent, 
            ControlTabsView, ControlFamilyView, ControlQuestionsView, SecurityControlsView, AddNewControlView, 
            AssessmentTabsView, ClientAssessmentsView, CreateNewAssessmentView,
            ToolsView, ToolsContentView, ManageClientToolsView, ClientToolDetailsView,
            ManageClientsView,
            CreateNewUserView, UpdateUserView, ManageUsersView,
            ManageEmployeesView, EmployeeProfileView, 
            CategoriesByAssessmentView, AssessmentQuestionsView, AssessmentQuestionDetailsView) {
  
    Backbone.View.prototype.close = function() {
//        console.log('Closing view ' + this);
//        console.log(this);
//        if (this.beforeClose) {
//            this.beforeClose();
//        }
        this.undelegateEvents();
//        this.remove();
        this.unbind();
    };

  var AppRouter = Backbone.Router.extend({
    routes: {
      // home page
      '': 'showHome',
      // control categories
      "controlCategoryList/:assessment_id": "showCategoriesByAssessment",
      // clients
      "manageClients": "manageClients",
      // users
      "createNewUser": "createNewUser",
      "userProfile/:username": "showUserProfile",
      "manageUsers": "manageUsers",
      // assessments
      "assessments": "showClientAssessments",
      "createNewAssessment": "createNewAssessment",
      "assessmentQuestionList/:category_id": "showAssessmentQuestions",
      "questionDetails/:id": "showQuestionDetails",
      // employee
      "manageEmployees/:client_id": "manageEmployees",
      "employeeProfile/:employee_id": "showEmployeeProfile",
      "createNewEmployee": "createNewEmployee",
      // client tool
      "manageClientTools/:client_id": "manageClientTools",
      "clientTool/:client_tool_id": "showClientToolDetails",
      "createNewClientTool": "createNewClientTool",
      // Define some URL routes
      'controls': 'showControlTabs',
      'controlFamilyList': 'showControlFamily',				// not needed
      'controlQuestionList/:id': 'showControQuestions',
      'securityControlList': 'showSecurityControls0',
      'securityControlList/:id': 'showSecurityControls',
      'addNewControl': 'addNewControl',
      // tools
      'tools': 'displayToolPage',

      // Default
      '*actions': 'defaultAction'
    },

    showHome: function() {
      if (utils.readCookie("USER")) {
      	window.location = "#/assessments";
      } else {
    	  Logger.log("Trigger Login Form");
    	  $("#mainBody").trigger("login");
      }
    },
    
    showView: function(view) {
//    	console.log(this.currentView);
    	if (this.currentView) {
    		this.currentView.close();
    	}
    	
    	this.currentView = view;
    	return view;
    },
    
    showQuestionDetails: function(question_id) {
    	if (utils.readCookie("USER")) {
	        var questionDetailsView = this.showView(new AssessmentQuestionDetailsView(question_id));
	        questionDetailsView.refresh(question_id);
	        Session.set("currentQuestionID", question_id);
    	} else {
    		window.location = "#";
    	};
    },

    showAssessmentQuestions: function(category_id) {   
    	if (utils.readCookie("USER")) {
	        var assessmentQuestionsView = this.showView(new AssessmentQuestionsView({category_id: category_id}));
	        assessmentQuestionsView.refresh();
//	        var controlTabsView = new ControlTabsView();
//	        controlTabsView.render();
    	} else {
    		window.location = "#";
    	};
    },

    createNewAssessment: function() {
    	if (utils.readCookie("USER")) {
	        var clearMainViewContent = new ClearMainViewContent();
	        clearMainViewContent.render();
	        var createNewAssessmentView = this.showView(new CreateNewAssessmentView());
	        createNewAssessmentView.refresh();
    	} else {
    		window.location = "#";
    	};
    },

    manageClientTools: function(clientID) {
    	if (utils.readCookie("USER")) {
	        var manageClientToolsView = this.showView(new ManageClientToolsView(clientID));
	        manageClientToolsView.refresh();
    	} else {
    		window.location = "#";
    	};
    },
    
    showClientToolDetails: function(clientToolID) {
    	if (utils.readCookie("USER")) {
	        var clearMainViewContent = new ClearMainViewContent();
	        clearMainViewContent.render();
	        var clientToolDetailsView = this.showView(new ClientToolDetailsView(clientToolID));
	        	clientToolDetailsView.refresh();
    	} else {
    		window.location = "#";
    	};
    },
    
    createNewClientTool: function() {
    	if (utils.readCookie("USER")) {
	        var clientToolDetailsView = this.showView(new ClientToolDetailsView(0));
        	clientToolDetailsView.refresh();
//	        var createNewEmployeeView = new CreateNewEmployeeView();
//	        createNewEmployeeView.refresh();
    	} else {
    		window.location = "#";
    	};
    },

    manageClients: function() {
    	if (utils.readCookie("USER")) {
	        var manageClientsView = this.showView(new ManageClientsView());
	        manageClientsView.refresh();
    	} else {
    		window.location = "#";
    	};
    },
    
    manageEmployees: function(clientID) {
    	if (utils.readCookie("USER")) {
	        var manageEmployeesView = this.showView(new ManageEmployeesView(clientID));
	        manageEmployeesView.refresh();
    	} else {
    		window.location = "#";
    	};
    },
    
    showEmployeeProfile: function(employeeID) {
    	if (utils.readCookie("USER")) {
	        var clearMainViewContent = new ClearMainViewContent();
	        clearMainViewContent.render();
	        var employeeProfileView = this.showView(new EmployeeProfileView(employeeID));
//	        if (employeeProfileView.viewModel)
	        	employeeProfileView.refresh();
    	} else {
    		window.location = "#";
    	};
    },
    
    createNewEmployee: function() {
    	if (utils.readCookie("USER")) {
	        var employeeProfileView = this.showView(new EmployeeProfileView(0));
        	employeeProfileView.refresh();
//	        var createNewEmployeeView = new CreateNewEmployeeView();
//	        createNewEmployeeView.refresh();
    	} else {
    		window.location = "#";
    	};
    },

    showCategoriesByAssessment: function(clientAssessID) {
    	if (utils.readCookie("USER")) {
	        var categoriesByAssessmentsView = this.showView(new CategoriesByAssessmentView());
	        categoriesByAssessmentsView.refresh(clientAssessID);
    	} else {
    		window.location = "#";
    	};
    },
    
    showClientAssessments: function() {
    	if (utils.readCookie("USER")) {
	        var clearMainViewContent = new ClearMainViewContent();
	        clearMainViewContent.render();
	        var clientAssessmentsView = this.showView(new ClientAssessmentsView());
	        clientAssessmentsView.refresh();
//	        var assessmentTabsView = new AssessmentTabsView();
//	        assessmentTabsView.render();
    	} else {
    		window.location = "#";
    	};
    },
    
    createNewUser: function() {
    	if (utils.readCookie("USER")) {
	        var clearMainViewContent = new ClearMainViewContent();
	        clearMainViewContent.render();
	        var createNewUserView = this.showView(new CreateNewUserView());
	        createNewUserView.refresh();
    	} else {
    		window.location = "#";
    	};
    },

    showUserProfile: function(username) {
    	if (utils.readCookie("USER")) {
	        var clearMainViewContent = new ClearMainViewContent();
	        clearMainViewContent.render();
	        var updateUserView = this.showView(new UpdateUserView(username));
//	        if (updateUserView.viewModel)
	        	updateUserView.refresh();
    	} else {
    		window.location = "#";
    	};
    },
    
    manageUsers: function() {
    	if (utils.readCookie("USER")) {
	        var clearMainViewContent = new ClearMainViewContent();
	        clearMainViewContent.render();
	        var manageUsersView = this.showView(new ManageUsersView());
	        manageUsersView.refresh();
    	} else {
    		window.location = "#";
    	};
    },

  });

  var initialize = function() {

    window.app_router = new AppRouter;

    MainView.init();
    Backbone.history.start();     


    // app_router.on('route:showHome', function(){
    //     var clearSubPageContent = new ClearSubPageContent();
    //     clearSubPageContent.render();
    //     var homeView = new HomeView();
    //     homeView.render();
    // });
    
    app_router.on('route:showControlTabs', function(){
        var controlFamilyView = new ControlFamilyView();
        controlFamilyView.render();
        var controlTabsView = new ControlTabsView();
        controlTabsView.render();
    });

    app_router.on('route:showControlFamily', function(){   
        var controlFamilyView = new ControlFamilyView();
        controlFamilyView.render();
        // var controlTabsView = new ControlTabsView();
        // controlTabsView.render();
    });

    app_router.on('route:showControQuestions', function(id){   
        var controlQuestionsView = new ControlQuestionsView();
        controlQuestionsView.render({id: id});
        var controlTabsView = new ControlTabsView();
        controlTabsView.render();
    });


    app_router.on('route:showSecurityControls0', function(){   
        var securityControlsView = new SecurityControlsView();
        securityControlsView.render();
        var controlTabsView = new ControlTabsView();
        controlTabsView.render();
    });

    app_router.on('route:showSecurityControls', function(id){   
        var securityControlsView = new SecurityControlsView();
        securityControlsView.render({id: id});
        var controlTabsView = new ControlTabsView();
        controlTabsView.render();
    });

    app_router.on('route:addNewControl', function(){
        var clearMainViewContent = new ClearMainViewContent();
        clearMainViewContent.render();
        var addNewControlView = new AddNewControlView();
        addNewControlView.render();
    });

//    app_router.on('route:showAssessmentQuestionDetails', function(id){
//        var clearMainViewContent = new ClearMainViewContent();
//        clearMainViewContent.render();
//        var assessmentQuestionDetailsView = new AssessmentQuestionDetailsView();
//        assessmentQuestionDetailsView.render({id: id});
//    });

//    app_router.on('route:showAssessmentTabs', function(){
//        var clientAssessmentsView = new ClientAssessmentsView();
//        clientAssessmentsView.render();
//        var assessmentTabsView = new AssessmentTabsView();
//        assessmentTabsView.render();
//    });

//    app_router.on('route:showClientAssessments', function(){   
//        var clientAssessmentsView = new ClientAssessmentsView();
//        clientAssessmentsView.render();
//    });

    app_router.on('route:displayToolPage', function(){
        var clearSubPageContent = new ClearSubPageContent();
        clearSubPageContent.render();
        var toolsView = new ToolsView();
        toolsView.render();
        var toolsContentView = new ToolsContentView();
        toolsContentView.render();
    });

/*
    app_router.on('route:defaultAction', function (actions) {
     
       // We have no matching route, lets display the home page 
        var controlsView = new ControlsView();
        controlsView.render();
    });
*/
  };

  return { 
    initialize: initialize,
    router: AppRouter
  };

});
