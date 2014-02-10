define([
	'backbone'
],

function(Backbone) {

	var UserModel = Backbone.Model.extend({
		initialize: function(options) {
			if (options) {
				this.username = options.username;
			}
		},
	    defaults: {
	    	"user_id": null,
	    	"username": "",
	    	"full_name": "",
	    	"first_name": "",
	    	"last_name": "",
	    	"client_id": null,
	    	"admin": false
	    },
		urlRoot: 'api/users',
		url: function() {
			return this.urlRoot + '/' + (this.username ? this.username : 'new');
		}
	});

	return UserModel;
	
});