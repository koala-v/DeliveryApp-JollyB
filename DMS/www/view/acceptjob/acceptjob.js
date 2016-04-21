'use strict';
app.controller('AcceptJobCtrl',
    ['$scope','$state',
    function ($scope, $state) {
        $scope.Search = {
            BookingNo:''
        };
        $scope.returnMain = function() {
            $state.go('index.main', {}, {
                reload: true
            });
        };
        $scope.gotoList = function() {
            $state.go('acceptJobList', {}, {
                reload: true
            });
        };
    }]);

app.controller('AcceptJobListCtrl',
    ['$scope','$state',
    function ($scope, $state) {
        $scope.List = {
            BookingNo:''
        };
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
        $scope.returnSearch = function() {
            $state.go('acceptJob', {}, {
                reload: true
            });
        };
        $scope.save = function() {
            $state.go('index.main', {}, {
                reload: true
            });
        };
    }]);
