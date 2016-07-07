'use strict';
var appServices = angular.module( 'TMS.services', [
    'ionic',
    'ngCordova',
    'TMS.config'
] )
appServices.service( 'ApiService', [ '$q', 'ENV', '$http', '$ionicLoading', '$ionicPopup', '$timeout',
  function ( $q, ENV, $http, $ionicLoading, $ionicPopup, $timeout ) {
        var parts = {},
            folder = '';
        this.Init = function(){
            var url = ENV.api;
            var urls = url.split( '/' );
            parts = {
              protocol: null,
              username: null,
              password: null,
              hostname: urls[ 0 ],
              port: ENV.port,
              path: url.replace( urls[ 0 ], '' ),
              query: null,
              fragment: null
            };
            if ( ENV.ssl ) {
                parts.protocol = 'https';
            } else {
                parts.protocol = 'http';
            }
            folder = parts.path;
        };
        this.Uri = function( path ){
            parts.path = folder + path;
            //return objUri.normalizeProtocol().normalizeHostname().normalizePort().toString();
            return new URI(URI.build(parts));
        };
        this.Post = function ( uri, requestData, blnShowLoad ) {
            if ( blnShowLoad ) {
                $ionicLoading.show();
            }
            var deferred = $q.defer();
            //var strSignature = hex_md5( uri + ENV.appId.replace( /-/ig, "" ) );
            var url = uri.addSearch('format', 'json').normalizeProtocol().normalizeHostname().normalizePort().normalizeSearch().toString();
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
        this.Get = function ( uri, blnShowLoad ) {
            if ( blnShowLoad ) {
                $ionicLoading.show();
            }
            var deferred = $q.defer();
            var url = uri.addSearch('format', 'json').normalizeProtocol().normalizeHostname().normalizePort().normalizeSearch().toString();
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
        this.GetParam = function ( uri, blnShowLoad ) {
            if ( blnShowLoad ) {
                $ionicLoading.show();
            }
            var deferred = $q.defer();
            var url = uri.addSearch('format', 'json').normalizeProtocol().normalizeHostname().normalizePort().normalizeSearch().toString();
            console.log( url );
            /*
            $http( { method: 'GET', url: url } ).then(function(response){
                if ( blnShowLoad ) {
                    $ionicLoading.hide();
                }
                var result = response.data;
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
            }, function(response){
                if ( blnShowLoad ) {
                    $ionicLoading.hide();
                }
                deferred.reject( response.data );
                console.log( response.status );
                var alertPopup = $ionicPopup.alert( {
                    title: response.data || 'Request failed',
                    okType: 'button-assertive'
                } );
            })
            */
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
                var alertPopup = $ionicPopup.alert( {
                    title: result || 'Request failed',
                    okType: 'button-assertive'
                } );
            } );
            return deferred.promise;
        };
  }
] );
