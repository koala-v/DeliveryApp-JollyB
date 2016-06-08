'use strict';
app.controller('MainCtrl',
    ['$scope', '$state', '$ionicPopup',
    function ($scope, $state, $ionicPopup) {
        var alertPopup = null, strDriverName = sessionStorage.getItem('strDriverName');
        if (is.not.empty(strDriverName)) {
            $scope.strName = strDriverName;
        } else {
            $scope.strName = 'Driver';
        }
        var showPopup = function( title, type ) {
          if ( alertPopup != null ) {
            alertPopup.close();
            alertPopup = null;
          }
          alertPopup = $ionicPopup.alert( {
            title: title,
            okType: 'button-' + type
          } );
        };
        $scope.func_Dashboard = function() {
            showPopup('Stay Tuned','calm');
        };
        $scope.func_AJ = function() {
            $state.go('acceptJob', {}, {});
        };
        $scope.func_JL = function() {
            $state.go('jobListingList', {}, {});
        };
        $scope.func_DC = function() {
          
            $state.go('dailycompleted', {}, {});
        };
        $scope.func_Reports = function() {
            showPopup('Stay Tuned','calm');
        };
        $scope.func_Setting = function() {
            showPopup('Stay Tuned','calm');
        };
    }]);
