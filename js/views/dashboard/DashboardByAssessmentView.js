define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/security_controls/control_family-list.html',
	'models/ControlCategoryModel',
	'knockout',
	'knockback'],

function($, _, Backbone, controlFamilyTemplate, ControlCategoryModel, ko, kb) {

//	var ControlCategoryCollection = Backbone.Collection.extend({
//		initialize: function(options) {
//			if (options) {
//				this.assessment_id = options.assessment_id;
//			}
//		},
//		model: ControlCategoryModel,
//		url: function() {
//			return 'api/categories' + (this.assessment_id ? '/'+this.assessment_id : '');
//		}
//	});
//	  
	var DashboardByAssessmentView = Backbone.View.extend({
		el: $("#subTabPage"),
		viewModel: null,
		
		initialize: function() {
			console.log("Initializing DashboardByAssessmentView");
		},

		refresh: function(chart_Name) {
			
			var self = this;
			
		    var model = new Backbone.Model({
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
				last_url: Session.get("Assessment:urlLink"),
		    });
		    
			this.viewModel = kb.viewModel(model);
			
	  	    $("#subTabPage").load('templates/dashboard/dashboard_by_assessment.html', function() {
	  	    	ko.applyBindings(self.viewModel, $("#assessment-dashboard").get(0));
	  	    });
	  	    
			
			if (chart_Name == 'scoring')
				this.ScoringByCategory();
			if (chart_Name == 'dfarsCompliant')
				this.dfarsCompliant();
			if (chart_Name == 'securityRisk')
				this.SecurityRisk();
			if (chart_Name == 'dfarsCounts')
				this.CountsByDfars();
			if (chart_Name == 'assessmentDrilldown')
				this.ScoringDrilldown();
			if (chart_Name == 'auto_manual')
				this.auto_manual_coverage();
			if (chart_Name == 'scoreEffectiveness_Complexity')
				this.ScoreEffectiveness_Complexity();
			if (chart_Name == 'controlEffectiveness')
				this.ControlEffectiveness();
			if (chart_Name == 'countEffectiveness_Complexity')
				this.CountEffectiveness_Complexity();
			if (chart_Name == 'mbta_scoring')
				this.MBTA_ScoringByCategory();
		},

	    CountEffectiveness_Complexity: function() {
	    	
	    	$('#chartArea').css({height: '400px'});

	    	var options = {
//	    	$('#subTabPage').highcharts({
	            chart: {
	                renderTo: 'chartArea',
	                type: 'column'
	            },
	            title: {
	                text: 'Incident Response'
	            },
	            subtitle: {
	                text: 'Control Count by Effectiveness and Complexity'
	            },
	            xAxis: {
	                categories: ['Essential', 'High', 'Medium', 'Low'],
	                title: {
	                    text: 'Effectiveness'
	                },
	            },
	            yAxis: {
	                min: 0,
	                max: 7,
	                tickInterval: 1,
//	                tickPixelInterval: 150,
	                title: {
	                    text: 'Control Count'
	                },
	                stackLabels: {
	                    enabled: true,
	                    style: {
	                        fontWeight: 'bold',
	                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
	                    }
	                }
	            },
	            legend: {
	                align: 'right',
	                x: -15,
	                verticalAlign: 'top',
	                y: 56,
	                floating: true,
	                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
	                borderColor: '#CCC',
	                borderWidth: 1,
	                shadow: false
	            },
	            tooltip: {
	                formatter: function() {
	                    return '<b>'+ this.x +'</b><br/>'+
	                        this.series.name +': '+ this.y +'<br/>'+
	                        'Total: '+ this.point.stackTotal;
	                }
	            },
	            plotOptions: {
	                column: {
	                    stacking: 'normal',
	                    dataLabels: {
	                        enabled: true,
//	                        rotation: -90,
//	                        align: 'left',
//	                        x: 4,
//	                        y: 8,
	                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
	                        style: {
	                            textShadow: '0 0 3px black, 0 0 3px black'
	                        }
	                    }
	                }
	            },
	            series: [{
	                name: 'Moderate',
	                data: [1, 3, 4, 1],
	                color: '#FFAD33',	// light orange 
	            },{
	                name: 'Quick Win',
	                data: [0, 0, 1, 4],
	                color: '#339933',	//light green
	            }]
	    	};
	    	
	        // prepare an empty Highcharts object
	        var chart = new Highcharts.Chart(options);
            chart.hideLoading();
	    	chart.redraw();
	    	
	    },
	    
	    ControlEffectiveness: function() {
	    	
	    	$('#chartArea').css({height: '400px'});

	    	var options = {
//	    	$('#subTabPage').highcharts({
	            chart: {
	                renderTo: 'chartArea',
	                type: 'column'
	            },
	            title: {
	                text: 'Incident Response'
	            },
	            subtitle: {
	                text: 'Control Count by Effectiveness and User Impacts'
	            },
	            xAxis: {
	                categories: ['Essential', 'High', 'Medium', 'Low'],
	                title: {
	                    text: 'Effectiveness'
	                },
	            },
	            yAxis: {
	                min: 0,
	                max: 7,
	                tickInterval: 1,
//	                tickPixelInterval: 150,
	                title: {
	                    text: 'Control Count'
	                },
	                stackLabels: {
	                    enabled: true,
	                    style: {
	                        fontWeight: 'bold',
	                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
	                    }
	                }
	            },
	            legend: {
	                align: 'right',
	                x: -15,
	                verticalAlign: 'top',
	                y: 56,
	                floating: true,
	                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
	                borderColor: '#CCC',
	                borderWidth: 1,
	                shadow: false
	            },
	            tooltip: {
	                formatter: function() {
	                    return '<b>'+ this.x +'</b><br/>'+
	                        this.series.name +': '+ this.y +'<br/>'+
	                        'Total: '+ this.point.stackTotal;
	                }
	            },
	            plotOptions: {
	                column: {
	                    stacking: 'normal',
	                    dataLabels: {
	                        enabled: true,
//	                        rotation: -90,
//	                        align: 'left',
//	                        x: 4,
//	                        y: 8,
	                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
	                        style: {
	                            textShadow: '0 0 3px black, 0 0 3px black'
	                        }
	                    }
	                }
	            },
	            series: [{
	                name: 'Medium User Impact',
	                data: [0, 0, 2, 1],
	                color: '#3083D6',	//light blue
	            },{
	                name: 'Low User Impact',
	                data: [1, 3, 3, 4],
	                color: '#47A347',	// light green 
	            }]
	    	};
	    	
	        // prepare an empty Highcharts object
	        var chart = new Highcharts.Chart(options);
            chart.hideLoading();
	    	chart.redraw();
	    	
	    },
	    
	    ScoreEffectiveness_Complexity: function() {
	    	console.log("Control Effectiveness Chart is called.");
	    	
	    	$('#chartArea').css({height: '400px'});

	    	
	    	var options = {
//	    	$('#subTabPage').highcharts({

    	        chart: {
	                renderTo: 'chartArea',
	                type: 'heatmap',
	                marginTop: 70,
	                marginBottom: 40,
	                marginLeft: 150,
    	        },
    	        title: {
    	            text: 'Incident Response',
    	        },
	            subtitle: {
	                text: 'Average Score by Effectiveness and Implementation Complexity'
	            },
	            xAxis: {
	                categories: ['Essential', 'High', 'Medium', 'Low'],
	            	title: {
	            		text: 'Overall Effectiveness',
	            	}
	            },

	            yAxis: {
	                categories: ['Quick Win', 'Moderate', 'Advanced'],
	                title: {
	                	text: 'Implementation Complexity',
	                }
	            },
	            zAxis: {},

	            colorAxis: {
	            	stops: [
	            	    [0, '#ff0000'],
	            	    [0.15, '#ff0000'],
	            	    [0.4, '#ffff00'],
	            	    [0.75, '#006600'],
	            	],
	                min: 0,
	                max: 5,
//	                startOnTick: false,
//	                endOnTick: false,
//	                minColor: '#FFFFFF',
//	                maxColor: Highcharts.getOptions().colors[0]
	            },

	            legend: {
	                align: 'right',
	                layout: 'vertical',
	                margin: 0,
	                verticalAlign: 'bottom',
	                y: .5,
	                symbolHeight: 320	
	            },

	            tooltip: {
	                formatter: function () {
	                    return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> / <b>'  
	                    + this.series.yAxis.categories[this.point.y] + '</b><br>average score: <b>'
	                    + this.point.value + '</b>';
//	                        this.point.value + '</b> items on <br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
	                }
	            },

	            series: [{
	                name: 'Control Count',
	                borderWidth: 1,
	                data: [[0,0,null],[0,1,2],[0,2,null],[1,0,null],[1,1,1.67],[1,2,null],[2,0,2.5],[2,1,2.375],[2,2,null],[3,0,1.125],
	                       [3,1,0],[3,2,null]],
	                dataLabels: {
	                    enabled: true,
	                    color: 'black',
	                    style: {
	                        textShadow: 'none',
	                        HcTextStroke: null
	                    }
	                }
	            }],

	    	};
	    	
	        // prepare an empty Highcharts object
	        var chart = new Highcharts.Chart(options);
            chart.hideLoading();
	    	chart.redraw();
	    	
	    },
	    
	    SecurityRisk: function() {
	    	console.log("DashboardByAssessmentView.refresh for security risk distribution.");
	    	
//	    	var categories = Session.get("categoryList");
//	    	console.log(categories);
//
	    	$('#chartArea').css({height: '400px'});

	    	
	    	var options = {
//	    	$('#subTabPage').highcharts({

    	        chart: {
	                renderTo: 'chartArea',
    	            plotBackgroundColor: null,
    	            plotBorderWidth: null,
    	            plotShadow: false
    	        },
    	        title: {
    	            text: 'Overall Security Risk Distribution'
    	        },
    	        tooltip: {
    	    	    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    	        },
    	        plotOptions: {
    	            pie: {
    	                allowPointSelect: true,
    	                cursor: 'pointer',
    	                dataLabels: {
    	                    enabled: true,
    	                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
    	                    style: {
    	                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
    	                    }
    	                }
    	            }
    	        },
    	        series: [{
    	            type: 'pie',
    	            name: 'Dist Value',
    	            data: [
    	                   {
    	                	 name: 'Process not yet resident', 
    	                	 y: 18.5,
    	                	 color: 'red',
    	                   },
    	                   {
    	                	   name: 'Satisfies Control Partially',
    	                	   y: 21.2,
    	                	   color: 'orange',
    	                   },
    	                   {
    	                	   name: 'Satisfies Control Fully',
    	                	   y: 19.1,
    	                	   color: 'yellow',
    	                   },
    	                   {
    	                	   name: 'Documented',
    	                	   y: 23.8,
    	                	   color: '#328432',	//green
    	                   },
    	                {
    	                    name: 'Process achieves control objectives',
    	                    y: 17.4,
    	                    color: '#4572A7',	// blue
    	                    sliced: true,
    	                    selected: true
    	                },
    	            ]
    	        }],

	    	};
	    	
	        // prepare an empty Highcharts object
	        var chart = new Highcharts.Chart(options);
            chart.hideLoading();
	    	chart.redraw();
	    	
	    },
	    
	    dfarsCompliant: function() {
	    	console.log("DashboardByAssessmentView.refresh for DFARS compliant.");
	    	
	    	$('#chartArea').css({height: '400px'});
//	    	var categories = Session.get("categoryList");
//	    	console.log(categories);
//
	    	
	    	var options = {
//	    	$('#subTabPage').highcharts({

    	        chart: {
	                renderTo: 'chartArea',
    	            type: 'pie',
//    	            options3d: {
//    					enabled: true,
//    	                alpha: 45,
//    	                beta: 0
//    	            }
    	        },
    	        title: {
    	            text: 'DFARS Compliant %'
    	        },
//    	        tooltip: {
//    	            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
//    	        },
    	        plotOptions: {
    	            pie: {
    	                allowPointSelect: true,
    	                cursor: 'pointer',
    	                depth: 35,
    	                dataLabels: {
    	                    enabled: true,
    	                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
    	                }
    	            }
    	        },
    	        series: [{
    	            type: 'pie',
    	            name: 'Compliant Count',
    	            data: [
       	                {
       	                	name: 'Partially Compliant',
       	                	y: 23,
       	                	color: 'gold',
       	                	drilldown: 'partial_compliant',
       	                },
       	                {
       	                	name: 'Not Compliant',
       	                	y: 4,
       	                	color: '#e50000',	//red
       	                	drilldown: 'not_compliant',
       	                },
       	                {
       	                	name: 'Compliant',
       	                	y: 24,
       	                	color: 'green',
       	                }
    	            ]
    	        }],
    	        drilldown: {
    	        	series: [{
    	        		id: 'partial_compliant',
    	        		name: 'Control Count',
    	        		data: [
       	        		    ['Access Control',4],
    	        		    ['Audit and Accountability',4],
    	        		    ['Awareness and Training',1],
    	        		    ['Configuration Management',4],
    	        		    ['Identification and Authenication',2],
    	        		    ['Incident Response',2],
    	        		    ['Program Management',1],
    	        		    ['System and Communications Protection',3],
    	        		    ['System and Information Integrity',2],
//    	        		    ['Access Control',17.4],
//    	        		    ['Audit and Accountability',17.4],
//    	        		    ['Awareness and Training',4.3],
//    	        		    ['Configuration Management',17.4],
//    	        		    ['Identification and Authenication',8.7],
//    	        		    ['Incident Response',8.7],
//    	        		    ['Program Management',4.3],
//    	        		    ['System and Communications Protection',13],
//    	        		    ['System and Information Integrity',8.7],
    	        		]
    	        	},{
    	        		id: 'not_compliant',
    	        		name: 'Control Count',
    	        		data: [
    	        		    ['Incident Response',2],
    	        		    ['Risk Assessment',1],
    	        		    ['System and Communications Protection',1],
    	        		    ]
    	        	}]
    	        },

	    	};
	    	
	        // prepare an empty Highcharts object
	        var chart = new Highcharts.Chart(options);
            chart.hideLoading();
	    	chart.redraw();
	    	
	    },
	    
	    ScoringByCategory: function() {
	    	console.log("DashboardByAssessmentView.refresh is called.");
	    	
	    	$('#chartArea').css({height: '600px'});

	    	var categories = Session.get("categoryList");
	    	console.log(categories);

	    	var options = {
//	    	$('#subTabPage').highcharts({
	            chart: {
	                renderTo: 'chartArea',
	                type: 'column'
	            },
	            title: {
	                text: 'Scoring by Control Category'
	            },
	            subtitle: {
	                text: 'Average Compliance and Documentation Scores'
	            },
	            xAxis: {
	            	labels: {
	            		rotation: -45,
	            		aligh: 'right'
	            	},
	                categories: ['Access Control', 
	                             'Audit and Accountability', 
	                             'Awareness and Training', 
	                             'Configuration Management', 
	                             'Contingency Planning',
	                             'Identification and Authentication', 
	                             'Incident Response',
	                             'Maintenance', 
	                             'Media Protection',
	                             'Personnel Security', 
	                             'Physical and Environmental Protection', 
	                             'Planning', 
	                             'Program Management',
	                             'Risk Assessment',
	                             'Security Assessment and Authorization', 
	                             'System and Communications Protection',
	                             'System and Information Integrity', 
	                             'System and Services Acquisition',
	                             ]
	            },
	            yAxis: {
	                min: 0,
	                max: 5,
	                tickInterval: 0.5,
	                tickPixelInterval: 150,
	                title: {
	                    text: 'Scoring'
	                },
	                stackLabels: {
	                    enabled: true,
	                    style: {
	                        fontWeight: 'bold',
	                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
	                    }
	                }
	            },
	            legend: {
	                align: 'right',
	                x: -15,
	                verticalAlign: 'top',
	                y: 56,
	                floating: true,
	                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
	                borderColor: '#CCC',
	                borderWidth: 1,
	                shadow: false
	            },
	            tooltip: {
	                formatter: function() {
	                    return '<b>'+ this.x +'</b><br/>'+
	                        this.series.name +': '+ this.y +'<br/>'+
	                        'Total: '+ this.point.stackTotal;
	                }
	            },
	            plotOptions: {
	                column: {
	                    stacking: 'normal',
	                    dataLabels: {
	                        enabled: true,
	                        rotation: -90,
	                        align: 'left',
	                        x: 4,
	                        y: 8,
	                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
	                        style: {
	                            textShadow: '0 0 3px black, 0 0 3px black'
	                        }
	                    }
	                }
	            },
	            series: [{
	                name: 'Average of Documentation (Max: 2)',
	                data: [0.87, 0.57, 1, 0.87, 0.68, 1, 0.84, 1.38, 
	                       0.90, 1.13, 0.81, 1, 0.73, 0.43, 
	                       0.83, 1.04, 0.61, 0.69],
	                color: '#b79a00',	// gold 
	            },{
	                name: 'Average of Compliance (Max: 3)',
	                data: [2.34, 2, 1.5, 2.27, 1.91, 2, 0.84, 2.54, 
	                       2.25, 2.06, 2.78, 1.25, 1.22, 0.86, 
	                       1.75, 2.33, 2.03, 1.85],
	                color: '#4572A7',	//blue
	            }]
	    	};
	    	
	        // prepare an empty Highcharts object
	        var chart = new Highcharts.Chart(options);
            chart.hideLoading();
	    	chart.redraw();
	    	
//	        });
	
//		    var self = this;
//		    var categoryList = new ControlCategoryCollection({assessment_id: clientAssessID});
//		    categoryList.fetch({
//		      success: function (data) {
//		    	  console.log("loading categorylist");
//		    	  self.show(data);
//		      },
//		      error: function(data) {
//		    	  console.log("error retrieving categorylist");
//		      }
//
//		    });
		    
	    },
	    
	    MBTA_ScoringByCategory: function() {
	    	console.log("DashboardByAssessmentView.refresh is called.");
	    	
	    	$('#chartArea').css({height: '600px'});

	    	var categories = Session.get("categoryList");
	    	console.log(categories);

	    	var options = {
//	    	$('#subTabPage').highcharts({
	            chart: {
	                renderTo: 'chartArea',
	                type: 'column'
	            },
	            title: {
	                text: 'Scoring by Control Category'
	            },
	            subtitle: {
	                text: 'Average Compliance and Documentation Scores'
	            },
	            xAxis: {
	            	labels: {
	            		rotation: -45,
	            		aligh: 'right'
	            	},
	                categories: ['Access Control', 
	                             'Audit and Accountability', 
	                             'Awareness and Training', 
	                             'Configuration Management', 
	                             'Contingency Planning',
	                             'Identification and Authentication', 
	                             'Incident Response',
	                             'Maintenance', 
	                             'Media Protection',
	                             'Personnel Security', 
	                             'Physical and Environmental Protection', 
	                             'Planning', 
	                             'Program Management',
	                             'Risk Assessment',
	                             'Security Assessment and Authorization', 
	                             'System and Communications Protection',
	                             'System and Information Integrity', 
	                             'System and Services Acquisition',
	                             ]
	            },
	            yAxis: {
	                min: 0,
	                max: 5,
	                tickInterval: 0.5,
	                tickPixelInterval: 150,
	                title: {
	                    text: 'Scoring'
	                },
	                stackLabels: {
	                    enabled: true,
	                    style: {
	                        fontWeight: 'bold',
	                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
	                    }
	                }
	            },
	            legend: {
	                align: 'right',
	                x: -15,
	                verticalAlign: 'top',
	                y: 56,
	                floating: true,
	                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
	                borderColor: '#CCC',
	                borderWidth: 1,
	                shadow: false
	            },
	            tooltip: {
	                formatter: function() {
	                    return '<b>'+ this.x +'</b><br/>'+
	                        this.series.name +': '+ this.y +'<br/>'+
	                        'Total: '+ this.point.stackTotal;
	                }
	            },
	            plotOptions: {
	                column: {
	                    stacking: 'normal',
	                    dataLabels: {
	                        enabled: true,
	                        rotation: -90,
	                        align: 'left',
	                        x: 4,
	                        y: 8,
	                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
	                        style: {
	                            textShadow: '0 0 3px black, 0 0 3px black'
	                        }
	                    }
	                }
	            },
	            series: [{
	                name: 'Average of Documentation (Max: 2)',
	                data: [0.23, 0.86, 0.20, 0.26, 0.27, 0.69, 0.64, 0.23, 
	                       0.30, 0, 0.05, 0.50, 0.31, 1.43, 
	                       0.75, 0.48, 0.10, 0.62],
	                color: '#b79a00',	// gold 
	            },{
	                name: 'Average of Compliance (Max: 3)',
	                data: [2.36, 1.86, 1.50, 1.30, 1.57, 2.06, 1.61, 1.62, 
	                       2.25, 1.50, 2.36, 1.25, 1.88, 1.89, 
	                       1.75, 1.80, 1.94, 1.50],
	                color: '#4572A7',	//blue
	            }]
	    	};
	    	
	        // prepare an empty Highcharts object
	        var chart = new Highcharts.Chart(options);
            chart.hideLoading();
	    	chart.redraw();
	    	
//	        });
	
//		    var self = this;
//		    var categoryList = new ControlCategoryCollection({assessment_id: clientAssessID});
//		    categoryList.fetch({
//		      success: function (data) {
//		    	  console.log("loading categorylist");
//		    	  self.show(data);
//		      },
//		      error: function(data) {
//		    	  console.log("error retrieving categorylist");
//		      }
//
//		    });
		    
	    },
	    
	    ScoringDrilldown: function() {
	    	console.log("Scoring Drill Down is called.");
	    	
	    	$('#chartArea').css({height: '600px'});

	    	var options = {
//	    	$('#subTabPage').highcharts({
	            chart: {
	                renderTo: 'chartArea',
	                type: 'column'
	            },
	            title: {
	                text: 'Assessment Drill Down'
	            },
	            subtitle: {
	                text: 'by Compliance and Scores'
	            },
	            xAxis: {
	            	labels: {
	            		rotation: -45,
	            		aligh: 'right'
	            	},
	            	type: 'category',
	            },
	            yAxis: {
	                min: 0,
	                max: 5,
	                tickInterval: 0.5,
	                tickPixelInterval: 150,
	                title: {
	                    text: 'Scores',
	                },
	            },
	            legend: {
	            	enabled: false,
	            },
//	            tooltip: {
//	                formatter: function() {
//	                    return '<b>'+ this.x +'</b><br/>'+
//	                        this.series.name +': '+ this.y;
//	                }
//	            },
	            plotOptions: {
	                series: {
	                    dataLabels: {
	                        enabled: true,
//	                        rotation: -90,
//	                        align: 'left',
//	                        x: 4,
//	                        y: 8,
//	                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
//	                        style: {
//	                            textShadow: '0 0 3px black, 0 0 3px black'
//	                        }
	                    }
	                }
	            },
	            series: [{
	                name: 'Score',
	                data: [{
	                	name: 'Access Control',
	                	y: 3.21,
	                	color: 'green',
	                	drilldown: 'access',
	                }, {
	                	name: 'Audit and Accountability',
	                	y: 2.57,
	                	color: 'gold',
	                	drilldown: 'audit',
	                }, {
	                	name: 'Awareness and Training',
	                	y: 2.5,
	                	color: 'gold',
	                	drilldown: 'awareness',
	                }, {
	                	name: 'Configuration Management',
	                	y: 3.14,
	                	color: 'green',
	                	drilldown: '',
	                }, {
	                	name: 'Contingency Planning',
	                	y: 2.59,
	                	color: 'gold',
	                	drilldown: '',
	                }, {
	                	name: 'Identification and Authentication',
	                	y: 3,
	                	color: 'green',
	                	drilldown: '',
	                }, {
	                	name: 'Incident Response',
	                	y: 1.68,
	                	color: 'gold',
	                	drilldown: 'incident',
	                }, {
	                	name: 'Maintenance',
	                	y: 3.92,
	                	color: 'green',
	                	drilldown: '',
	                }, {
	                	name: 'Media Protection',
	                	y: 3.15,
	                	color: 'green',
	                	drilldown: '',
	                }, {
	                	name: 'Personnel Security',
	                	y: 3.19,
	                	color: 'green',
	                	drilldown: '',
	                }, {
	                	name: 'Physical and Environmental Protection',
	                	y: 3.59,
	                	color: 'green',
	                	drilldown: '',
	                }, {
	                	name: 'Planning',
	                	y: 2.25,
	                	color: 'gold',
	                	drilldown: '',
	                }, {
	                	name: 'Program Management',
	                	y: 1.95,
	                	color: 'gold',
	                	drilldown: '',
	                }, {
	                	name: 'Risk Assessment',
	                	y: 1.29,
	                	color: 'gold',
	                	drilldown: '',
	                }, {
	                	name: 'Security Assessment and Authorization',
	                	y: 2.58,
	                	color: 'gold',
	                	drilldown: '',
	                }, {
	                	name: 'System and Communications Protection',
	                	y: 3.37,
	                	color: 'green',
	                	drilldown: '',
	                }, {
	                	name: 'System and Information Integrity',
	                	y: 2.64,
	                	color: 'gold',
	                	drilldown: '',
	                }, {
	                	name: 'System and Services Acquisition',
	                	y: 2.54,
	                	color: 'gold',
	                	drilldown: '',
	                }],
	            }],
	            drilldown: {
	            	xAxis: {
	            		categories: ['DFARS Controls', 'Non-DFARS Controls'],
	            	},
	            	series: [{
	            		id: 'access',
	            		name: 'Score',
	            		data: [{
	            			name: 'Non-DFARS: Compliant',
	            			y: 3.85,
	            			color: 'green',
	            		},{
	            			name: 'Non-DFARS: Partially Compliant',
	            			y: 2.07,
		                	color: 'gold',
	            		}, {
	            			name: 'DFARS: Compliant',
	            			y: 4.38,
		                	color: 'green',
	            		}, {
	            			name: 'DFARS: Partially Compliant',
	            			y: 2.69,
		                	color: 'gold',
	            		}]
	            	}, {
	            		id: 'incident',
	            		name: 'Score',
	            		data: [{
	            			name: 'IR-01',
	            			y: 2.5,
	            			color: 'gold',
	            		},{
	            			name: 'IR-02',
	            			y: 1,
		                	color: '#e50000',
	            		},{
	            			name: 'IR-02(01)',
	            			y: 1,
		                	color: '#e50000',
	            		},{
	            			name: 'IR-03',
	            			y: 1,
		                	color: '#e50000',
	            		},{
	            			name: 'IR-03(01)',
	            			y: 0,
		                	color: '#e50000',
	            		},{
	            			name: 'IR-03(02)',
	            			y: 0,
		                	color: '#e50000',
	            		},{
	            			name: 'IR-04',
	            			y: 0,
		                	color: '#e50000',
	            		},{
	            			name: 'IR-04(01)',
	            			y: 2,
		                	color: 'gold',
	            		},{
	            			name: 'IR-05',
	            			y: 2.5,
		                	color: 'gold',
	            		},{
	            			name: 'IR-06',
	            			y: 3.5,
		                	color: 'green',
	            		},{
	            			name: 'IR-06(01)',
	            			y: 2.5,
		                	color: 'gold',
	            		},{
	            			name: 'IR-07',
	            			y: 2.5,
		                	color: 'gold',
	            		},{
	            			name: 'IR-07(01)',
	            			y: 2.5,
		                	color: 'gold',
	            		},{
	            			name: 'IR-08',
	            			y: 2.5,
		                	color: 'gold',
	            		}]
	            	}]
	            }
	    	};
	    	
	        // prepare an empty Highcharts object
	        var chart = new Highcharts.Chart(options);
            chart.hideLoading();
	    	chart.redraw();
	    	
	    },
	    
	    auto_manual_coverage: function() {
	    	console.log("Auto vs. Manual is called.");
	    	
	    	$('#chartArea').css({height: '600px'});

//	    	var categories = Session.get("categoryList");
//	    	console.log(categories);

	    	var options = {
//	    	$('#subTabPage').highcharts({
	            chart: {
	                renderTo: 'chartArea',
	                type: 'column'
	            },
	            title: {
	                text: 'Auto vs. Manual Coverage'
	            },
	            subtitle: {
	                text: ''
	            },
	            xAxis: {
	            	labels: {
	            		rotation: -45,
	            		aligh: 'right'
	            	},
	                categories: ['Access Control', 
	                             'Audit and Accountability', 
	                             'Awareness and Training', 
	                             'Configuration Management', 
	                             'Contingency Planning',
	                             'Identification and Authentication', 
	                             'Incident Response',
	                             'Maintenance', 
	                             'Media Protection',
	                             'Personnel Security', 
	                             'Physical and Environmental Protection', 
	                             'Planning', 
	                             'Program Management',
	                             'Risk Assessment',
	                             'Security Assessment and Authorization', 
	                             'System and Communications Protection',
	                             'System and Information Integrity', 
	                             'System and Services Acquisition',
	                             ]
	            },
	            yAxis: {
	                min: 0,
	                title: {
	                    text: 'Coverage %'
	                },
	            },
	            tooltip: {
	                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
	                shared: true
	            },
	            plotOptions: {
	                column: {
	                    stacking: 'percent',
	                }
	            },
	            series: [{
	                name: 'Automatic Process',
	                data: [34, 35.7, 0, 41.7, 4.5, 46.7,
	                       20, 7.7, 0, 3.8, 32.4, 0, 
	                       2.5, 42.9, 8.3, 27.6, 55.5, 0],
	                color: '#4572A7', 
	            },{
	                name: 'Manual Process',
	                data: [66, 64.3, 100, 58.3, 95.5, 55.3, 
	                       80, 92.3, 100, 96.3, 67.6, 100,
	                       97.5, 57.1, 91.7, 72.4, 44.5, 100],
	                color: '#e50000',
	            }]
	    	};
	    	
	        // prepare an empty Highcharts object
	        var chart = new Highcharts.Chart(options);
            chart.hideLoading();
	    	chart.redraw();
	    },

	    CountsByDfars: function() {
	    	console.log("Counts by DFARS refresh is called.");
	    	
	    	$('#chartArea').css({height: '600px'});

//	    	var categories = Session.get("categoryList");
//	    	console.log(categories);

	    	var options = {
//	    	$('#subTabPage').highcharts({
	            chart: {
	                renderTo: 'chartArea',
//	                type: 'column'
	            },
	            title: {
	                text: 'DFARS Control Counts'
	            },
	            subtitle: {
	                text: ''
	            },
	            xAxis: {
	            	labels: {
	            		rotation: -45,
	            		aligh: 'right'
	            	},
	                categories: ['Access Control', 
	                             'Audit and Accountability', 
	                             'Awareness and Training', 
	                             'Configuration Management', 
	                             'Contingency Planning',
	                             'Identification and Authentication', 
	                             'Incident Response',
	                             'Maintenance', 
	                             'Media Protection',
	                             'Personnel Security', 
	                             'Physical and Environmental Protection', 
	                             'Planning', 
	                             'Program Management',
	                             'Risk Assessment',
	                             'Security Assessment and Authorization', 
	                             'System and Communications Protection',
	                             'System and Information Integrity', 
	                             'System and Services Acquisition',
	                             ]
	            },
	            yAxis: {
	                min: 0,
	                max: 45,
	                tickInterval: 5,
	                tickPixelInterval: 150,
	                title: {
	                    text: 'Control Counts'
	                },
	                stackLabels: {
	                    enabled: true,
	                    style: {
	                        fontWeight: 'bold',
	                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
	                    }
	                }
	            },
	            legend: {
	                align: 'right',
	                x: -15,
	                verticalAlign: 'top',
	                y: 56,
	                floating: true,
	                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
	                borderColor: '#CCC',
	                borderWidth: 1,
	                shadow: false
	            },
	            tooltip: {
	                formatter: function() {
	                    return '<b>'+ this.x +'</b><br/>'+
	                        this.series.name +': '+ this.y +'<br/>'+
	                        'Total: '+ this.point.stackTotal;
	                }
	            },
	            plotOptions: {
	                column: {
	                    stacking: 'normal',
	                    dataLabels: {
	                        enabled: true,
	                        rotation: -90,
	                        align: 'left',
	                        x: 4,
	                        y: 8,
	                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
	                        style: {
	                            textShadow: '0 0 3px black, 0 0 3px black'
	                        }
	                    }
	                }
	            },
	            series: [{
	            	type: 'column',
	                name: 'Non-DFARS Controls',
	                data: [28, 15, 4, 19, 21, 12, 10, 10, 
	                       8, 8, 18, 6, 15, 6, 
	                       12, 18, 28, 13],
	                color: '#5a9c5a',	// green 
	            },{
	            	type: 'column',
	                name: 'DFARS Controls',
	                data: [12, 6, 1, 4, 1, 3, 4, 3, 
	                       2, 0, 3, 0, 1, 1, 
	                       0, 7, 3, 0],
	                color: '#ffc04c',	//orange
	            }]
	    	};
	    	
	        // prepare an empty Highcharts object
	        var chart = new Highcharts.Chart(options);
            chart.hideLoading();
	    	chart.redraw();
	    	
//	        });
	
//		    var self = this;
//		    var categoryList = new ControlCategoryCollection({assessment_id: clientAssessID});
//		    categoryList.fetch({
//		      success: function (data) {
//		    	  console.log("loading categorylist");
//		    	  self.show(data);
//		      },
//		      error: function(data) {
//		    	  console.log("error retrieving categorylist");
//		      }
//
//		    });
		    
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
		    
		    Session.set("categoryList",categoryList);

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
	    	Session.set("Category:identifier", $($row).attr("identifier").trim());
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

	return DashboardByAssessmentView;
		  
});
