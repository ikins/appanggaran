/*
** PingSmart Siswa
** Bandung 1 Jan 2019
*/

var appang =  angular.module('app', ['onsen','ipCookie','highcharts-ng','ngRoute','angular-md5','angular-loading-bar','ngSanitize']);


//server
//var _URL        = "";
//var BASE_URL        = "";

//local
var _URL        = "http://localhost:8080/project/menhan/web/webanggaran/api";
var BASE_URL        = "http://localhost:8080/project/menhan/web/webanggaran/";


var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        //var Permission = window.plugins.Permission;
    },
    receivedEvent: function(id) {

        user_id  = window.localStorage.getItem("user_id");
        user_pin = window.localStorage.getItem("user_pin");

            if (user_id == '' || user_id == null) {
                fn.load('landing-page.html');
                return false;
            }else {

              if(user_pin == '' || user_pin == null){
                fn.load('pin-page.html');
              }else{
                fn.load('dashboard.html');
                return false;
              }

            }
    }
};

//config loading bar
appang.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.latencyThreshold = 400;
    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.includeBar = true;
  }]);

appang.controller('getCurrentInfoWeek', ['$scope', '$http','ipCookie', function($scope, $http,ipCookie) {

    //Data Msg
    $scope.data = {
           msg: ''
    };

    //Date 
    $scope.date = new Date();

    $scope.logout = function(){
        window.localStorage.removeItem("user_id");
        window.localStorage.removeItem("user_pin");
        fn.load('landing-page.html');
    };

    $scope.refresh = function(){
        fn.load('dashboard.html');
    };

}]);

appang.controller('PagePin', ['$scope', '$http','ipCookie', 'md5', function($scope, $http, ipCookie, md5) {

  $scope.pin = function(){


    function pin_action() {

      var user_pin = $scope.user_pin;

          //example
          if(user_pin != '' || user_pin != null){
            window.localStorage.setItem("user_pin", user_pin);
            fn.load('dashboard.html');
          }else{

            ons.notification.alert({
                messageHTML: 'Email dan password yang anda kirimkan salah.',
                title: 'Notifikasi',
                buttonLabel: 'OK',
                animation: 'default',
                callback: function() {
                  // Alert button is closed!
                }
            });
            return false;

          }

    }


    if ( $scope.user_pin == undefined ) {
                ons.notification.alert({
                  messageHTML: 'Pin Harus Dimasukan',
                  title: 'Notifikasi',
                  buttonLabel: 'OK',
                  animation: 'default', // or 'none'
                  // modifier: 'optional-modifier'
                  callback: function() {
                    // Alert button is closed!
                  }
                });
                
                return false;
            }

    pin_action();

  }


  //number only

}]);

appang.controller('PageController', ['$scope', '$http','ipCookie', 'md5', function($scope, $http, ipCookie, md5) {


    $scope.login = function(){

        function login_action() {
        
        //var device_id = device.uuid;
        var device_id = '12345678';

        var email = $scope.email;
        var password = $scope.password;


             /*$http.get( _URL+"auth?user=" + email + "&pass=" + password)
             .success(function (response) {
                 if (response.response_code == 1) {

                    window.localStorage.setItem("user_id", response.data[0].user_id);

                 } else if (response.response_code != 1) {
                    ons.notification.alert({
                      messageHTML: 'Email dan password yang anda kirimkan salah.',
                      title: 'Notifikasi',
                      buttonLabel: 'OK',
                      animation: 'default',
                      callback: function() {
                        // Alert button is closed!
                      }
                    });
                    return false;
                 }
             });*/

          //example
          if(email != '' || email != null || password != '' || password != null){
            window.localStorage.setItem("user_id", email);
            fn.load('pin-page.html');
          }else{

            ons.notification.alert({
                messageHTML: 'Email dan password yang anda kirimkan salah.',
                title: 'Notifikasi',
                buttonLabel: 'OK',
                animation: 'default',
                callback: function() {
                  // Alert button is closed!
                }
            });
            return false;

          }

        }


        if ( $scope.email == undefined ) {
                ons.notification.alert({
                  messageHTML: 'Email Harus Diisi',
                  title: 'Notifikasi',
                  buttonLabel: 'OK',
                  animation: 'default', // or 'none'
                  // modifier: 'optional-modifier'
                  callback: function() {
                    // Alert button is closed!
                  }
                });
                
                return false;
            }

        if ( $scope.password == undefined ) {
                ons.notification.alert({
                  messageHTML: 'Password Harus Diisi',
                  title: 'Notifikasi',
                  buttonLabel: 'OK',
                  animation: 'default', // or 'none'
                  // modifier: 'optional-modifier'
                  callback: function() {
                    // Alert button is closed!
                  }
                });
                
                return false;
            }


        login_action();


    };


}]);

