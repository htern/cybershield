define([
	'jquery',
	'underscore',
	'backbone',
	'views/questions/ToolResponsibleItem'
], 

function($, _, Backbone, EmployeeResponsibleItem){

	var ToolResponsibleList = Backbone.View.extend({

		initialize: function() {
			
			_(this).bindAll('add');
			
			this._list = [];
			
			this.collection.each(this.add);
			
			this.collection.bind('add', this.add);
		},
		
		render: function() {
			this._rendered = true;
			// clear list
			this.$el.empty();
			console.log(this._list);
			_(this._list).each( function(item) {
//				console.log("added from render()");
//				console.log(item.render().el);
				$("#securityToolResponsible").append(item.render().el);
			});
		},
		
		add: function(responsibleList) {
			console.log(responsibleList);
			var toolItem = new ToolResponsibleItem({model: responsibleList});
			this._list.push(toolItem);
			if (this._rendered) {
				console.log("added from add()");
				console.log(toolItem.render().el);
				this.$el.append(toolItem.render().el);
			}
		},

	});

	return ToolResponsibleList;
  
});
