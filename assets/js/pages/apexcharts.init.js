
var key = "prize";
var request = $.ajax({
    url: "admin/servers/index.user.php",
    type: "POST",
    data: { key },
    dataType: "json"
});
request.done(function (data) {

    

    var x_values = [];
    var y_values = [];

    $.each(data, function (key, item) {
        if (key < 10) {
            console.log(item['likes'])
            // item['x_value'].push(x_values);
            y_values.push(item['artist_name']);
            x_values.push(item['likes']);
        }
    })

  


    var colors = ['#711228c7'];
    var dataColors = $("#apex-bar-1").data('colors');
    if (dataColors) {
        colors = dataColors.split(",");
    }
    var options = {
        chart: {
            height: 380,
            type: 'bar',
            toolbar: {
                show: true
            }
        },
        plotOptions: {
            bar: {
                horizontal: true,
            }
        },
        dataLabels: {
            enabled: true
        },
        series: [{
            data: x_values
        }],
        colors: colors,
        xaxis: {
            categories: y_values,
        },
        states: {
            hover: {
                filter: 'none'
            }
        },
        grid: {
            borderColor: '#f1f3fa'
        }
    }

    var chart = new ApexCharts(
        document.querySelector("#apex-bar-1"),
        options
    );

    chart.render();

})

