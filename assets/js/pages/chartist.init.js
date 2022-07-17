/*
Template Name: Minton - Admin & Dashboard Template
Author: CoderThemes
Website: https://coderthemes.com/
Contact: support@coderthemes.com
File: Chartist charts
*/

//smil-animations Chart





































//Overlapping bars on mobile

var data = {
    labels: ['Bvum', 'Chileka', 'ngabu', 'karonga', 'station', 'station', 'station', 'station', 'station', 'station', 'station', 'station'],
    series: [
        [25, 28, 30, 24, 34, 26, 20, 24, 28, 33, 26, 28],
        [19, 17, 19, 15, 17, 20, 14, 18, 22, 25, 19, 18]
    ]
};

var options = {
    seriesBarDistance: 10
};

var responsiveOptions = [
    ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
            labelInterpolationFnc: function (value) {
                return value[0];
            }
        }
    }]
];

new Chartist.Bar('#overlapping-bars', data, options, responsiveOptions);







