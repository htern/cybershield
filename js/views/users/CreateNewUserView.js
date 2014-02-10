define([
  'backbone',
  'models/UserModel',
  'utils/AuthenticateUser',
  'knockout',
  'knockback'
], 

function(Backbone, UserModel, AuthenticateUser, ko, kb) {

  var CreateNewUserView = Backbone.View.extend({
    el: $("#subTabPage"),
    viewModel: null,
    
    initialize: function() {
    	console.log("CreateNewUserView is now initialized.");
    	
    	//reset ErrorMsg
    	Session.set("errorMsg","");
    	
    	var self = this;
    	var model = new Backbone.Model({
        	failedValidation: false,
        	errorMsg: "",
    	});
    	
    	this.viewModel = kb.viewModel(model);
    	
    	$("#subTabPage").load('templates/users/user_registration.html', function() {
    		ko.applyBindings(self.viewModel, $("#user-registration").get(0));
    	});
    },
    
    refresh: function() {
    	var model = new Backbone.Model({
        	failedValidation: Session.get("errorMsg") ? true : false,
        	errorMsg: Session.get("errorMsg") ? Session.get("errorMsg") : ""
    	});
        this.viewModel.model(model);
    },
    	
    	
//    render: function(){
//      
////      $('.controls-nav li').removeClass('active');
////      $('.controls-nav li a[href="'+window.location.hash+'"]').parent().addClass('active');
//
//    	this.$el.html(UserRegistrationTemplate);
//    },
    
    events: {
    	"click .create": "createUser",
    	"click .cancel": "exitOut"
    },
    
    validateFields: function() {

    	if (utils.empty($('#user_name'))) {
    		Session.set("errorMsg", "User Name is required, please enter user name.");
    		return false;
    	};
    	
    	//validate username if already exist
    	var self = this;
    	AuthenticateUser.userFound($('#user_name').val(), function(userData) {
    		if (userData.password) {
        		Session.set("errorMsg", $("#user_name").val() + " already exist, " +
				"please enter another user name.");
        		$("#user_name").focus();  
        		$("#user_name").select();  
        		return false;
    		}    		
    	});
    	
    	if (!utils.validateEmail($('#user_name').val())) {
    		Session.set("errorMsg", "Username should be an email address, please enter a valid email address.");
    		$("#user_name").focus();  
    		$("#user_name").select();  
    		return false;
    	}

    	if (utils.empty($('#first_name'))) {
    		Session.set("errorMsg", "First Name is required, please enter first name.");
    		return false;
    	};
    	
    	if (utils.empty($('#last_name'))) {
    		Session.set("errorMsg", "Last Name is required, please enter last name.");
    		return false;
    	};
    	
    	if (utils.empty($('#password'))) {
    		Session.set("errorMsg", "Password is required, please enter password.");
    		return false;
    	};

    	if (!utils.validateStrongPassword($('#password').val())) {
        	// at least one number, one lower case, one upper case letter, one special character
        	// and at least eight characters
    		Session.set("errorMsg", "Password should be at least one number, " +
    				"one lower case letter, one upper case letter, one special character " +
    				"and at least 8 characters.");
    		$("#password").focus();  
    		$("#password").select();  
    		return false;
    	}

    	if (utils.empty($('#confirm_password'))) {
    		Session.set("errorMsg", "Confirmed Password is required, please enter confirmed password.");
    		return false;
    	};
    	
    	if ($("#password").val() !== $("#confirm_password").val()) {
    		Session.set("errorMsg", "Password and Confirmed password not matching, " +
    				"please enter matching password and confirmed password.");
    		$("#password").focus();  
    		$("#password").select();  
    		return false;
  		};

    	// reset errorMsg
    	Session.set("errorMsg", "");
  		return true;
    },

    createUser: function() {
    	
    	console.log("Create User clicked.");
    	
    	// validate input fields
    	if (!this.validateFields()) {
    		this.refresh();
    		return false;
    	}

    	// encrypt password
    	var encPwd = AuthenticateUser.encrypt($('#password').val());

    	// save user
    	var user = new UserModel();
        user.save({
            username: $('#user_name').val(),
            first_name: $('#first_name').val(),
            last_name: $('#last_name').val(),
            password: encPwd,
            client_id: $('#client_name').val(),
            admin: $('#admin').is(':checked') ? 1 : 0
        },{
        	success: function(model, response) {
        		console.log("user "+$('#user_name').val()+" created successfully!");
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

  return CreateNewUserView;
  
});
