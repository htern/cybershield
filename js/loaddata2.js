// on document ready
$(document).ready(function() {

    var options = {
        chart: {
            renderTo: 'mainView2',
            showAxes: true,
            height: 480
        },
        title: {
            text: 'Average Score by Control',
        },
        xAxis: {
            categories: ['CSC01','CSC02','CSC03','CSC04','CSC05','CSC06','CSC07','CSC08','CSC09','CSC10','CSC11','CSC12','CSC13','CSC14','CSC15','CSC16','CSC17','CSC18','CSC19','CSC20']
        },
        yAxis: {
            title: {
               text: 'Number of Controls'
            }
        },
        tooltip: {
            formatter: function() {
                var s;
                if (this.point.name) { // the pie chart
                    s = ''+
                        this.point.name +': '+ this.y;
                } else {
                    s = ''+
                        this.x  +': '+ this.y;
                }
                return s;
            }
        },
     };

    // prepare an empty Highcharts object
    var chart = new Highcharts.Chart(options);

    $('.tabbable a').click(function () {
        var id = $(this).attr('id');

        // display Loading message
        chart.showLoading('Getting stat data ....');

        if (id != 'multiple') {

            // get stat data (json)
            $.getJSON('php/csv2json.php?', function(aData) {

                // remove all existing series
                while (chart.series.length) {
                    chart.series[0].remove();
                }

                // re-set categories for X axe
/*                var categories = [];
                $.each(aData.categories, function(idx, res) {
                    categories.push(res);
                });
                chart.xAxis[0].setCategories(categories);
                chart.yAxis[0].axisTitle.attr({
                    text: 'Amount of ' + aData.name + 's (thousands)'
                });
*/
                // gather data (values) and prepare a new Series array
                var seriesValData = [];
                $.each(aData.values, function(idx, res) {
                    seriesValData.push([res.name, parseFloat(res.val)]);
                });

                var seriesValues = {
                    name: aData.name,
                    data: seriesValData,
                    type: 'column'
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
                    size: '50%',
                    center: ['60%', '30%'],
                    showInLegend: true
                }

                // hide Loading, add both series and redraw our chart
                chart.hideLoading();
                chart.addSeries(seriesValues, false);
                chart.addSeries(seriesPercentages, false);
                chart.redraw();
            });
        } else {

            // get stat data (json)
            $.getJSON('data2.php', function(aData) {

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
                chart.yAxis[0].axisTitle.attr({
                    text: 'Percentage'
                });

                // hide Loading
                chart.hideLoading();

                $.each(aData.series, function(idx, ser) {

                    // gather data (percentages) and prepare a new Series array
                    var seriesValData = [];
                    $.each(ser.values, function(idx, res) {
                        seriesValData.push([res.name, parseFloat(res.val)]);
                    });

                    var seriesValues = {
                        name: ser.name,
                        data: seriesValData,
                        type: 'column',
                    }
                    // and add the series into chart
                    chart.addSeries(seriesValues, false);
                });

                // add both series and redraw our chart
                chart.redraw();
            });
        }
    });
});
