'use strict';
app.controller('JoblistingCtrl',
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
            $state.go('jobListingList', {}, {
                reload: true
            });
        };
    }]);

app.controller('JoblistingListCtrl',
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
                },
                status : {
                    inprocess : false,
                    success : true,
                    failed : false
                }
            },
            {
                action : 'Deliver',
                amt : '1 PKG',
                time : '11:00 - 13:00',
                code : 'PC 603234',
                customer : {
                    name : 'Kenny Wong',
                    address : '32 Jurong East...'
                },
                status : {
                    inprocess : true,
                    success : false,
                    failed : false
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
                },
                status : {
                    inprocess : false,
                    success : false,
                    failed : false
                }
            },
            {
                action : 'Collect',
                amt : '1 PKG',
                time : '14:00 - 16:00',
                code : 'PC 643456',
                customer : {
                    name : 'Lim Soon Hock',
                    address : '165 Jurong North...'
                },
                status : {
                    inprocess : false,
                    success : false,
                    failed : true
                }
            }
        ];
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
    }]);
app.controller('JoblistingDetailCtrl',
    ['$scope','$state',
    function ($scope, $state) {
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
    }]);
app.controller('JoblistingConfirmCtrl',
    ['$scope','$state',
    function ($scope, $state) {
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
        var canvas = document.getElementById( 'signatureCanvas' );
        resizeCanvas();
        var signaturePad = new SignaturePad( canvas );
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
    }]);
