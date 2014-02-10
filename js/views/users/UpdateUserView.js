define([
	'backbone',
	'models/UserModel',
	'utils/AuthenticateUser',
	'knockout',
	'knockback'
], 

function(Backbone, UserModel, AuthenticateUser, ko, kb) {

  var UpdateUserView = Backbone.View.extend({
    el: $("#subTabPage"),
    viewModel: null,
    userProfile: null,
    userItem: null,
    
    initialize: function(username) {
    	console.log("UpdateUserView is initializing for: "+ username);
    	
    	Session.set("errorMsg", "");
    	var self = this;
    	
    	//get user profile for selected username
    	AuthenticateUser.getUser(username, function(userData) {
	    	self.userProfile = userData;		//Session.get("user-profile");
	    	var decPwd = AuthenticateUser.decrypt(self.userProfile.password);
	    	self.userProfile.decPwd = decPwd;
	    	
	    	self.show(self.userProfile);
    	});
    },
    
    show: function(userProfile) {
    	var self = this;
    	this.userItem = userProfile;
    	this.userItem.failedValidation = ko.observable(false);
    	this.userItem.errorMsg = "";
    	this.userItem.admin = Session.get("admin") ? Session.get("admin") : false;
    	
    	var model = new Backbone.Model(this.userItem);
    	
    	this.viewModel = kb.viewModel(model);
    	
    	$("#subTabPage").load('templates/users/user_profile.html', function() {
    		ko.applyBindings(self.viewModel, $("#user-profile").get(0));
    		self.refresh();
    	});
    	
    },
    
    refresh: function() {
    	console.log("UpdateUserView.refresh is called.");
    	
    	this.viewModel.failedValidation(Session.get("errorMsg") ? true : false);
    	this.viewModel.errorMsg(Session.get("errorMsg") ? Session.get("errorMsg") : "");
    },
    
    events: {
    	"click .update": "updateUser",
    	"click .cancel": "exitOut"
    },
    
    validateFields: function() {
    	// reset errorMsg
    	Session.set("errorMsg", "");
    	
    	if (utils.empty($('#first_name'))) {
    		Session.set("errorMsg", "First Name is required, please enter first name");
    		return false;
    	};
    	
    	if (utils.empty($('#last_name'))) {
    		Session.set("errorMsg", "Last Name is required, please enter last name");
    		return false;
    	};
    	
    	if (utils.empty($('#password'))) {
    		Session.set("errorMsg", "Password is required, please enter password");
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
    		Session.set("errorMsg", "Confirmed Password is required, please enter confirmed password");
    		return false;
    	};
    	
    	if ($("#password").val() !== $("#confirm_password").val()) {
    		Session.set("errorMsg", "Password and Confirmed password not matching, " +
    				"please enter matching password and confirmed password.");
    		$("#password").focus();  
    		$("#password").select();  
    		return false;
  		};
    	return true;
    },

    updateUser: function() {
    	
    	console.log("Update User clicked");
    	
    	// validate input fields
    	if (!this.validateFields()) {
    		this.refresh();
    		return false;
    	}
    	
    	// encrypt password
    	var encPwd = AuthenticateUser.encrypt($('#password').val());

    	// save user
    	var self = this;
    	var username = Session.get("username");
    	console.log(username);
    	var user = new UserModel({username: username});
        user.save({
        	id: username,
            first_name: $('#first_name').val(),
            last_name: $('#last_name').val(),
            password: encPwd,
            admin: $('#admin').is(':checked') ? 1 : 0
        },{
        	success: function(model, response) {
        		console.log("user "+Session.get("username")+" saved successfully!");
        		// update new user-profile
//        		console.log("username: "+ Session.get("username"));
            	if (Session.get("username")!==Session.get("loginAs")) {
          		  AuthenticateUser.getUser(Session.get("loginAs"), function(data){});
          		  window.history.back();
          		  return false;
            	}
        	},
        	error: function(model, response) {
        		console.log("error saving user changes!" + response.responseText);
        		Session.set("errorMsg", response.responseText);
        		AuthenticateUser.getUser(Session.get("loginAs"), function(data){
        			return false;
        		});
        	}
        });
      },

      exitOut: function() {
    	if (Session.get("username")!==Session.get("loginAs")) {
    		  AuthenticateUser.getUser(Session.get("loginAs"), function(data){});
    	}
		window.history.back();
        return false;
  	  }

  });

  return UpdateUserView;
  
});
