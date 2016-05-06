'use strict';
app.controller( 'LoginCtrl', [ 'ENV', '$scope', '$http', '$state', '$stateParams', '$ionicPopup', '$timeout', '$cordovaToast', '$cordovaFile', '$cordovaAppVersion', 'ApiService',
  function( ENV, $scope, $http, $state, $stateParams, $ionicPopup, $timeout, $cordovaToast, $cordovaFile, $cordovaAppVersion, ApiService ) {
    var alertPopup = null;
    var alertPopupTitle = '';
    $scope.logininfo = {
      strDriverId: ''
    };
    $scope.funcLogin = function( blnDemo ) {
      if ( blnDemo ) {
        ENV.mock = true;
      } else {
        ENV.mock = false;
      }
      if ( window.cordova && window.cordova.plugins.Keyboard ) {
        cordova.plugins.Keyboard.close();
      }
      $state.go( 'index.main', {}, {
        reload: true
      } );
      // if(ENV.mock){
      //     sessionStorage.clear();
      //     sessionStorage.setItem('strDriverId', $scope.logininfo.strDriverId);
      //     sessionStorage.setItem('strDriverName', 'Mr. Driver');
      //     $state.go('index.main', { }, { reload: true });
      // }else{
      //     if ($scope.logininfo.strDriverId === '') {
      //         alertPopupTitle = 'Please Enter Driver ID.';
      //         alertPopup = $ionicPopup.alert({
      //             title: alertPopupTitle,
      //             okType: 'button-assertive'
      //         });
      //         alertPopup.then(function(res) {
      //             console.log(alertPopupTitle);
      //         });
      //     }else{
      //         var jsonData = { 'PhoneNumber': $scope.logininfo.strPhoneNumber, 'CustomerCode': '', 'JobNo': '' };
      //         var strUri = '/api/event/login/check';
      //         ApiService.Get(strUri, true).then(function success(result){
      //             sessionStorage.clear();
      //             sessionStorage.setItem('strPhoneNumber', $scope.logininfo.strPhoneNumber);
      //             sessionStorage.setItem('strDriverName', result.data.results);
      //             sessionStorage.setItem('strCustomerCode', '');
      //             sessionStorage.setItem('strJobNo', '');
      //             sessionStorage.setItem('strRole', $scope.logininfo.strRole);
      //             $state.go('main', { 'blnForcedReturn': 'N' }, { reload: true });
      //         });
      //     }
      // }
    };

    $scope.goDriverCode = function() {
      $state.go( 'driverCodeCtrl', {}, {
        reload: true
      } );
    }
    $( '#iDriverId' ).on( 'keydown', function( e ) {
      if ( e.which === 9 || e.which === 13 ) {
        if ( alertPopup === null ) {
          $scope.funcLogin( false );
        } else {
          alertPopup.close();
          alertPopup = null;
        }
      }
    } );
} ] );