appang.controller('PageDashboard', ['$scope', '$http', function($scope, $http) {

    user_id = window.localStorage.getItem("user_id");

      /*var request = $http.get( _URL+"penyerapan-anggaran/" + user_id)
        .success(function (response) {
             
             $scope.graph = response;

             return response;

        });



    request.then(function (data) {
        
      var nrencana    = $scope.graph.nilai_rencana
      var nrealisasi  = $scope.graph.nilai_realisasi

      var data = [{
                    name: 'Total Anggaran',
                    y: nrencana,
                    color: '#E94B3B'
                }, {
                    name: 'Penyerapan Anggaran',
                    y: nrealisasi,
                    color: '#F8C471',
                    sliced: true,
                    selected: true
                }];
    
    $scope.pieChart = {
                        options: {
                            chart: {
                                type: 'pie',                               
                                backgroundColor: 'rgba(126, 181, 232, 1)',
                                polar: true

                            },
                            title: {
                                text: ''
                            },
                            plotOptions: {
                                pie: {
                                    dataLabels: {
                                        enabled: false
                                    },
                                    showInLegend: true
                                }
                            }
                        },
                        credits: {
                          enabled: false
                        },
                        series: [{ 
                           name: 'Monitoring Anggaran',
                           colorByPoint: true,      
                           data: data
                        }],

                        loading: false
            };

    });*/

      var nrencana    = 107.7;
      var nrealisasi  = 48.5;

      var data = [{
                    name: 'Total Anggaran',
                    y: nrencana,
                    color: '#d38406'
                }, {
                    name: 'Penyerapan Anggaran',
                    y: nrealisasi,
                    color: '#0073b7',
                    sliced: true,
                    selected: true
                }];
    
    $scope.pieChart = {
                        options: {
                            chart: {
                                type: 'pie',                               
                                backgroundColor: '#ffffff',
                                polar: true

                            },
                            title: {
                                text: ''
                            },
                            plotOptions: {
                                pie: {
                                    dataLabels: {
                                        enabled: false
                                    },
                                    showInLegend: true
                                }
                            }
                        },
                        credits: {
                          enabled: false
                        },
                        series: [{ 
                           name: 'Monitoring Anggaran',
                           colorByPoint: true,      
                           data: data
                        }],

                        loading: false
            };


}]);


appang.controller('PagePenyerapanPerjenisAnggaran', ['$scope', '$http', function($scope, $http) {

      var year_current = (new Date()).getFullYear();

      var chartConfig = {

        chart: { 
              type: 'column',
          backgroundColor:'#ffffff'
            },
        colors: ['#06693c','#f47a27','#4284c1'],
            title: {
                text: "Penyerapan Perjenis Anggaran <br>"+year_current,
          style: { color:'#333' }
            },
            subtitle: 
            {
                text: ' ' 
            },
            xAxis: {
                categories: [''],
                gridLineWidth: 1,
                gridLineDashStyle: 'dot',
                labels: {
                  rotation  : -70, 
                  align : 'right',
            style: { color:'#333' }
                }
            },
            yAxis: {
                min: 0, 
                title: {
                    text: "Anggaran Program <br>"+year_current ,
            style: { color:'#333' }
                },
                stackLabels: {
                    //enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                    }
                }
            },
        exporting: { enabled : false },
            legend: {
                align: 'center',
                // x: -20,
                verticalAlign: 'bottom',
                // y: 10,
                floating: false,
                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || '#f4f4f4',
                borderColor: '#333',
                borderWidth: 1,
                shadow: false,
                layout: 'horizontal',
          itemStyle : { color:'#333' }
            },
            tooltip: { 
                formatter: function() {
                    return '<b>'+ this.x +'</b>'+
                        this.series.name +':  '+ Highcharts.numberFormat(this.y,0)
                        // +'<br/>'+
                        // 'Total: '+ this.point.stackTotal;
                }
            },
            plotOptions: {
                column: {
                    stacking: '',
                    dataLabels: {
                        enabled: true,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || '#333333'
                    }
                }
            },
            credits: {
                enabled: false
            },
        series: [{
                    name: 'Barang dan Jasa',
                    data: [100]

                }, {
                    name: 'Pembayaran Gaji',
                    data: [90]

                }, {
                    name: 'Kegiatan Prioritas',
                    data: [80]

                } ]

    };

      Highcharts.setOptions({
      lang: {
        thousandsSep: ','
      }
    });

    $scope.chartConfig = chartConfig;
    $('#ppaChart').highcharts(chartConfig);


}]);

