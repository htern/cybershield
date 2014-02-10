define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/security_controls/control_family-list.html',
	'models/ControlCategoryModel',
	'knockout',
	'knockback'],

function($, _, Backbone, controlFamilyTemplate, ControlCategoryModel, ko, kb) {

	var ControlCategoryCollection = Backbone.Collection.extend({
		initialize: function(options) {
			if (options) {
				this.assessment_id = options.assessment_id;
			}
		},
		model: ControlCategoryModel,
		url: function() {
			return 'api/categories' + (this.assessment_id ? '/'+this.assessment_id : '');
		}
	});
	  
	var CategoriesByAssessmentView = Backbone.View.extend({
		el: $("#subTabPage"),
		viewModel: null,
		
		initialize: function() {
			console.log("Initializing CategorieByAssessmentView");
			
		    var self = this;
		    var categoryList = new ControlCategoryCollection();
			
		    var model = new Backbone.Model({
	    		categories: categoryList,
	    	});
	    	
	  	    this.viewModel = kb.viewModel(model);
	  	    
	  	    // binding viewModel to template
	  	    $("#subTabPage").load('templates/control_categories/category_list_by_assessment.html', function() {
//	    		ko.applyBindings(self.viewModel, $("#category-list").get(0));
	    	});
		},

	    refresh: function(clientAssessID) {
	    	console.log("CategoriesByAssessmentView.refresh is called.");
	    	
		    var self = this;
		    var categoryList = new ControlCategoryCollection({assessment_id: clientAssessID});
		    categoryList.fetch({
		      success: function (data) {
		    	  console.log("loading categorylist");
		    	  self.show(data);
		      },
		      error: function(data) {
		    	  console.log("error retrieving categorylist");
		      }

		    });
		    
//  	 	    console.log("categoryList");
//		    console.log(categoryList)
//		    var model = new Backbone.Model({
//			  categories: categoryList,
//		    });
//
//		    this.viewModel = kb.viewModel(model);
		    
	    },
	    
	    show: function(categoryList) {
	    	
	    	console.log(categoryList);
	    	
		    var model = new Backbone.Model({
		    	categories: categoryList,
		    	assess_id: Session.get("Assessment:assess_id"),
			  	client_name: Session.get("Assessment:client_name"),
			  	standard_type: Session.get("Assessment:standard_type"),
			  	start_date: Session.get("Assessment:start_date"),
				contact_name: Session.get("Assessment:contact_name"),
				assessed_by: Session.get("Assessment:assessed_by"),
				status: Session.get("Assessment:status"),
				total_controls: Session.get("Assessment:total_controls"),
				avg_score: Session.get("Assessment:avg_score"),
				complete_percentage: Session.get("Assessment:complete_percentage"),
		    });
		    
			this.viewModel = kb.viewModel(model);
			ko.applyBindings(this.viewModel, $("#category-list").get(0));
	    },
		
	    events: {
	    	"click a.cat_row": "categorySelected"
	    }, 
	    
	    categorySelected: function(event) {
	    	console.log("category row is clicked");

	    	var $row = $(event.target).closest("tr");
	    	
	    	Session.set("Category:control_category_id",$($row).attr("control_category_id"));
	    	Session.set("Category:control_function_name", $($row).attr("control_function_name").trim());
	    	Session.set("Category:control_category_name", $($row).attr("control_category_name").trim());
	    	Session.set("Category:controlCnt", $($row).attr("controlCnt").trim());
	    	Session.set("Category:complete_percentage", $($row).attr("complete_percentage").trim());
	    	Session.set("Category:avg_score", $($row).attr("avg_score").trim());
	    	Session.set("Category:urlLink", $($row).attr("urlLink").trim());
	    },
	    
	    render: function() {
		
		  var self = this;
		  var controlfamilies = new ControlCategoryCollection();
		  controlfamilies.fetch({
		    success: function (controlfamilies) {
		      var template = _.template(controlFamilyTemplate, {controlfamilies: controlfamilies.models});
		      self.$el.html(template);
		    }
		  })
		  
		  $('.controls-nav li').removeClass('active');
		  $('.controls-nav li a[href="'+window.location.hash+'"]').parent().addClass('active');
		    }
		
	});

	return CategoriesByAssessmentView;
		  
});
