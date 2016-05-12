'use strict';
app.controller('LoginCtrl', ['ENV', '$scope', '$http', '$state', '$stateParams', '$ionicPopup', '$timeout', '$cordovaToast', '$cordovaFile', '$cordovaAppVersion', 'ApiService',
  function(ENV, $scope, $http, $state, $stateParams, $ionicPopup, $timeout, $cordovaToast, $cordovaFile, $cordovaAppVersion, ApiService) {
    var alertPopup = null;
    var alertPopupTitle = '';
    $scope.logininfo = {
      strDriverId: ''
    };
    $scope.funcLogin = function(blnDemo) {
      if (blnDemo) {
        ENV.mock = true;
      } else {
        ENV.mock = false;
      }
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.close();
      }
      if (ENV.mock) {
        sessionStorage.clear();
        sessionStorage.setItem('strDriverId', $scope.logininfo.strDriverId);
        // sessionStorage.setItem('strDriverName', 'Mr. Driver');
        $state.go('index.main', {}, {
          reload: true
        });
      } else {
        if ($scope.logininfo.strDriverId === '') {
          alertPopupTitle = 'Please Enter Driver ID.';
          alertPopup = $ionicPopup.alert({
            title: alertPopupTitle,
            okType: 'button-assertive'
          });
          alertPopup.then(function(res) {
            console.log(alertPopupTitle);
          });
        } else {
          var strUri = '/api/tms/login/check?ContactNo=' + $scope.logininfo.strDriverId;
          console.log(strUri);
          ApiService.GetParam(strUri, true).then(function success(result) {
            var results = result.data.results;
            if (is.not.undefined(results)) {
              sessionStorage.clear();
              sessionStorage.setItem('strDriverId', $scope.logininfo.strDriverId);
              sessionStorage.setItem('strDriverCode', results[0].DriverCode);
              sessionStorage.setItem('strDriverName', results[0].DriverName);
              $state.go('index.main', {}, {
                reload: true
              });
            }
          });
        }
      }
    };

    $scope.goDriverCode = function() {
      $state.go('driverCodeCtrl', {}, {
        reload: true
      });
    }
    $('#iDriverId').on('keydown', function(e) {
      if (e.which === 9 || e.which === 13) {
        if (alertPopup === null) {
          $scope.funcLogin(false);
        } else {
          alertPopup.close();
          alertPopup = null;
        }
      }
    });
  }
]);
