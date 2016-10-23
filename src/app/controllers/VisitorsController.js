(function () {
    angular
        .module('app')
        .controller('VisitorsController', ['$http','$window',
            VisitorsController
        ]);

    function VisitorsController($http, $window) {
        var vm = this;
        var numServed = numServed || -1;
        var numNotServed = numNotServed || -1;
        var total = total || 0;
        function init(){
          $http.get('https://nuclius-backend.herokuapp.com/ratio/services').success(function(response){
              console.log(response);
              
              numServed = response.numServed;
              numNotServed = response.numNotServed;
              total = numServed + numNotServed;
                setUp();
          });

        }

        init();


        function setUp(){
                    // TODO: move data to the service
        vm.visitorsChartData = [ {key: 'Being Served', y: numServed}, { key: 'Needs Service', y: numNotServed} ];

        vm.chartOptions = {
            chart: {
                type: 'pieChart',
                height: 210,
                donut: true,
                x: function (d) { return d.key; },
                y: function (d) { return d.y; },
                valueFormat: (d3.format(".0f")),
                color: ['rgb(0, 150, 136)', '#E75753'],
                showLabels: false,
                showLegend: false,
                margin: { top: -10 }
            }
        };
        }

    }
})();
