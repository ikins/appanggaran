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

    //var pin
    $scope.pin_satu = window.localStorage.getItem("pin_1");
    $scope.pin_dua = window.localStorage.getItem("pin_2");
    $scope.pin_tiga = window.localStorage.getItem("pin_3");
    $scope.pin_empat = window.localStorage.getItem("pin_4");
    $scope.pin_lima = window.localStorage.getItem("pin_5");
    $scope.pin_enam = window.localStorage.getItem("pin_6");

    var pin_satu = $scope.pin_satu;
    var pin_dua = $scope.pin_dua;
    var pin_tiga = $scope.pin_tiga;
    var pin_empat = $scope.pin_empat;
    var pin_lima = $scope.pin_lima;
    var pin_enam = $scope.pin_enam;

    //show simbol
    if(pin_satu == undefined){
      $scope.ShowSatu_0    = true;
      $scope.ShowSatu_1    = false;
    }else{
      $scope.ShowSatu_0    = false;
      $scope.ShowSatu_1    = true;
    }
    //

    if(pin_dua == undefined){
      $scope.ShowDua_0    = true;
      $scope.ShowDua_1    = false;
    }else{
      $scope.ShowDua_0    = false;
      $scope.ShowDua_1    = true;
    } 

    if(pin_tiga == undefined){
      $scope.ShowTiga_0    = true;
      $scope.ShowTiga_1    = false;
    }else{
      $scope.ShowTiga_0    = false;
      $scope.ShowTiga_1    = true;
    } 

    if(pin_empat == undefined){
      $scope.ShowEmpat_0    = true;
      $scope.ShowEmpat_1    = false;
    }else{
      $scope.ShowEmpat_0    = false;
      $scope.ShowEmpat_1    = true;
    }

    if(pin_lima == undefined){
      $scope.ShowLima_0    = true;
      $scope.ShowLima_1    = false;
    }else{
      $scope.ShowLima_0    = false;
      $scope.ShowLima_1    = true;
    }

    if(pin_enam == undefined){
      $scope.ShowEnam_0    = true;
      $scope.ShowEnam_1    = false;
    }else{
      $scope.ShowEnam_0    = false;
      $scope.ShowEnam_1    = true;
    }
    
  $scope.pin = function(n){

  //alert(n);

  if((n != "") || (n == 0)) {

    var pin_satu = $scope.pin_satu;
    var pin_dua = $scope.pin_dua;
    var pin_tiga = $scope.pin_tiga;
    var pin_empat = $scope.pin_empat;
    var pin_lima = $scope.pin_lima;
    var pin_enam = $scope.pin_enam;

    //Insert Pin 1
    if(pin_satu == undefined){

      window.localStorage.setItem("pin_1", n);
      pin_1 = window.localStorage.getItem("pin_1");

      //alert("Pin 1 "+pin_1);

      $scope.pin_satu = pin_1;

      $scope.ShowSatu_0    = false;
      $scope.ShowSatu_1    = true;

    // Insert Pin 2
    }else if((pin_satu != undefined) && (pin_dua == undefined)){

      window.localStorage.setItem("pin_2", n);
      pin_2 = window.localStorage.getItem("pin_2");

      $scope.pin_dua = pin_2;

      $scope.ShowDua_0    = false;
      $scope.ShowDua_1    = true;

    // Insert Pin 3
    }else if((pin_dua != undefined) && (pin_tiga == undefined)){

      window.localStorage.setItem("pin_3", n);
      pin_3 = window.localStorage.getItem("pin_3");

      $scope.pin_tiga = pin_3;

      $scope.ShowTiga_0    = false;
      $scope.ShowTiga_1    = true;

    // Insert Pin 4
    }else if((pin_tiga != undefined) && (pin_empat == undefined)){

      window.localStorage.setItem("pin_4", n);
      pin_4 = window.localStorage.getItem("pin_4");

      $scope.pin_empat = pin_4;

      $scope.ShowEmpat_0    = false;
      $scope.ShowEmpat_1    = true;

    // Insert Pin 5
    }else if((pin_empat != undefined) && (pin_lima == undefined)){

      window.localStorage.setItem("pin_5", n);
      pin_5 = window.localStorage.getItem("pin_5");

      $scope.pin_lima = pin_5;

      $scope.ShowLima_0    = false;
      $scope.ShowLima_1    = true;

    // Insert Pin 6
    }else if((pin_lima != undefined) && (pin_enam == undefined)){

      window.localStorage.setItem("pin_6", n);
      pin_6 = window.localStorage.getItem("pin_6");

      $scope.pin_enam = pin_6;

      $scope.ShowEnam_0    = false;
      $scope.ShowEnam_1    = true;

      //----------------------------------------------

      var satu  = $scope.pin_satu;
      var dua   = $scope.pin_dua;
      var tiga  = $scope.pin_tiga;
      var empat = $scope.pin_empat;
      var lima  = $scope.pin_lima;
      var enam  = $scope.pin_enam;


      var all_pin = satu + dua + tiga + empat + lima + enam;
      var real_pin = "123456";


      if( all_pin == real_pin){
        //alert('dashboard');

        window.localStorage.setItem("user_pin", all_pin);
        fn.load('dashboard.html');

        //remove pin
        window.localStorage.removeItem("pin_1");
        window.localStorage.removeItem("pin_2");
        window.localStorage.removeItem("pin_3");
        window.localStorage.removeItem("pin_4");
        window.localStorage.removeItem("pin_5");
        window.localStorage.removeItem("pin_6");

      }else{
                ons.notification.alert({
                  messageHTML: 'Pin Invalid',
                  title: 'Notifikasi',
                  buttonLabel: 'OK',
                  animation: 'default', // or 'none'
                  // modifier: 'optional-modifier'
                  callback: function() {
                    // Alert button is closed!
                  }
                });
      }
    }
  }

  }


  $scope.r_pin = function(){

    var pin_1 = $scope.pin_satu;
    var pin_2 = $scope.pin_dua;
    var pin_3 = $scope.pin_tiga;
    var pin_4 = $scope.pin_empat;
    var pin_5 = $scope.pin_lima;
    var pin_6 = $scope.pin_enam;

    if(pin_6 != undefined){
      window.localStorage.removeItem("pin_6");
      fn.load('pin-page.html');
    }else if((pin_6 == undefined) && (pin_5 != undefined)){
      window.localStorage.removeItem("pin_5");
      fn.load('pin-page.html');
    }else if((pin_5 == undefined) && (pin_4 != undefined)){
      window.localStorage.removeItem("pin_4");
      fn.load('pin-page.html');
    }else if((pin_4 == undefined) && (pin_3 != undefined)){
      window.localStorage.removeItem("pin_3");
      fn.load('pin-page.html');
    }else if((pin_3 == undefined) && (pin_2 != undefined)){
      window.localStorage.removeItem("pin_2");
      fn.load('pin-page.html');
    }else if((pin_2 == undefined) && (pin_1 != undefined)){
      window.localStorage.removeItem("pin_1");
      fn.load('pin-page.html');
    } 

    
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
      credits: {
            enabled: false
        },
      series: [{
          name: 'Brands',
          colorByPoint: true,
          data: [{
              name: 'Barang dan Jasa',
              y: 30,
              sliced: true,
              selected: true
          }, {
              name: 'Alutsista',
              y: 20
          }, {
              name: 'Pembangunan dan pengembangan fasilitas',
              y: 15
          }, {
              name: 'Kegiatan Prioritas',
              y: 10
          }, {
              name: 'Anggaran Perjenis Belanja',
              y: 15
          }, {
              name: 'Pembayaran Gaji',
              y: 5
          }, {
              name: 'Tunjangan Kinerja',
              y: 5
          }]
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
            text: ''
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

appang.controller('PagePenyerapanKegiatanPrioritas', ['$scope', '$http', function($scope, $http) {

}]);

appang.controller('PagePerkembanganPengadaanAlutsista', ['$scope', '$http', function($scope, $http) {

}]);

//12 Mei 2019

appang.controller('PageAnggaranPerkotama', ['$scope', '$http', function($scope, $http) {
  var year_current = (new Date()).getFullYear();

      var chartConfig = {

        chart: {
                renderTo: 'container',
                type: 'pie'
            },
            title: {
                text: ''
            },
            yAxis: {
                title: {
                    text: ''
                }
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: true,
                        distance: -20,
                        style: {
                            fontWeight: 'bold',
                            color: 'black'
                        }
                    },
                }
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Anggaran Perkotama',
                data: [["Kemhan",37],["Mabes TNI",26],["TNI AD",22],["TNI AU",8],["TNI AL",7]],
                size: '100%',
                innerSize: '60%',
                showInLegend:true,
                dataLabels: {
                    enabled: true
                }
            }]
    };

      Highcharts.setOptions({
      lang: {
        thousandsSep: ','
      }
    });

    $scope.chartConfig = chartConfig;
    $('#apChart').highcharts(chartConfig);


}]);


