'use strict';
app.controller('dailycompletedCtrl', ['ENV', '$scope', '$state', '$ionicPopup', '$cordovaKeyboard', '$cordovaBarcodeScanner', 'ACCEPTJOB_ORM', 'ApiService', '$cordovaSQLite', '$ionicPlatform', 'ionicDatePicker', 'SqlService',
    function (ENV, $scope, $state, $ionicPopup, $cordovaKeyboard, $cordovaBarcodeScanner, ACCEPTJOB_ORM, ApiService, $cordovaSQLite, $ionicPlatform, ionicDatePicker, SqlService) {
        var dataResults = new Array();
        $scope.Csbk1s = [];
        $scope.Detail = {
            Packages: 0,
        };
        $scope.Search = {
            CompletedDate: moment(new Date()).format('YYYYMMDD'),
        };

        var ShowDailyCompleted = function () {
            $ionicPlatform.ready(function () {
                SqlService.Select('Csbk2 left join Csbk1 on Csbk2.TrxNo = Csbk1.TrxNo', '*', "DriverId='" + sessionStorage.getItem("strDriverId") + "' and CompletedDate='" + $scope.Search.CompletedDate + "' ").then(function (results) {
                    $scope.Csbk1s = new Array();
                    if (results.rows.length > 0) {
                        var jobs = '';
                        for (var i = 0; i < results.rows.length; i++) {
                            var Csbk1_acc = results.rows.item(i);
                            jobs = {
                                bookingno: Csbk1_acc.BookingNo,
                                JobNo: Csbk1_acc.JobNo,
                                CollectedAmt: Csbk1_acc.CollectedAmt,
                                TotalBoxes: Csbk1_acc.CollectedPcs
                            };
                            $scope.Csbk1s.push(jobs);
                        }
                    }
                });
            });
        };
        $scope.returnMain = function () {
            $state.go('index.main', {}, {
                reload: true
            });
        };
        $scope.OnDatePicker = function () {
            var ipObj1 = {
                callback: function (val) { //Mandatory
                    // console.log('Return value from the datepicker popup is : ' + val, new Date(val));
                    $scope.Search.CompletedDate = moment(new Date(val)).format('YYYYMMDD');
                    ShowDailyCompleted();
                },
                to: new Date(),
            };
            ionicDatePicker.openDatePicker(ipObj1);
        };
        ShowDailyCompleted();
        $scope.WifiConfirm = function () {
            // ========
            SqlService.Select('TemCsbk1', '*').then(
                function (results) {
                    if (results.rows.length > 0) {
                        for (var i = 0; i < results.rows.length; i++) {
                            var objTemCsbk1 = results.rows.item(i);
                            var objUri = ApiService.Uri(true, '/api/tms/csbk1/confirm');
                            objUri.addSearch('BookingNo', objTemCsbk1.BookingNo);
                            objUri.addSearch('JobNo', objTemCsbk1.JobNo);
                            objUri.addSearch('CashAmt', objTemCsbk1.CashAmt);
                            objUri.addSearch('UpdateBy', sessionStorage.getItem("strDriverId").toString());
                            objUri.addSearch('CollectBy', objTemCsbk1.VehicleNo);
                            objUri.addSearch('Amount', objTemCsbk1.Amount);
                            objUri.addSearch('ActualCollectionDate', objTemCsbk1.ScanDate);
                            ApiService.Get(objUri, true).then(function success(result) {
                                //In the insert slcr1 logic updated paidAmt

                                // var objUri = ApiService.Uri(true, '/api/tms/csbk2').addSearch('BookingNo', $scope.Detail.BookingNo);
                                // ApiService.Get(objUri, true).then(function success(result) {
                                //     var results = result.data.results;
                                //     if (is.not.empty(results)) {
                                //         $scope.Detail.csbk1 = results.csbk1;
                                //         var CsbkDetail = {
                                //             PaidAmt: $scope.Detail.csbk1.PaidAmt,
                                //         };
                                //         SqlService.Update('CsbkDetail', CsbkDetail, Csbk1Filter).then(function (res) {});
                                //     }
                                // });

                                //In the insert slcr1 logic updated paidAmt
                            });
                            var jsonData = {
                                'Base64': 'data:image/png;base64,'+objTemCsbk1.Base64,
                                'FileName': 'signature.Png'
                            };
                            if (objTemCsbk1.signature !== null) {
                                var objUri = ApiService.Uri(true, '/api/tms/upload/img').addSearch('BookingNo', objTemCsbk1.BookingNo);
                                ApiService.Post(objUri, jsonData, true).then(function success(result) {});
                            }
                        }
                    } else {}
                },
                function (error) {}
            );
            // ====
            SqlService.Select('Csbk2', '*').then(
                function (results) {
                    if (results.rows.length > 0) {
                        for (var intI = 0; intI < results.rows.length; intI++) {
                            var objCsbk2 = results.rows.item(intI);
                            var objUri = ApiService.Uri(true, '/api/tms/csbk2/update');
                            objUri.addSearch('CollectedPcs', objCsbk2.CollectedPcs);
                            objUri.addSearch('AddQty', objCsbk2.AddQty);
                            objUri.addSearch('TrxNo', objCsbk2.TrxNo);
                            objUri.addSearch('LineItemNo', objCsbk2.LineItemNo);
                            ApiService.Get(objUri, false).then(function success(result) {});
                        }

                    } else {}
                },
                function (error) {}
            );
        };
    }
]);
