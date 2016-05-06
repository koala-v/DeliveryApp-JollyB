'use strict';
app.controller('MainCtrl',
    ['ENV', '$scope', '$state', '$ionicPopup',
    function (ENV, $scope, $state, $ionicPopup) {
        var strDriverName = sessionStorage.getItem('strDriverName');
        if (strDriverName != null && strDriverName.length > 0) {
            $scope.strName = strDriverName;
        } else {
            $scope.strName = "Driver";
        }
        $scope.func_Dashboard = function() {
            $ionicPopup.alert( {
                title: 'Stay Tuned.',
                okType: 'button-calm'
            } );
        };
        $scope.func_AJ = function() {
            $state.go('acceptJob', {}, {
                reload: true
            });
        };
        $scope.func_JL = function() {
            $state.go('jobListingList', {}, {
                reload: true
            });
        };
        $scope.func_DC = function() {
            $ionicPopup.alert( {
                title: 'Stay Tuned.',
                okType: 'button-calm'
            } );
        };
        $scope.func_Reports = function() {
            $ionicPopup.alert( {
                title: 'Stay Tuned.',
                okType: 'button-calm'
            } );
        };
        $scope.func_Setting = function() {
            $ionicPopup.alert( {
                title: 'Stay Tuned.',
                okType: 'button-calm'
            } );
        };
    }]);
