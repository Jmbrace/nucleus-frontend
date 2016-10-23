(function () {
    angular
        .module('app')
        .controller('MemoryController', ['$http','$window',
            MemoryController
        ]);

    function MemoryController($http, $window) {
        var vm = this;
        var vols = vols || -1;
        var needHelp = needHelp || -1; 
        var total = total || 0;

        function init(){
            $http.get('https://nuclius-backend.herokuapp.com/ratio/users').success(function(response){
                console.log(response);
              var initit = needHelp < 0;
                vols = response.vols;
                needHelp = response.inneed;
                total = needHelp + vols;
                setUp();
            })
        }

        init();


      function setUp(){
        // TODO: move data to the service
        vm.memoryChartData = [ {key: 'Volunteers', y: vols/total}, { key: 'People In Need', y: needHelp/total} ];
        var title = 100*vols/total+'%';
        vm.chartOptions = {
            chart: {
                type: 'pieChart',
                height: 210,
                donut: true,
                pie: {
                    startAngle: function (d) { return d.startAngle/2 -Math.PI/2 },
                    endAngle: function (d) { return d.endAngle/2 -Math.PI/2 }
                },
                x: function (d) { return d.key; },
                y: function (d) { return d.y; },
                valueFormat: (d3.format(".0f")),
                color: ['rgb(0, 150, 136)', 'rgb(191, 191, 191)'],
                showLabels: false,
                showLegend: false,
                tooltips: false,
                title: title,
                titleOffset: -10,
                margin: { bottom: -80, left: -20, right: -20 }
            }
        };
      }
    }
})();
