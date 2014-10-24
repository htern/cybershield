// on document ready
$(document).ready(function() {


    $('.tabbable a').click(function () {

        var id = $(this).attr('id');

        if (id > '0') {

        var options = {
            chart: {
                renderTo: 'mainView2',
                showAxes: true,
                height: 480
            },
            title: {
                text: 'Security Control Effectiveness/Implementation',
            },
            xAxis: {
                title: {
                   text: 'Effectiveness'
                }
            },
            yAxis: {
                title: {
                   text: 'Number of Controls'
                }
            }
         };

        // prepare an empty Highcharts object
        var chart = new Highcharts.Chart(options);

        // display Loading message
        chart.showLoading('Getting stat data ....');

        if (id == '2') {

            // get stat data (json)
            $.getJSON('php/get_data.php?id=' + id, function(aData) {

                // remove all existing series
                while (chart.series.length) {
                    chart.series[0].remove();
                }

                console.log(aData);

                // re-set categories for X axe
                var categories = [];
                $.each(aData.categories, function(idx, res) {
                    categories.push(res);
                });
                console.log(categories);
                chart.xAxis[0].setCategories(categories);
                chart.yAxis[0].axisTitle.attr({
                    text: 'Number of Control'
                });

                // gather data (values) and prepare a new Series array
                var seriesValData = [];
                $.each(aData.values, function(idx, res) {
                    seriesValData.push([res.name, parseFloat(res.val)]);
                });

                console.log(seriesValData);
                console.log(aData);
                console.log(aData.name);
                var seriesValues = {
                    name: aData.name,
                    data: seriesValData,
                    type: 'column',
                    dataLabels: { enabled: true}
                }

                // gather data (percentages) and prepare a new Series array
                var seriesPerData = [];
                $.each(aData.percentages, function(idx, res) {
                    seriesPerData.push([res.name, parseFloat(res.val)]);
                });

                var seriesPercentages = {
                    name: aData.name + ' (%)',
                    data: seriesPerData,
                    type: 'pie',
                    size: '30%',
                    center: ['15%', '30%'],
                    showInLegend: true
                }

                // hide Loading, add both series and redraw our chart
                chart.hideLoading();
                chart.addSeries(seriesValues, false);
                chart.addSeries(seriesPercentages, false);
                chart.redraw();
            });
        } else if (id == '3'){

            // get stat data (json)
            $.getJSON('php/get_data.php?id=' + id, function(aData) {

                // remove all existing series
                while (chart.series.length) {
                    chart.series[0].remove();
                }

                // re-set categories for X axe
                var categories = [];
                $.each(aData.categories, function(idx, res) {
                    categories.push(res);
                });
                chart.xAxis[0].setCategories(categories);
                chart.xAxis[0].axisTitle.attr({
                    text: 'Implementation'
                });
                chart.yAxis[0].axisTitle.attr({
                    text: 'Number of Control'
                });

                // gather data (values) and prepare a new Series array
                var seriesValData = [];
                $.each(aData.values, function(idx, res) {
                    seriesValData.push([res.name, parseFloat(res.val)]);
                });

                var seriesValues = {
                    name: aData.name,
                    data: seriesValData,
                    type: 'column',
                    dataLabels: { enabled: true}
                }

                // gather data (percentages) and prepare a new Series array
                var seriesPerData = [];
                $.each(aData.percentages, function(idx, res) {
                    seriesPerData.push([res.name, parseFloat(res.val)]);
                });

                var seriesPercentages = {
                    name: aData.name + ' (%)',
                    data: seriesPerData,
                    type: 'pie',
                    size: '30%',
                    center: ['85%', '25%'],
                    showInLegend: true
                }

                // hide Loading, add both series and redraw our chart
                chart.hideLoading();
                chart.addSeries(seriesValues, false);
                chart.addSeries(seriesPercentages, false);
                chart.redraw();
            });
        }
        } else {
            var options = {
            chart: {
                type: 'column',
                renderTo: 'mainView2',
                showAxes: true,
                height: 480

            },
    
            title: {
                text: 'Average Score by Controls'
            },
    
            xAxis: {
                categories: ['CSC01', 'CSC02', 'CSC03', 'CSC04', 'CSC05']
            },
    
            yAxis: {
                allowDecimals: false,
                min: 0,
                title: {
                    text: 'Number of controls'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }                
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
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                    }

                }
            },
    
            series: [{
                name: 'Low',
                data: [3, 4, 4, 2, 5],
                stack: 'effectiveness'
            }, {
                name: 'Medium',
                data: [3, 4, 4, 2, 5],
                stack: 'effectiveness'
            }, {
                name: 'High',
                data: [2, 5, 6, 2, 1],
                stack: 'effectiveness'
            }, {
                name: 'Essential',
                data: [3, 0, 4, 4, 3],
                stack: 'effectiveness'
            }, {
                name: 'Advanced',
                data: [5, 3, 4, 7, 2],
                stack: 'implementaion'
            }, {
                name: 'Config/Hygiene',
                data: [3, 4, 4, 2, 5],
                stack: 'implementaion'
            }, {
                name: 'Vis/Attrib',
                data: [3, 4, 4, 2, 5],
                stack: 'implementaion'
            }, {
                name: 'QW',
                data: [3, 4, 4, 2, 5],
                stack: 'implementaion'
            }, {
                type: 'spline',
                name: 'Average Score',
                data: [3.5, 2.3, 4.5, 1.7, 2.9]
            }]


         };

        // prepare an empty Highcharts object
        var chart = new Highcharts.Chart(options);

        chart.redraw();

        }
    
    });


});
