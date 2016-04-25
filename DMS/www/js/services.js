'use strict';
var appServices = angular.module('DMS.services', [])
appServices.service('ApiService', ['$q', 'ENV', '$http', '$ionicLoading', '$ionicPopup', '$timeout',
    function ($q, ENV, $http, $ionicLoading, $ionicPopup, $timeout) {
        this.Post = function (requestUrl, requestData, blnShowLoad) {
            if(blnShowLoad){$ionicLoading.show();}
            var deferred = $q.defer();
            if (strBaseUrl.length > 0 && strBaseUrl.indexOf('/') < 0 ) {
                strBaseUrl = "/" + strBaseUrl;
            }
            strWebServiceURL = onStrToURL(strWebServiceURL);
            strWebSiteURL = onStrToURL(strWebSiteURL);
            var strSignature = hex_md5(strBaseUrl + requestUrl + strSecretKey.replace(/-/ig, ""));
            var url = strWebServiceURL + strBaseUrl + requestUrl;
            console.log(url);
            var config = {
                'Content-Type':'application/json'
            };
            $http.post(url, requestData, config).success(function (data, status, headers, config, statusText) {
                if(blnShowLoad){$ionicLoading.hide();}
                deferred.resolve(data);
            }).error(function (data, status, headers, config, statusText) {
                if(blnShowLoad){$ionicLoading.hide();}
                deferred.reject(data);
                console.log(data);
            });
            return deferred.promise;
        };
        this.Get = function (requestUrl, blnShowLoad) {
            if(blnShowLoad){$ionicLoading.show();}
            var deferred = $q.defer();
            var url = ENV.api + requestUrl + "?format=json";
            console.log(url);
            $http.get(url).success(function (data, status, headers, config, statusText) {
                if(blnShowLoad){$ionicLoading.hide();}
                deferred.resolve(data);
            }).error(function (data, status, headers, config, statusText) {
                if(blnShowLoad){$ionicLoading.hide();}
                deferred.reject(data);
                console.log(data);
            });
            return deferred.promise;
        };
        this.GetParam = function (requestUrl, blnShowLoad) {
            if(blnShowLoad){$ionicLoading.show();}
            var deferred = $q.defer();
            var url = ENV.api + requestUrl + "&format=json";
            console.log(url);
            $http.get(url).success(function (data, status, headers, config, statusText) {
                if(blnShowLoad){$ionicLoading.hide();}
                deferred.resolve(data);
            }).error(function (data, status, headers, config, statusText) {
                if(blnShowLoad){$ionicLoading.hide();}
                deferred.reject(data);
                console.log(data);
            });
            return deferred.promise;
        };
    }]);