appang.controller('PagePenyerapanAnggaranPerkotama', ['$scope', '$http', function($scope, $http) {
  var year_current = (new Date()).getFullYear();

      var chartConfig = {

        chart: {
        type: 'column'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: [
                'Kemhan',
                'Mabes TNI',
                'TNI AD',
                'TNI AU',
                'TNI AL',
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Percent (%)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f}%</b></td></tr>',
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
            data: [37, 26, 22, 8, 7]

        }]
    };

      Highcharts.setOptions({
      lang: {
        thousandsSep: ','
      }
    });

    $scope.chartConfig = chartConfig;
    $('#papChart').highcharts(chartConfig);


}]);

appang.controller('PageAnggaranPerbulan', ['$scope', '$http', function($scope, $http) {
  var year_current = (new Date()).getFullYear();

      var chartConfig = {

        chart: {
                renderTo: 'container',
                type: 'pie'
            },
            title: {
                text: ''
            },
            yAxis: {
                title: {
                    text: ''
                }
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: true,
                        distance: -20,
                        style: {
                            fontWeight: 'bold',
                            color: 'black'
                        }
                    },
                }
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Anggaran Perkotama',
                data: [["Kemhan",37],["Mabes TNI",26],["TNI AD",22],["TNI AU",8],["TNI AL",7]],
                size: '100%',
                innerSize: '60%',
                showInLegend:true,
                dataLabels: {
                    enabled: true
                }
            }]
    };

      Highcharts.setOptions({
      lang: {
        thousandsSep: ','
      }
    });

    $scope.chartConfig = chartConfig;
    $('#apChart').highcharts(chartConfig);


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