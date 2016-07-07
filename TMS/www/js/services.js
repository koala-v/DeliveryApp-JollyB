'use strict';
var appServices = angular.module( 'TMS.services', [
    'ionic',
    'ngCordova',
    'TMS.config'
] )
appServices.service( 'ApiService', [ '$q', 'ENV', '$http', '$ionicLoading', '$ionicPopup', '$timeout',
  function ( $q, ENV, $http, $ionicLoading, $ionicPopup, $timeout ) {
        this.Post = function ( requestUrl, requestData, blnShowLoad ) {
            if ( blnShowLoad ) {
                $ionicLoading.show();
            }
            var deferred = $q.defer();
            var strSignature = hex_md5( requestUrl + ENV.appId.replace( /-/ig, "" ) );
            var url = ENV.api + requestUrl;
            console.log( url );
            var config = {
                'Content-Type': 'application/x-www-form-urlencoded'
            };
            $http.post( url, requestData, config ).success( function ( result, status, headers, config, statusText ) {
                if ( blnShowLoad ) {
                    $ionicLoading.hide();
                }
                if ( is.equal( result.meta.errors.code, 0 ) || is.equal( result.meta.errors.code, 200 ) ) {
                    deferred.resolve( result );
                } else {
                    deferred.reject( result );
                    var alertPopup = $ionicPopup.alert( {
                        title: result.meta.message,
                        subTitle: result.meta.errors.message,
                        okType: 'button-assertive'
                    } );
                }
            } ).error( function ( result, status, headers, config, statusText ) {
                if ( blnShowLoad ) {
                    $ionicLoading.hide();
                }
                deferred.reject( result );
                console.log( result );
            } );
            return deferred.promise;
        };
        this.Get = function ( requestUrl, blnShowLoad ) {
            if ( blnShowLoad ) {
                $ionicLoading.show();
            }
            var deferred = $q.defer();
            var url = ENV.api + requestUrl + '?format=json';
            console.log( url );
            $http.get( url ).success( function ( result, status, headers, config, statusText ) {
                if ( blnShowLoad ) {
                    $ionicLoading.hide();
                }
                if ( is.equal( result.meta.errors.code, 0 ) || is.equal( result.meta.errors.code, 200 ) ) {
                    deferred.resolve( result );
                } else {
                    deferred.reject( result );
                    var alertPopup = $ionicPopup.alert( {
                        title: result.meta.message,
                        subTitle: result.meta.errors.message,
                        okType: 'button-assertive'
                    } );
                }
            } ).error( function ( result, status, headers, config, statusText ) {
                if ( blnShowLoad ) {
                    $ionicLoading.hide();
                }
                deferred.reject( result );
                console.log( result );
            } );
            return deferred.promise;
        };
        this.GetParam = function ( requestUrl, blnShowLoad ) {
            if ( blnShowLoad ) {
                $ionicLoading.show();
            }
            var deferred = $q.defer();
            var url = ENV.api + requestUrl + '&format=json';
            console.log( url );
            $http.get( url ).success( function ( result, status, headers, config, statusText ) {
                if ( blnShowLoad ) {
                    $ionicLoading.hide();
                }
                if ( is.equal( result.meta.errors.code, 0 ) || is.equal( result.meta.errors.code, 200 ) ) {
                    deferred.resolve( result );
                } else {
                    deferred.reject( result );
                    var alertPopup = $ionicPopup.alert( {
                        title: result.meta.message,
                        subTitle: result.meta.errors.message,
                        okType: 'button-assertive'
                    } );
                }
            } ).error( function ( result, status, headers, config, statusText ) {
                if ( blnShowLoad ) {
                    $ionicLoading.hide();
                }
                deferred.reject( result );
                console.log( result );
            } );
            return deferred.promise;
        };
  }
] );

appServices.service( 'DownloadFileService', [ 'ENV', '$timeout', '$ionicLoading', '$cordovaToast', '$cordovaFile', '$cordovaFileTransfer', '$cordovaFileOpener2',
    function( ENV, $timeout, $ionicLoading, $cordovaToast, $cordovaFile, $cordovaFileTransfer, $cordovaFileOpener2 ) {
        this.Download = function( url, fileName, fileType, onPlatformError, onCheckError, onDownloadError ) {
            $ionicLoading.show( {
                template: 'Download  0%'
            } );
            if ( !ENV.fromWeb ) {
                var targetPath = cordova.file.externalRootDirectory + '/' + ENV.rootPath + '/' + fileName;
                var trustHosts = true;
                var options = {};

                $cordovaFileTransfer.download( url, targetPath, trustHosts, options ).then( function( result ) {
                    $ionicLoading.hide();
                    $cordovaFileOpener2.open( targetPath, fileType ).then( function() {
                        // success
                    }, function( err ) {
                        console.error( err );
                    } ).catch( function( ex ) {
                        console.error( ex );
                    } );
                }, function( err ) {
                    $ionicLoading.hide();
                    console.error( err );
                    $cordovaToast.showShortCenter( 'Download faild' );
                    if ( typeof( onDownloadError ) == 'function' ) onDownloadError();
                }, function( progress ) {
                    $timeout( function() {
                        var downloadProgress = ( progress.loaded / progress.total ) * 100;
                        $ionicLoading.show( {
                            template: 'Download  ' + Math.floor( downloadProgress ) + '%'
                        } );
                        if ( downloadProgress > 99 ) {
                            $ionicLoading.hide();
                        }
                    } );
                } ).catch( function( ex ) {
                    $ionicLoading.hide();
                    console.error( ex );
                } );

            } else {
                $ionicLoading.hide();
                if ( typeof( onPlatformError ) == 'function' ) onPlatformError( url );
            }
        };
    }
] );
