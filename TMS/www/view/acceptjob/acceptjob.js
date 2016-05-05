'use strict';
app.controller('AcceptJobCtrl', ['$scope', '$state', '$ionicPopup', '$cordovaKeyboard', '$cordovaBarcodeScanner', 'ApiService',
  function($scope, $state, $ionicPopup, $cordovaKeyboard, $cordovaBarcodeScanner, ApiService) {
    var alertPopup = null,
      dataResults = new Array();
    $scope.Search = {
      BookingNo: ''
    };
    /*
    $scope.jobs = [
        {
            action : 'Collect',
            amt : '2 PKG',
            time : '09:00 - 12:00',
            code : 'PC 601234',
            customer : {
                name : 'John Tan',
                address : '150 Jurong East...'
            }
        },
        {
            action : 'Deliver',
            amt : '1 PKG',
            time : '11:00 - 13:00',
            code : 'PC 603234',
            customer : {
                name : 'John Tan',
                address : '32 Jurong East...'
            }
        },
        {
            action : 'Collect',
            amt : '1 PKG',
            time : '12:30 - 15:00',
            code : 'PC 605061',
            customer : {
                name : 'Mary Lim',
                address : '50 Jurong East...'
            }
        },
        {
            action : 'Collect',
            amt : '1 PKG',
            time : '14:00 - 16:00',
            code : 'PC 643456',
            customer : {
                name : 'John Tan',
                address : '165 Jurong North...'
            }
        }
    ];
    */
    var showPopup = function(title, type) {
      if (alertPopup === null) {
        alertPopup = $ionicPopup.alert({
          title: title,
          okType: 'button-' + type
        });
      } else {
        alertPopup.close();
        alertPopup = null;
      }
    };
    var showTobk = function(bookingNo) {
      if (is.not.empty(bookingNo)) {
        var strUri = '/api/tms/tobk1?BookingNo=' + bookingNo;
        ApiService.GetParam(strUri, true).then(function success(result) {
          var results = result.data.results;
          var UomCode = is.undefined(results[0].UOMCode) ? '' : results[0].UOMCode;
          var tobk1 = {
            action: 'Collect',
            amt: results[0].TotalPcs + ' ' + UomCode,
            time: moment(results[0].DeliveryEndDateTime).format('DD-MMM-YYYY'),
            code: ' ',
            customer: {
              name: results[0].CustomerName,
              address: results[0].ToAddress1 + results[0].ToAddress2 + results[0].ToAddress3 + results[0].ToAddress4
            }
          };

          if (results.length > 0) {
            for (var i = 0; i < results.length; i++) {
              db_add_Tobk1_Accept(results[i]);
            }
          }
          dataResults = dataResults.concat(tobk1);
          $scope.jobs = dataResults;
          $scope.Search.BookingNo = "";
          //  $scope.$apply();
          $('#div-list').focus();
        });
      } else {
        showPopup('Wrong Booking No', 'assertive');
      }
    };
    $scope.returnMain = function() {
      $state.go('index.main', {}, {
        reload: true
      });
    };
    $scope.save = function() {
      $state.go('index.main', {}, {
          reload: true
      });

    };
    $scope.openCam = function() {

      $switchcordovaBarcodeScanner.scan().then( function( imageData ) {
          $scope.Search.BookingNo = imageData.text;
          showTobk( $scope.Search.BookingNo );
      }, function( error ) {
          $cordovaToast.showShortBottom( error );
      } );
    };
    $scope.clearInput = function() {
      if (is.not.empty($scope.Search.BookingNo)) {
        $scope.Search.BookingNo = '';
        $('#txt-bookingno').select();
      }
    };
    $('#txt-bookingno').on('keydown', function(e) {
      if (e.which === 9 || e.which === 13) {
        if (window.cordova) {
          $cordovaKeyboard.close();
        }
        if (alertPopup === null) {
          showTobk($scope.Search.BookingNo);
        } else {
          alertPopup.close();
          alertPopup = null;
        }
      }
    });
  }
]);
