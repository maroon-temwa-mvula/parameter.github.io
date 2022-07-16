


 function donutCHART(){

    var MorrisCharts = function() {};    
    //creates Donut chart
    MorrisCharts.prototype.createDonutChart = function(element, data, colors) {
        Morris.Donut({
            element: element,
            data: data,
            barSize: 0.1,
            resize: true, //defaulted to true
            colors: colors,
            backgroundColor: 'transparent'
        });
    },
    MorrisCharts.prototype.init = function() {

        //creating Stacked chart

        
        

        //creating donut chart
        var $donutData = [
            {label: "Total", value: 12},
            {label: "Uploads", value: 30},
            {label: "Pending", value: 0}
        ];
        var colors = ['#6559cc','#3bafda', '#f1556c'];
		var dataColors = $("#morris-donut-example").data('colors');
		if (dataColors) {
			colors = dataColors.split(",");
		}
        this.createDonutChart('morris-donut-example', $donutData, colors);
    },
    //init
    $.MorrisCharts = new MorrisCharts, $.MorrisCharts.Constructor = MorrisCharts


    $.MorrisCharts.init();
}