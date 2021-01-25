(function () {
    var renderChart = function (renderTo, title, unit, data) {
        new Highcharts.Chart({
            chart: {
                type: 'bar',
                renderTo: renderTo,
                style: {
                    fontFamily: '"Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif'
                }
            },
            colors: [
                '#2f7ed8',
                '#0d233a',
                '#777777'
            ],
            title: {
                text: title
            },
            subtitle: {
                text: null
            },
            xAxis: {
                categories: ['Google', 'Nokia', 'Bing', 'Mapbox'],
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: unit,
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: unit ? ' (' + unit + ')' : ''
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: false
                    }
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'bottom',
                x: -10,
                y: -50,
                floating: true,
                borderWidth: 1,
                backgroundColor: '#FFF',
                shadow: false
            },
            credits: {
                enabled: false
            },
            series: [
                {
                    name: 'iPhone 5',
                    data: data.i5
                },
                {
                    name: 'iPhone 4s',
                    data: data.i4
                },
                {
                    name: 'Nexus 4',
                    data: data.n4
                }
            ]
        });
    };

    renderChart(dataTransferChart, 'Data transfer (less is better)', 'KB', {
        i5: [901.31, 411.06, 279.98, 151.28],
        i4: [717.09, 357, 252.03, 124.57],
        n4: [1249.28, 393.71, 290.33, 151.37]
    });

    renderChart(httpConnectionsChart, 'Number of HTTP connections (less is better)', false, {
        i5: [39, 18, 19, 11],
        i4: [35, 15, 17, 10],
        n4: [47, 17, 21, 11]
    });

    renderChart(duration, 'Load time (less is better)', 'Seconds', {
        i5: [7.34, 4.25, 5.95, 2.14],
        i4: [7.50, 4.61, 5.42, 3.83],
        n4: [9.70, 4.24, 4.82, 1.99]
    });

}());
