define([
  'jquery',
  'underscore',
  'backbone',
  'models/ClientModel',
  'knockout',
  'knockback'],

function($, _, Backbone, ClientModel, ko, kb) {

	var ClientCollection = Backbone.Collection.extend({
		initialize: function(client_id) {
			if (client_id) {
				this.client_id = client_id;
			}
		},
		model: ClientModel,
		url: function() {
			return 'api/clients' + (this.client_id ? '/'+this.client_id : '');
		}
	});
  
  var ManageClientsView = Backbone.View.extend({
    el: $("#subTabPage"),
    viewModel: null,

	initialize: function(client_id) {
		console.log("Initializing ManageClientsView");
    	this.client_id = client_id;
  	    // load template
  	    $("#subTabPage").load('templates/clients/client_list.html');
	},

    refresh: function() {
    	console.log("ManageClientsView.refresh is called.");
    	var self = this;
	    var clientList = new ClientCollection();
	    clientList.fetch({
	      success: function (data) {
	    	  console.log("loading clientlist");
	    	  self.show(data);
	      },
	      error: function(data) {
	    	  console.log("error retrieving clientlist");
	      }
	    });
    },
	  
    show: function(clientList) {
    	
    	var model = new Backbone.Model({
    		clients: clientList,
    	});
    	
    	console.log(model);
  	    this.viewModel = kb.viewModel(model);
  	    
  	    ko.applyBindings(this.viewModel, $("#client-list").get(0));
  	    
  	},

    events: {
    	"click a.row_selected": "rowSelected"
    }, 
    
    rowSelected: function(event) {
    	var $row = $(event.target).closest("tr");
    	
    	console.log($($row));
    	
    	Session.set("Client:client_id",$($row).attr("client_id").trim());
    	Session.set("Client:client_name", $($row).attr("client_name").trim());
    },
    
//    events: {
//    	"click a.delete-user": "deleteUser"
//    }, 
//    
//    deleteUser: function() {
//    	console.log("deleteUser is clicked");
//    }
    
  	});

  	return ManageClientsView;
  
});
