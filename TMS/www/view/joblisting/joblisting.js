'use strict';
app.controller('JoblistingListCtrl', ['ENV', '$scope', '$state', '$ionicLoading', '$ionicPopup', '$ionicFilterBar', '$ionicActionSheet', 'ApiService', '$ionicPlatform', '$cordovaSQLite',
  function(ENV, $scope, $state, $ionicLoading, $ionicPopup, $ionicFilterBar, $ionicActionSheet, ApiService, $ionicPlatform, $cordovaSQLite) {
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
    var getBookingNo = function() {

      $ionicPlatform.ready(function() {
        if (!ENV.fromWeb) {
          $cordovaSQLite.execute(db, 'SELECT * FROM Csbk1 ORDER BY TrxNo DESC')
            .then(
              function(results) {
                if (results.rows.length > 0) {
                  for (var i = 0; i < results.rows.length; i++) {
                    var Csbk1_acc = results.rows.item(i);
                    var reuturnTime = '';
                    if (is.equal(Csbk1_acc.CollectionTimeStart, '') && is.equal(Csbk1_acc.CollectionTimeEnd, '')) {
                      reuturnTime = Csbk1_acc.ColTimeFrom + '-' + Csbk1_acc.ColTimeTo;
                    } else {
                      reuturnTime = Csbk1_acc.CollectionTimeStart + '-' + Csbk1_acc.CollectionTimeEnd;
                    }
                    var DLVReturntime = '';
                    if (is.equal(Csbk1_acc.TimeFrom, '') && is.equal(Csbk1_acc.TimeFrom, '')) {
                      DLVReturntime = '';
                    } else {
                      DLVReturntime = Csbk1_acc.TimeFrom + '-' + Csbk1_acc.TimeTo;
                    }
                    var jobs = [{
                      bookingno: Csbk1_acc.BookingNo,
                      JobNo: Csbk1_acc.JobNo,
                      action: is.equal(Csbk1_acc.StatusCode, 'DLV') ? 'Deliver' : 'Collect',
                      amt: Csbk1_acc.Pcs + ' PKG',
                      time: is.equal(Csbk1_acc.StatusCode, 'DLV') ? DLVReturntime : reuturnTime,
                      code: Csbk1_acc.PostalCode,
                      customer: {
                        name: Csbk1_acc.BusinessPartyName,
                        address: Csbk1_acc.Address1 + Csbk1_acc.Address2 + Csbk1_acc.Address3 + Csbk1_acc.Address4
                      },
                      status: {
                        inprocess: is.equal(Csbk1_acc.CompletedFlag, 'Y') ? false : true,
                        success: is.equal(Csbk1_acc.CompletedFlag, 'Y') ? true : false,
                        failed: false
                      }
                    }];
                    dataResults = dataResults.concat(jobs);
                    $scope.jobs = dataResults;
                  }

                } else {
                  //  gotoLogin(false);
                }
              },
              function(error) {
                //  gotoLogin(false);
              }
            );
        } else {
          //gotoLogin(false);
        }
      });
      if (dbTms) {
        dbTms.transaction(function(tx) {
          dbSql = 'select * from Csbk1_Accept';
          tx.executeSql(dbSql, [], function(tx, results) {
            if (results.rows.length > 0) {
              for (var i = 0; i < results.rows.length; i++) {
                var Csbk1_acc = results.rows.item(i);
                var reuturnTime = '';
                if (is.equal(Csbk1_acc.CollectionTimeStart, '') && is.equal(Csbk1_acc.CollectionTimeEnd, '')) {
                  reuturnTime = Csbk1_acc.ColTimeFrom + '-' + Csbk1_acc.ColTimeTo;
                } else {
                  reuturnTime = Csbk1_acc.CollectionTimeStart + '-' + Csbk1_acc.CollectionTimeEnd;
                }
                var DLVReturntime = '';
                if (is.equal(Csbk1_acc.TimeFrom, '') && is.equal(Csbk1_acc.TimeFrom, '')) {
                  DLVReturntime = '';
                } else {
                  DLVReturntime = Csbk1_acc.TimeFrom + '-' + Csbk1_acc.TimeTo;
                }
                var jobs = [{
                  bookingno: Csbk1_acc.BookingNo,
                  JobNo: Csbk1_acc.JobNo,
                  action: is.equal(Csbk1_acc.StatusCode, 'DLV') ? 'Deliver' : 'Collect',
                  amt: Csbk1_acc.Pcs + ' PKG',
                  time: is.equal(Csbk1_acc.StatusCode, 'DLV') ? DLVReturntime : reuturnTime,
                  code: Csbk1_acc.PostalCode,
                  customer: {
                    name: Csbk1_acc.BusinessPartyName,
                    address: Csbk1_acc.Address1 + Csbk1_acc.Address2 + Csbk1_acc.Address3 + Csbk1_acc.Address4
                  },
                  status: {
                    inprocess: is.equal(Csbk1_acc.CompletedFlag, 'Y') ? false : true,
                    success: is.equal(Csbk1_acc.CompletedFlag, 'Y') ? true : false,
                    failed: false
                  }
                }];
                dataResults = dataResults.concat(jobs);
                $scope.jobs = dataResults;
              }
            } else {
              // var strUri = '/api/tms/Csbk1?DriverCode=' + sessionStorage.getItem('strDriverCode');
              // ApiService.GetParam(strUri, true).then(function success(result) {
              //   var results = result.data.results;
              //   if (is.not.empty(results)) {
              //     for (var intI = 0; intI < results.length; intI++) {
              //       var Csbk1_acc = results[intI];
              //       var jobs = [{
              //         bookingno: Csbk1_acc.BookingNo,
              //         JobNo: Csbk1_acc.JobNo,
              //         action: is.equal(Csbk1_acc.JobType, 'DLV') ? 'Deliver' : 'Collect',
              //         amt: Csbk1_acc.Pcs +'PKG' ,
              //         time: is.equal(Csbk1_acc.JobType, 'DLV') ? '11:00 - 18:00' : parseInt(Csbk1_acc.CollectionTimeStart)-parseInt(Csbk1_acc.CollectionTimeEnd),
              //         code: Csbk1_acc.PostalCode,
              //         customer: {
              //           name: Csbk1_acc.BusinessPartyName,
              //           address: Csbk1_acc.Address1 + Csbk1_acc.Address2 + Csbk1_acc.Address3 + Csbk1_acc.Address4
              //         },
              //         status: {
              //           inprocess: is.equal(Csbk1_acc.CompletedFlag, 'Y') ? false : true,
              //           success: is.equal(Csbk1_acc.CompletedFlag, 'Y') ? true : false,
              //           failed: false
              //         }
              //       }];
              //       dataResults = dataResults.concat(jobs);
              //       $scope.jobs = dataResults;
              //
              //     }
              //   }
              // });

            }
          });
        }, dbError);
      }
    };
    getBookingNo();
    $scope.showFilterBar = function() {
      filterBarInstance = $ionicFilterBar.show({
        items: $scope.jobs,
        expression: function(filterText, value, index, array) {
          return value.bookingno.indexOf(filterText) > -1;
        },
        //filterProperties: ['bookingno'],
        update: function(filteredItems, filterText) {
          $scope.jobs = filteredItems;
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
      console.log(job.JobNo);
      $state.go('jobListingDetail', {
        'BookingNo': job.bookingno,
        'JobNo': job.JobNo
      }, {
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
        dbSql = 'select * from Csbk1_Accept';
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

app.controller('JoblistingDetailCtrl', ['ENV', '$scope', '$state', '$ionicActionSheet', '$cordovaSms', '$stateParams', 'ApiService','$cordovaSQLite',
  function(ENV, $scope, $state, $ionicActionSheet, $cordovaSms, $stateParams, ApiService,$cordovaSQLite) {
    $scope.BookingNo = $stateParams.BookingNo;
    $scope.StatusCode = '';
    $scope.csbk2 = {
      AllBalance: 0,
      Deposit: 0,
      Discount: 0,
      CollectedAmt: 0,
      BoxNo: 0,
      CollectedPcs: 0
    };

    $('#iCollectedPcs').focus(function(e) {
      //$('#iCard').css("margin-top","-200px");
      console.log('====focus');
    });


    $('#iCollectedAmt').on('keydown', function(e) {
      if (e.which === 9 || e.which === 13) {
        $scope.gotoConfirm();
      }
    });

    // $scope.CompletedFlagDetail = $stateParams.CompletedFlagDetail;
    // console.log($stateParams.BookingNo + 'aaaa' + $scope.CompletedFlagDetail);
    var dataResults = new Array();
    var showTobk = function() {

      if (dbTms) {
        dbTms.transaction(function(tx) {
          console.log('dddddd select');
          dbSql = "select * from Csbk2_Accept where BookingNo='" + $scope.BookingNo + "'";
          tx.executeSql(dbSql, [], function(tx, results) {
            console.log(results);
            if (results.rows.length > 0) {
              console.log('aaaaaa--in ');
              //   console.log(results.rows.item(0).BookingNo);
              for (var i = 0; i < results.rows.length; i++) {
                var Csbk2_acc = results.rows.item(i);
                $scope.StatusCode = Csbk2_acc.StatusCode;
                // $scope.csbk2.CollectedPcs=$scope.csbk2.CollectedPcs+ Csbk2_acc.CollectedPcs ;
                var csbk2 = [{
                  Pcs: Csbk2_acc.Pcs,
                  BoxCode: Csbk2_acc.BoxCode,
                  CollectedPcs: Csbk2_acc.CollectedPcs,
                  //    Balance: (results[intI].Pcs * results[intI].UnitRate)-results[intI].DepositAmt)-results[intI].DiscountAmt);
                }]
                $scope.csbk2.AllBalance = $scope.csbk2.AllBalance + (Csbk2_acc.Pcs * Csbk2_acc.UnitRate) - Csbk2_acc.DepositAmt - Csbk2_acc.DiscountAmt;
                $scope.csbk2.Deposit = Csbk2_acc.DepositAmt;
                $scope.csbk2.Discount = Csbk2_acc.DiscountAmt;
                $scope.csbk2.BoxNo = Csbk2_acc.ItemNo;
                $scope.csbk2.CollectedAmt = Csbk2_acc.CollectedAmt;
                dataResults = dataResults.concat(csbk2);
                $scope.Csbk2s = dataResults;
              }
              checkStatusCode($scope.StatusCode);
            } else {
              console.log('bbbbb--out');
              if (is.not.empty($scope.BookingNo)) {
                var strUri = '/api/tms/csbk2?BookingNo=' + $scope.BookingNo;
                ApiService.GetParam(strUri, true).then(function success(result) {
                  var results = result.data.results;
                  if (is.not.empty(results)) {
                    $scope.StatusCode = results[0].StatusCode;
                    for (var intI = 0; intI < results.length; intI++) {
                      // $scope.csbk2.CollectedPcs=parseInt($scope.csbk2.CollectedPcs)+parseInt(results[intI].CollectedPcs) ;
                      // console.log(  $scope.csbk2.CollectedPcs+'pcs');
                      $scope.csbk2.CollectedPcs = $scope.csbk2.CollectedPcs + results[intI].CollectedPcs;
                      var csbk2 = [{
                        Pcs: results[intI].Pcs,
                        BoxCode: results[intI].BoxCode,
                        CollectedPcs: results[intI].CollectedPcs,
                        //    Balance: (results[intI].Pcs * results[intI].UnitRate)-results[intI].DepositAmt)-results[intI].DiscountAmt);
                      }]
                      $scope.csbk2.AllBalance = $scope.csbk2.AllBalance + (results[intI].Pcs * results[intI].UnitRate) - results[intI].DepositAmt - results[intI].DiscountAmt;
                      $scope.csbk2.Deposit = results[intI].DepositAmt;
                      $scope.csbk2.Discount = results[intI].DiscountAmt;
                      $scope.csbk2.BoxNo = results[intI].ItemNo;
                      $scope.csbk2.CollectedAmt = $scope.csbk2.AllBalance;
                      dataResults = dataResults.concat(csbk2);
                      $scope.Csbk2s = dataResults;
                    }
                  }
//                   if (!ENV.fromWeb) {
//                     var sql = 'INSERT INTO Csbk2(TrxNo,LineItemNo, BoxCode, StatusCode,Pcs,UnitRate,Volume,GrossWeight,CollectedPcs,CollectedAmt,DepositAmt,DiscountAmt,AttachmentFlag,ItemNo,BookingNo) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
//                     $cordovaSQLite.execute(db, sql, [
//                         results[0].TrxNo,
//                         results[0].LineItemNo,
//                         results[0].BoxCode,
//                         results[0].StatusCode,
//                         results[0].Pcs,
//                         results[0].UnitRate,
//                         results[0].Volume,
//                         results[0].GrossWeight,
//                         results[0].CollectedPcs,
//                         results[0].CollectedAmt,
//                         results[0].DepositAmt,
//                         results[0].DiscountAmt,
//                         results[0].AttachmentFlag,
//                         results[0].ItemNo,
//                         results[0].BookingNo,
//                       ])
//                       .then(function(result) {}, function(error) {});
// //var sqlUpdateCsbk2Amt="update Csbk2 set CollectedAmt= '" +  $scope.csbk2.CollectedAmt + "',BookingNo=";
//                   }
// else {
                    for (var i = 0; i < results.length; i++) {
                      db_add_Csbk2_Accept(results[i]);
                    }
                    var csbk2_amt = {
                      CollectedAmt: $scope.csbk2.CollectedAmt,
                      BookingNo: $scope.BookingNo
                    };
                    db_update_Csbk2_Amount(csbk2_amt);
                  //}
                  checkStatusCode($scope.StatusCode);
                });
              }
            }
          });
        }, dbError);
      }
    };

    var checkStatusCode = function(StatusCode) {
        if (is.equal(StatusCode, 'DLV')) {
          $scope.title = 'Deliver : ' + $scope.BookingNo;
        } else {
          $scope.title = 'Collect : ' + $scope.BookingNo;
        }
      }
      // if (is.equal($scope.StatusCode, 'DLV')) {
      //   $scope.title = 'Deliver : ' + $scope.BookingNo;
      // } else {
      //   $scope.title = 'Collect : ' + $scope.BookingNo;
      // }
    showTobk();

    $scope.showActionSheet = function() {
      var actionSheet = $ionicActionSheet.show({
        buttons: [{

          text: '<a ng-hef="tel:08605925888865>CALL  </a>'
        }, {
          text: 'SMS'
        }],
        //destructiveText: 'Delete',
        titleText: 'Select Picture',
        cancelText: 'Cancel',
        cancel: function() {
          // add cancel code..
        },
        buttonClicked: function(index) {
          if (index === 0) {
            // ng-href="tel:08605925888865"
          } else if (index === 1) {
            SMS();
          }
          return true;
        }
      });
    };
    $scope.gotoConfirm = function() {
      // $('#iCollectedPcs').focus(function(e){
      // //$('#iCard').css("margin-top","-200px");
      //     console.log('====focus');
      //  });
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.close();
      }
      if (is.equal($scope.StatusCode, 'DLV')) {
        var strUri = '/api/tms/csbk1/confirm?BookingNo=' + $stateParams.BookingNo;
        ApiService.GetParam(strUri, true).then(function success(result) {
          var Csbk1 = {
            CompletedFlag: 'Y',
            BookingNo: $stateParams.BookingNo
          }
          db_update_Csbk1_Accept(Csbk1);
          // var csbk2_amt= {
          //   CollectedAmt: $scope.csbk2.CollectedAmt,
          //   BookingNo: $scope.BookingNo
          // }
          // db_update_Csbk2_Amount(csbk2_amt);
          if (dbTms) {
            dbTms.transaction(function(tx) {
              dbSql = "select * from Csbk2_Accept where BookingNo='" + $scope.BookingNo + "'";
              //dbSql = 'select * from Csbk2_Accept where';
              tx.executeSql(dbSql, [], function(tx, results) {
                if (results.rows.length > 0) {
                  for (var i = 0; i < results.rows.length; i++) {
                    var Csbk1_acc = results.rows.item(i);
                    var jobs = {
                      CollectedPcs: $scope.Csbk2s[i].CollectedPcs,
                      CollectedAmt: $scope.csbk2.CollectedAmt,
                      TrxNo: Csbk1_acc.TrxNo,
                      LineItemNo: Csbk1_acc.LineItemNo,

                    };
                    db_update_Csbk2_Accept(jobs);
                  }
                }
              });
            }, dbError);
          }

          $state.go('jobListingList', {}, {});
        });
      } else {
        if (dbTms) {
          dbTms.transaction(function(tx) {
            dbSql = "select * from Csbk2_Accept where BookingNo='" + $scope.BookingNo + "'";
            //dbSql = 'select * from Csbk2_Accept where';
            tx.executeSql(dbSql, [], function(tx, results) {
              if (results.rows.length > 0) {
                for (var i = 0; i < results.rows.length; i++) {
                  $scope.csbk2.CollectedPcs = $scope.csbk2.CollectedPcs + parseInt($scope.Csbk2s[i].CollectedPcs);
                  console.log($scope.csbk2.CollectedPcs);
                  console.log('aaaaaaaaaaaaaaaaa');
                  var Csbk1_acc = results.rows.item(i);
                  var jobs = {
                    CollectedPcs: $scope.Csbk2s[i].CollectedPcs,
                    CollectedAmt: $scope.csbk2.CollectedAmt,
                    TrxNo: Csbk1_acc.TrxNo,
                    LineItemNo: Csbk1_acc.LineItemNo,

                  };
                  db_update_Csbk2_Accept(jobs);
                }
                $state.go('jobListingConfirm', {
                  'BookingNo': $scope.BookingNo,
                  'JobNo': $stateParams.JobNo,
                  'CollectedAmt': $scope.csbk2.CollectedAmt,
                  'Collected': $scope.csbk2.CollectedPcs
                }, {
                  reload: true
                });
              }
            });
          }, dbError);
        }
      }



    };
    console.log($scope.csbk2.CollectedPcs);
    $scope.returnList = function() {
      $state.go('jobListingList', {}, {});
    };
    var SMS = function() {
      $scope.PhoneNumber = '08605925888865'; //default PhoneNumber
      $scope.message = 'sms'; //default sms message
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.close();
      }
      var options = {
        replaceLineBreaks: false, // true to replace \n by a new line, false by default
        android: {
          intent: 'INTENT' // send SMS with the native android SMS messaging
            //intent: '' // send SMS without open any other app
        }
      };
      var success = function() {};
      var error = function(e) {};
      $cordovaSms.send($scope.PhoneNumber, $scope.message, options, success, error);
    }


  }
]);

app.controller('JoblistingConfirmCtrl', ['$scope', '$state', '$stateParams', 'ApiService', '$ionicPopup',
  function($scope, $state, $stateParams, ApiService, $ionicPopup) {
    var alertPopup = null,
      canvas = document.getElementById('signatureCanvas'),
      signaturePad = new SignaturePad(canvas);
    //signaturePad.backgroundColor = "white";
    //signaturePad.minWidth = 2;
    //signaturePad.maxWidth = 4.5;
    $scope.signature = null;
    $scope.Detail = {
      BookingNo: $stateParams.BookingNo,
      Amount: $stateParams.CollectedAmt,
      Packages: $stateParams.Collected
    };

    function resizeCanvas() {
      var ratio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth - 50;
      canvas.height = screen.height / 4 - 50;
    };
    var showPopup = function(title, type, callback) {
      if (alertPopup !== null) {
        alertPopup.close();
        alertPopup = null;
      }
      alertPopup = $ionicPopup.alert({
        title: title,
        okType: 'button-' + type
      });
      alertPopup.then(function(res) {
        if (typeof(callback) == 'function') callback(res);
      });
    };
    var getSignature = function() {
      var strUri = '/api/tms/csbk1/attach?BookingNo=' + $stateParams.BookingNo;
      console.log(strUri);
      ApiService.GetParam(strUri, true).then(function success(result) {
        if (is.not.undefined(result.data.results)) {
          $scope.signature = 'data:image/png;base64,' + result.data.results;
        }
      });
    };
    $scope.returnList = function() {
      $state.go('jobListingList', {}, {});
    };
    $scope.returnDetail = function() {
      $state.go('jobListingDetail', {
        BookingNo: $stateParams.BookingNo
      }, {
        reload: true
      });
    };
    $scope.clearCanvas = function() {
      $scope.signature = null;
      signaturePad.clear();
    }
    $scope.saveCanvas = function() {
      var sigImg = signaturePad.toDataURL();
      $scope.signature = sigImg;
    }
    $scope.confirm = function() {

      var strUri = '/api/tms/csbk1/confirm?BookingNo=' + $stateParams.BookingNo;
      ApiService.GetParam(strUri, true).then(function success(result) {
        var Csbk1 = {
          CompletedFlag: 'Y',
          BookingNo: $scope.Detail.BookingNo
        }
        db_update_Csbk1_Accept(Csbk1);


        var jsonData = {
          'Base64': $scope.signature,
          'FileName': 'signature.Png'
        };
        var strUri = '/api/tms/upload/img?BookingNo=' + $scope.Detail.BookingNo;
        ApiService.Post(strUri, jsonData, true).then(function success(result) {
          if ($scope.Detail.Amount > 0) {
            if (is.null($scope.signature)) {
              showPopup('Please Signature', 'calm', function(res) {});
            } else {
              showPopup('Confirm Success', 'calm', function(res) {
                $scope.returnList();
              });
            }
          } else {
            showPopup('Confirm Success', 'calm', function(res) {
              $scope.returnList();
            });
          }
        });
        var jsonData1 = {
          'CollectedAmt': $stateParams.CollectedAmt,
        };
        strUri = '/api/tms/csbk1/update?BookingNo=' + $scope.Detail.BookingNo + '&Amount=' + $stateParams.CollectedAmt + '&Package=' + $stateParams.Collected;
        ApiService.GetParam(strUri, true).then(function success(result) {});

      });
    };
    getSignature();
    resizeCanvas();
  }
]);
