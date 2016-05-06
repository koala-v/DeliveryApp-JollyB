'use strict';
app.controller('JoblistingListCtrl', ['$scope', '$state', '$ionicLoading', '$ionicPopup', '$ionicFilterBar',
  function($scope, $state, $ionicLoading, $ionicPopup, $ionicFilterBar) {
    var filterBarInstance,
      dataResults = new Array();
    // $scope.Search = {
    //   BookingNo: ''
    // };
    $scope.returnMain = function() {
      $state.go('index.main', {}, {
        reload: true
      });
    };
    $('#txt-BookingNo').on('keydown', function(e) {
      if (e.which === 9 || e.which === 13) {
        getBookingNo();
      }
    });
    var getBookingNo = function() {
      if (dbTms) {
        dbTms.transaction(function(tx) {
          dbSql = 'select * from Tobk1_Accept';
          tx.executeSql(dbSql, [], function(tx, results) {
            if (results.rows.length > 0) {
              for (var i = 0; i < results.rows.length; i++) {
                var UomCode = is.undefined(results.rows.item(i).UOMCode) ? '' : results.rows.item(i).UOMCode;
                var jobs = [{
                  bookingno : results.rows.item(i).BookingNo,
                  action: 'Collect',
                  amt: results.rows.item(i).TotalPcs + ' ' + UomCode,
                   time: moment(results.rows.item(i).DeliveryEndDateTime).format('DD-MMM-YYYY'),
                  code: results.rows.item(i).CustomerCode,
                  customer: {
                    name: results.rows.item(i).CustomerName,
                    address: results.rows.item(i).ToAddress1 + results.rows.item(i).ToAddress2 + results.rows.item(i).ToAddress3 + results.rows.item(i).ToAddress4
                  },
                  status: {
                    inprocess: false,
                    success: true,
                    failed: false
                  }
                }]
                dataResults = dataResults.concat(jobs);
                $scope.jobs = dataResults;
                console.log(jobs);
              }
            }
          });
        }, dbError);
      }
    };
    getBookingNo();
    $scope.showFilterBar = function() {
      filterBarInstance = $ionicFilterBar.show({
        items: $scope.jobs,
        expression : function (filterText, value, index, array) {
          return value.bookingno.indexOf(filterText)>-1;
        },
        //filterProperties: ['bookingno'],
        update: function(filteredItems, filterText) {
          $scope.jobs = filteredItems;
          console.log(filteredItems + ' Obj');
          if (filterText) {
            console.log(filterText);
          }
        }
      });
    };

    $scope.refreshItems = function() {
      if (filterBarInstance) {
        filterBarInstance();
        filterBarInstance = null;
      }
      $timeout(function() {
        getBookingNo();
        $scope.$broadcast('scroll.refreshComplete');
      }, 1000);
    };

    $scope.gotoDetail = function(job) {
      $state.go('jobListingDetail', {}, {
        reload: true
      });
    };
  }
]);

app.controller('JoblistingCtrl', ['$scope', '$state', '$stateParams',
  function($scope, $state, $stateParams) {
    $scope.List = {
      BookingNo: $stateParams.BookingNo
    };
    if (dbTms) {
      dbTms.transaction(function(tx) {
        dbSql = 'select * from Tobk1_Accept';
        tx.executeSql(dbSql, [], function(tx, results) {
          if (results.rows.length > 0) {
            for (var i = 0; i < results.rows.length; i++) {
              if ($scope.List.BookingNo === results.rows.item(i).BookingNo) {
                var UomCode = is.undefined(results.rows.item(i).UOMCode) ? '' : results.rows.item(i).UOMCode;
                $scope.jobs = [{
                  action: 'Collect',
                  amt: results.rows.item(i).TotalPcs + ' ' + UomCode,
                  time: moment(results.rows.item(i).DeliveryEndDateTime).format('DD-MMM-YYYY'),
                  code: results.rows.item(i).CustomerCode,
                  customer: {
                    name: results.rows.item(i).CustomerName,
                    address: results.rows.item(i).ToAddress1 + results.rows.item(i).ToAddress2 + results.rows.item(i).ToAddress3 + results.rows.item(i).ToAddress4
                  },
                  status: {
                    inprocess: false,
                    success: true,
                    failed: false
                  }
                }]

              }
            }
          }
        });
      }, dbError);
    }



    // $scope.jobs = [{
    //   action: 'Collect',
    //   amt: '2 PKG',
    //   time: '09:00 - 12:00',
    //   code: 'PC 601234',
    //   customer: {
    //     name: 'John Tan',
    //     address: '150 Jurong East...'
    //   },
    //   status: {
    //     inprocess: false,
    //     success: true,
    //     failed: false
    //   }
    // }, {
    //   action: 'Deliver',
    //   amt: '1 PKG',
    //   time: '11:00 - 13:00',
    //   code: 'PC 603234',
    //   customer: {
    //     name: 'Kenny Wong',
    //     address: '32 Jurong East...'
    //   },
    //   status: {
    //     inprocess: true,
    //     success: false,
    //     failed: false
    //   }
    // }, {
    //   action: 'Collect',
    //   amt: '1 PKG',
    //   time: '12:30 - 15:00',
    //   code: 'PC 605061',
    //   customer: {
    //     name: 'Mary Lim',
    //     address: '50 Jurong East...'
    //   },
    //   status: {
    //     inprocess: false,
    //     success: false,
    //     failed: false
    //   }
    // }, {
    //   action: 'Collect',
    //   amt: '1 PKG',
    //   time: '14:00 - 16:00',
    //   code: 'PC 643456',
    //   customer: {
    //     name: 'Lim Soon Hock',
    //     address: '165 Jurong North...'
    //   },
    //   status: {
    //     inprocess: false,
    //     success: false,
    //     failed: true
    //   }
    // }];

    $scope.returnSearch = function() {
      $state.go('jobListing', {}, {
        reload: true
      });
    };
    $scope.gotoDetail = function(job) {
      $state.go('jobListingDetail', {}, {
        reload: true
      });
    };
  }
]);
app.controller('JoblistingDetailCtrl', ['$scope', '$state',
  function($scope, $state) {
    $scope.gotoConfirm = function() {
      $state.go('jobListingConfirm', {}, {
        reload: true
      });
    };
    $scope.returnList = function() {
      $state.go('jobListingList', {}, {
        reload: true
      });
    };
  }
]);
app.controller('JoblistingConfirmCtrl', ['$scope', '$state',
  function($scope, $state) {
    $scope.returnList = function() {
      $state.go('jobListingList', {}, {
        reload: true
      });
    };
    $scope.returnDetail = function() {
      $state.go('jobListingDetail', {}, {
        reload: true
      });
    };
    var canvas = document.getElementById('signatureCanvas');
    resizeCanvas();
    var signaturePad = new SignaturePad(canvas);
    //signaturePad.backgroundColor = "white";
    //signaturePad.minWidth = 2;
    //signaturePad.maxWidth = 4.5;
    $scope.clearCanvas = function() {
      $scope.signature = null;
      signaturePad.clear();
    }
    $scope.saveCanvas = function() {
      var sigImg = signaturePad.toDataURL();
      $scope.signature = sigImg;
    }

    function resizeCanvas() {
      var ratio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth - 50;
      canvas.height = window.innerHeight / 4 - 50;
    };
  }
]);
