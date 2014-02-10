define([
	'jquery',
	'underscore',
	'backbone',
	'views/questions/EmployeeResponsibleItem'
], 

function($, _, Backbone, EmployeeResponsibleItem){

	var EmployeeResponsibleList = Backbone.View.extend({

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
				$("#employeeResponsible").append(item.render().el);
			});
		},
		
		add: function(responsibleList) {
			console.log(responsibleList);
			var employeeItem = new EmployeeResponsibleItem({model: responsibleList});
			this._list.push(employeeItem);
			if (this._rendered) {
				console.log("added from add()");
				console.log(employeeItem.render().el);
				this.$el.append(employeeItem.render().el);
			}
		},

	});

	return EmployeeResponsibleList;
  
});
