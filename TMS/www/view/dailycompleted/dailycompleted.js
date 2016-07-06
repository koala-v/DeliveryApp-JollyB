'use strict';
app.controller('dailycompletedCtrl', ['ENV', '$scope', '$state', '$ionicPopup', '$cordovaKeyboard', '$cordovaBarcodeScanner', 'ACCEPTJOB_ORM', 'ApiService', '$cordovaSQLite', '$ionicPlatform', 'ionicDatePicker',
  function(ENV, $scope, $state, $ionicPopup, $cordovaKeyboard, $cordovaBarcodeScanner, ACCEPTJOB_ORM, ApiService, $cordovaSQLite, $ionicPlatform, ionicDatePicker) {
    var alertPopup = null,
      dataResults = new Array();
    $scope.Search = {
      CompletedDate: '',
      allCompletedDates: []
    };
     $scope.Csbk1s = [];
     $scope.Search.CompletedDate = moment(new Date()).format('YYYYMMDD');
    var ShowDailyCompleted = function() {
      $ionicPlatform.ready(function() {
        if (!ENV.fromWeb) {
          $cordovaSQLite.execute(db, "SELECT * FROM Csbk1  where  DriverId='" + sessionStorage.getItem("strDriverId") + "' and CompletedDate='" + $scope.Search.CompletedDate + "' ")
            .then(
              function(results) {
                  $scope.Csbk1s= new Array();
                if (results.rows.length > 0) {
                  var jobs = '';
                  for (var i = 0; i < results.rows.length; i++) {
                    var Csbk1_acc = results.rows.item(i);
                    jobs = {
                      bookingno: Csbk1_acc.BookingNo,
                      JobNo: Csbk1_acc.JobNo,
                      CollectedAmt: Csbk1_acc.CollectedAmt
                    };
                    $scope.Csbk1s.push(jobs);
                  }
                  if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.close();
                  }
                } else {}
              },
              function(error) {}
            );
        } else {}
      });
    };
    ShowDailyCompleted();
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
    var showList = function() {};
    $scope.returnMain = function() {
      $state.go('index.main', {}, {
        reload: true
      });
    };
    $scope.save = function() {};
    $scope.clear = function() {};
    var ipObj1 = {
      callback: function(val) { //Mandatory
        // console.log('Return value from the datepicker popup is : ' + val, new Date(val));
        $scope.Search.CompletedDate = moment(new Date(val)).format('YYYYMMDD');
ShowDailyCompleted();
      }
    };
    $scope.OnDatePicker = function() {
      ionicDatePicker.openDatePicker(ipObj1);

  };




    $('#idCompletedDate').on('keydown', function(e) {
      if (e.which === 9 || e.which === 13) {
        if (window.cordova) {
          $cordovaKeyboard.close();

        }
        if (alertPopup === null) {} else {
          alertPopup.close();
          alertPopup = null;
        }
      }
    });
    showList();
  }
]);
