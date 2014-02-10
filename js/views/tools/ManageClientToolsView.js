define([
  'jquery',
  'underscore',
  'backbone',
  'models/ClientToolModel',
  'models/ClientToolCollection',
  'knockout',
  'knockback'],

function($, _, Backbone, ClientToolModel, ClientToolCollection, ko, kb) {

  var ManageClientToolsView = Backbone.View.extend({
	  el: $("#subTabPage"),
	  viewModel: null,

	  initialize: function(client_id) {
		  console.log("Initializing ManageClientToolsView");
		  this.client_id = client_id;
		  // load template
		  $("#subTabPage").load('templates/tools/client_tool_list.html');
	  },
    
    refresh: function() {
    	console.log("ManageClientToolsView.refresh is called.");
    	var self = this;
    	console.log("client_id: "+this.client_id);
	    var toolList = new ClientToolCollection(this.client_id);
	    toolList.fetch({
	      success: function (data) {
	    	  console.log("loading toollist");
	    	  self.show(data);
	      },
	      error: function(data) {
	    	  console.log("error retrieving toollist");
	      }
	    });
    },
	  
    show: function(toolList) {
    	
    	var model = new Backbone.Model({
    		tools: toolList,
    		client_id: this.client_id,
		  	client_name: Session.get("Client:client_name"),
    	});
    	
    	console.log(model);
  	    this.viewModel = kb.viewModel(model);
  	    console.log(this.viewModel);
  	    
  	    this.viewModel.deleteClientTool = function (data, event) {
  	    	console.log(data);
  	    	console.log("Deleting client tool: "+data.product_name());

	    	// delete client tool
  	    	var clientTool = new ClientToolModel({client_tool_id: data.client_tool_id()});
  	    	clientTool.id = data.client_tool_id();
  	    	clientTool.destroy({
	  	        success: function(model, response){
	  	          console.log("Success deleted client tool.");
	  	        },
	  	        error: function(model, response){
	  	          console.log("Error deleting client tool");
	  	        }
  	    	});  	    	
            // delete user - from the viewModel
	    	data.model().destroy();
        };
        
  	    ko.applyBindings(this.viewModel, $("#client-tool-list").get(0));
  	    
  	},

//    events: {
//    	"click a.delete-employee": "deleteEmployee"
//    }, 
//    
//    deleteEmployee: function() {
//    	console.log("deleteEmployee is clicked");
//    }
    
  	});

  	return ManageClientToolsView;
  
});