appang.controller('PagePendapatanNegara', ['$scope', '$http', function($scope, $http) {

}]);

appang.controller('PagePenyerapanAnggaranPersatuanKerja', ['$scope', '$http', function($scope, $http) {

      var year_current = (new Date()).getFullYear();

      var chartConfig = {

        chart: {
        type: 'bar'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: ['Satuan Kerja I', 'Satuan Kerja II'],
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: '',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ' millions'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            },column: {
              colorByPoint: true
          }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: [{
          showInLegend: false,
            name: 'Year 2019',
            data: [107,90]
        }]

    };

      Highcharts.setOptions({
      lang: {
        thousandsSep: ','
      }
    });

    $scope.chartConfig = chartConfig;
    $('#ppaChart').highcharts(chartConfig);


}]); 

appang.controller('PagePenyerapanAnggaranPerbulan', ['$scope', '$http', function($scope, $http) {

      var year_current = (new Date()).getFullYear();

      var chartConfig = {

        chart: {
        type: 'line'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            title: {
                text: 'Nominal Anggaran'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Satuan Kerja I',
            data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }, {
            name: 'Satuan Kerja II',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        }]
    };

      Highcharts.setOptions({
      lang: {
        thousandsSep: ','
      }
    });

    $scope.chartConfig = chartConfig;
    $('#papbChart').highcharts(chartConfig);


}]);


appang.controller('Page10SatuanKerja', ['$scope', '$http', function($scope, $http) {

      var year_current = (new Date()).getFullYear();

      var chartConfig = {

        chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
        },
        title: {
            text: ''
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    distance: -30
                },
                allowPointSelect: true,
                cursor: 'pointer',
                showInLegend: true
            }
        },
        credits: {
          enabled: false
        },
        colors: ['#d38406', '#0073b7', '#00a65a', '#ba2727', '#61115b', '#0aad07', '#e70099', '#e73a0c', '#98iu87', '#839715'],
        series: [{
            name: 'Anggaran',
            colorByPoint: true,
            data: [{
                name: 'Satuan Kerja I',
                y: 107,
                sliced: true,
                selected: true
            }, {
                name: 'Satuan Kerja II',
                y: 100.9
            },{
                name: 'Satuan Kerja III',
                y: 89.5
            },{
                name: 'Satuan Kerja IV',
                y: 59.1
            },{
                name: 'Satuan Kerja V',
                y: 78.3
            },{
                name: 'Satuan Kerja VI',
                y: 45
            },{
                name: 'Satuan Kerja VII',
                y: 140
            },{
                name: 'Satuan Kerja VIII',
                y: 210
            },{
                name: 'Satuan Kerja IX',
                y: 80
            },{
                name: 'Satuan Kerja X',
                y: 68
            },]
        }]
    };

      Highcharts.setOptions({
      lang: {
        thousandsSep: ','
      }
    });

    $scope.chartConfig = chartConfig;
    $('#10SatuanChart').highcharts(chartConfig);


}]);

appang.controller('PagePenyerapanAnggaran5TahunTerakhir', ['$scope', '$http', function($scope, $http) {

      var year_current = (new Date()).getFullYear();

      var chartConfig = {

        chart: {
        type: 'column'
        },
        title: {
            text: 'Penyerapan Anggaran 5 Tahun Terakhir'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: [
                '2015',
                '2016',
                '2017',
                '2018',
                '2019',
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Rupiah (Rp)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },    
        credits: {
            enabled: false
        },
        series: [{
          showInLegend: false,
            name: '2019',
            data: [49.9, 71.5, 106.4, 129.2, 144.0]

        }]
    };

      Highcharts.setOptions({
      lang: {
        thousandsSep: ','
      }
    });

    $scope.chartConfig = chartConfig;
    $('#5TahunChart').highcharts(chartConfig);


}]);


//--------------------------------------------------------------------LINK------------------------------------------

window.fn = {};

window.fn.open = function() {
  var menu = document.getElementById('menu');
  menu.open();
};

window.fn.load = function(page, anim) {
  var content = document.getElementById('content');
  var menu = document.getElementById('menu');
  content.load(page)
    .then(menu.close.bind(menu));
};

app.initialize();