define([
  'jquery',
  'underscore',
  'backbone',
  'models/UserModel',
  'text!templates/users/user_list.html',
  'knockout',
  'knockback'],

function($, _, Backbone, UserModel, userTemplate, ko, kb) {

  var UserCollection = Backbone.Collection.extend({
    model: UserModel,
    url: 'api/users'
  });
  
  this.userList = new UserCollection();

  var ManageUsersView = Backbone.View.extend({
    el: $("#subTabPage"),
    viewModel: null,

    initialize: function() {
    	console.log("Initializing ManageUserView");
    	
	    var self = this;
	    var userList = new UserCollection();
//	    userList.fetch({
//	      success: function (data) {
//	    	  console.log("loading userlist");
//	    	  
//	    	var users = data.models;
//	    	console.log(data);
//	    	console.log("users:");
//	  	    console.log(users);
//
////	        var template = _.template(userTemplate, {users: data.models});
////	        self.$el.html(template);
//	      },
//	      error: function(data) {
//	    	  console.log("error retrieving userlist");
//	    	  console.log(data);
//	      }
//	    });
//	    
//	    console.log("userList:");
//	    console.log(userList);

	    var model = new Backbone.Model({
    		users: userList,
    	});
    	
  	    this.viewModel = kb.viewModel(model);
  	    
        console.log("binding ManageUser");
    	$("#subTabPage").load('templates/users/user_list.html', function() {
    		ko.applyBindings(self.viewModel, $("#user-list").get(0));
    	});

    },
    
    refresh: function() {
    	console.log("ManageUserView.refresh is called.");
	    var self = this;
	    var userList = new UserCollection();
	    userList.fetch({
	      success: function (data) {
	    	  console.log("loading userlist");
	      },
	      error: function(data) {
	    	  console.log("error retrieving userlist");
	      }
	    });
	    
    	var model = new Backbone.Model({
    		users: userList,
    	});
    	
  	    this.viewModel = kb.viewModel(model);
  	    
  	    this.viewModel.deleteUser = function (data, event) {
  	    	console.log("Deleting user: "+data.username());
//  	    $row = $(event.target).closest("tr");
//          var username = $($row).attr("id");

	    	// delete user from the backend
  	    	var user = new UserModel({username: data.username()});
  	    	user.id = data.username();
  	    	user.destroy({
	  	        success: function(model, response){
	  	          console.log("Success deleted user");
	  	        },
	  	        error: function(model, response){
	  	          console.log("Error deleting user");
	  	        }
  	    	});  	    	
            // delete user - from the viewModel
	    	data.model().destroy();
        };
  	},

    render: function(){

      var self = this;
      var users = new UserCollection();
      users.fetch({
        success: function (data) {
          var template = _.template(userTemplate, {users: data.models});
          self.$el.html(template);
        }
      });
    },
    
//    events: {
//    	"click a.delete-user": "deleteUser"
//    }, 
//    
//    deleteUser: function() {
//    	console.log("deleteUser is clicked");
//    }
    
  });

  return ManageUsersView;
  
});
