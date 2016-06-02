'use strict';
var appServices = angular.module('TMS.services', [])
appServices.service('ApiService', ['$q', 'ENV', '$http', '$ionicLoading', '$ionicPopup', '$timeout',
  function($q, ENV, $http, $ionicLoading, $ionicPopup, $timeout) {
    this.Post = function(requestUrl, requestData, blnShowLoad) {
      if (blnShowLoad) {
        $ionicLoading.show();
      }
      var deferred = $q.defer();
      var strSignature = hex_md5(requestUrl + ENV.appId.replace(/-/ig, ""));
      var url = ENV.api + requestUrl;
      console.log(url);
      var config = {
        'Content-Type': 'application/json'
      };
      $http.post(url, requestData, config).success(function(data, status, headers, config, statusText) {
        if (blnShowLoad) {
          $ionicLoading.hide();
        }
        deferred.resolve(data);
      }).error(function(data, status, headers, config, statusText) {
        if (blnShowLoad) {
          $ionicLoading.hide();
        }
        deferred.reject(data);
        console.log(data);
      });
      return deferred.promise;
    };
    this.Get = function(requestUrl, blnShowLoad) {
      if (blnShowLoad) {
        $ionicLoading.show();
      }
      var deferred = $q.defer();
      var url = ENV.api + requestUrl + "?format=json";
      console.log(url);
      $http.get(url).success(function(data, status, headers, config, statusText) {
        if (blnShowLoad) {
          $ionicLoading.hide();
        }
        deferred.resolve(data);
      }).error(function(data, status, headers, config, statusText) {
        if (blnShowLoad) {
          $ionicLoading.hide();
        }
        deferred.reject(data);
        console.log(data);
      });
      return deferred.promise;
    };
    this.GetParam = function(requestUrl, blnShowLoad) {
      if (blnShowLoad) {
        $ionicLoading.show();
      }
      var deferred = $q.defer();
      var url = ENV.api + requestUrl + "&format=json";
      console.log(url);
      $http.get(url).success(function(data, status, headers, config, statusText) {
        if (blnShowLoad) {
          $ionicLoading.hide();
        }
        deferred.resolve(data);
      }).error(function(data, status, headers, config, statusText) {
        if (blnShowLoad) {
          $ionicLoading.hide();
        }
        deferred.reject(data);
        console.log(data);
      });
      return deferred.promise;
    };
  }
]);

// appServices.service( 'SqlService', [ 'ENV', '$q', '$cordovaSQLite', '$ionicPlatform', '$cordovaDevice',
//     function( ENV, $q, $cordovaSQLite, $ionicPlatform, $cordovaDevice ){
//         var dbName = 'jollyb.db', dbLocation = 'default', db = null, dbSql = '';
//         var dbInfo = {
//             dbName: 'jollyb.db',
//             dbVersion: '1.0',
//             dbDisplayName: 'jollyb Database',
//             dbEstimatedSize: 1024 * 1024 * 100
//         };
//         this.init = function(){
//             $ionicPlatform.ready(function () {
//                 if(ENV.fromWeb){
//                     //db = window.openDatabase(dbInfo.dbName, dbInfo.dbVersion, dbInfo.dbDisplayName, dbInfo.dbEstimatedSize);
//                 }else{
//                     db = $cordovaSQLite.openDB({name: dbName, location: 'default', androidLockWorkaround: 1})
//                 }
//                 if(db){
//                     db.transaction(function(tx) {
//                         $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS sql_Csbk1(TrxNo INTEGER,BookingNo TEXT, JobNo TEXT, StatusCode TEXT,BookingCustomerCode TEXT,Pcs INTEGER,CollectionTimeStart TEXT,CollectionTimeEnd TEXT,PostalCode TEXT,BusinessPartyCode TEXT,BusinessPartyName TEXT,Address1 TEXT,Address2 TEXT,Address3 TEXT,Address4 TEXT,CompletedFlag TEXT,TimeFrom TEXT,TimeTo TEXT,ColTimeFrom TEXT,ColTimeTo TEXT)');
//                     }, function(err) {
//                         console.error(err);
//                     });
//                 }
//             });
//         };
//         this.select = function(){
//             // if(db){
//             //     var query2 = 'SELECT top 1 id, password FROM User';
//     		    // $cordovaSQLite.execute(db, query2, []).then(function(res) {
//     		    //     if(res.rows.length > 0) {
// 		        //     	console.error(res.rows.item(0).id + ' # ' + res.rows.item(0).password);
//             //             var objUser = {
//             //                 id: res.rows.item(0).id,
//             //                 password: res.rows.item(0).password
//             //             };
//             //             return objUser;
//     		    //     }
//     		    // }, function (err) {
//     		    //     console.error(err);
//     		    // });
//             // }else{
//             //     return null;
//             // }
//         };
//         this.insert = function(){
//             // if(db){
//             //     var query = 'INSERT INTO User (id, password) VALUES (?,?)';
//     	      //   $cordovaSQLite.execute(db, query, ['s', 'sysh20']).then(function(res) {
//     	      //       console.error(res.insertId);
//     	      //   }, function (err) {
//     	      //       console.error(err);
//     	      //   });
//             // }
//         };
//     }
// ] );
