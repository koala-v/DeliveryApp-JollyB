'use strict';
var app = angular.module('TMS', [
    'ionic',
    'ionic-datepicker',
    'jett.ionic.filter.bar',
    'ionic.ion.headerShrink',
    'ionMdInput',
    'ngMessages',
    'ngCordova.plugins.sms',
    'ngCordova.plugins.toast',
    'ngCordova.plugins.dialogs',
    'ngCordova.plugins.appVersion',
    'ngCordova.plugins.keyboard',
    'ngCordova.plugins.file',
    'ngCordova.plugins.fileTransfer',
    'ngCordova.plugins.fileOpener2',
    'ngCordova.plugins.actionSheet',
    'ngCordova.plugins.inAppBrowser',
    'ngCordova.plugins.datePicker',
    'ngCordova.plugins.barcodeScanner',
    'TMS.config',
    'TMS.services',
    'TMS.factories'
]);
app.run([ 'ENV', '$ionicPlatform', '$rootScope', '$state', '$location', '$timeout', '$ionicHistory', '$ionicLoading', '$cordovaToast', '$cordovaKeyboard', '$cordovaFile',
    function ( ENV, $ionicPlatform, $rootScope, $state, $location, $timeout, $ionicHistory, $ionicLoading, $cordovaToast, $cordovaKeyboard, $cordovaFile) {
        $ionicPlatform.ready(function () {
            if ( window.cordova ) {
                ENV.fromWeb = false;
                $cordovaKeyboard.hideAccessoryBar(true);
                $cordovaKeyboard.disableScroll(true);
                //
                var data = 'website=' + ENV.website + '##api=' + ENV.api + '##ssl=' + ENV.ssl;
                var path = cordova.file.externalRootDirectory;
                var directory = ENV.rootPath;
                var file = directory + '/' + ENV.configFile;
                $cordovaFile.createDir( path, directory, false )
                    .then( function( success ) {
                        $cordovaFile.writeFile( path, file, data, true )
                            .then( function( success ) {
                                var blnSSL = ENV.ssl === 0 ? false : true;
                                ENV.website = appendProtocol( ENV.website, blnSSL, ENV.port );
                                ENV.api = appendProtocol( ENV.api, blnSSL, ENV.port );
                            }, function( error ) {
                                $cordovaToast.showShortBottom( error );
                            } );
                    }, function( error ) { // If an existing directory exists
                        $cordovaFile.checkFile( path, file )
                            .then( function( success ) {
                                $cordovaFile.readAsText( path, file )
                                    .then( function( success ) {
                                        var arConf = success.split( '##' );
                                        if ( is.not.empty( arConf[ 0 ] ) ) {
                                            var arWebServiceURL = arConf[ 0 ].split( '=' );
                                            if ( is.not.empty( arWebServiceURL[ 1 ] ) ) {
                                                ENV.website = arWebServiceURL[ 1 ];
                                            }
                                        }
                                        if ( is.not.empty( arConf[ 1 ] ) ) {
                                            var arWebSiteURL = arConf[ 1 ].split( '=' );
                                            if ( is.not.empty( arWebSiteURL[ 1 ] ) ) {
                                                ENV.api = arWebSiteURL[ 1 ];
                                            }
                                        }
                                        if ( is.not.empty( arConf[ 2 ] ) ) {
                                            var arSSL = arConf[ 2 ].split( '=' );
                                            if ( is.not.empty( arSSL[ 1 ] ) ) {
                                                ENV.ssl = arSSL[ 1 ];
                                            }
                                        }
                                        var blnSSL = ENV.ssl === 0 ? false : true;
                                        ENV.website = appendProtocol( ENV.website, blnSSL, ENV.port );
                                        ENV.api = appendProtocol( ENV.api, blnSSL, ENV.port );
                                        //
                                    }, function( error ) {
                                        $cordovaToast.showShortBottom( error );
                                    } );
                            }, function( error ) {
                                // If file not exists
                                $cordovaFile.writeFile( path, file, data, true )
                                    .then( function( success ) {
                                        var blnSSL = ENV.ssl === 0 ? false : true;
                                        ENV.website = appendProtocol( ENV.website, blnSSL, ENV.port );
                                        ENV.api = appendProtocol( ENV.api, blnSSL, ENV.port );
                                    }, function( error ) {
                                        $cordovaToast.showShortBottom( error );
                                    } );
                            } );
                    } );
            } else {
                var blnSSL = 'https:' === document.location.protocol ? true : false;
                ENV.ssl = blnSSL ? '1' : '0';
                ENV.website = appendProtocol( ENV.website, blnSSL, ENV.port );
                ENV.api = appendProtocol( ENV.api, blnSSL, ENV.port );
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
        $ionicPlatform.registerBackButtonAction(function (e) {
            e.preventDefault();
            // Is there a page to go back to?  $state.include ??
            if ($state.includes('index.main') || $state.includes('index.login') || $state.includes('splash')) {
                if ($rootScope.backButtonPressedOnceToExit) {
                    ionic.Platform.exitApp();
                } else {
                    $rootScope.backButtonPressedOnceToExit = true;
                    $cordovaToast.showShortBottom('Press again to exit.');
                    setTimeout(function () {
                        $rootScope.backButtonPressedOnceToExit = false;
                    }, 2000);
                }
            } else if ($ionicHistory.backView()) {
                $ionicHistory.goBack();
            } else {
                // This is the last page: Show confirmation popup
                $rootScope.backButtonPressedOnceToExit = true;
                $cordovaToast.showShortBottom('Press again to exit.');
                setTimeout(function () {
                    $rootScope.backButtonPressedOnceToExit = false;
                }, 2000);
            }
            return false;
        }, 101);
    }]);
app.config(['ENV', '$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', '$ionicFilterBarConfigProvider',
    function (ENV, $stateProvider, $urlRouterProvider, $ionicConfigProvider, $ionicFilterBarConfigProvider) {
        $ionicConfigProvider.backButton.previousTitleText(false);
        $stateProvider
            .state( 'index', {
                url: '',
                abstract: true,
                templateUrl: 'view//menu/menu.html',
                controller: 'IndexCtrl'
            } )
            .state('splash', {
                url: '/splash',
                cache: 'false',
                templateUrl: 'view/splash/splash.html',
                controller: 'SplashCtrl'
            })
            .state('index.login', {
                url: '/login',
                views: {
                    'menuContent': {
                        templateUrl: 'view/login/login.html',
                        controller: 'LoginCtrl'
                    }
                }
            })
            .state('index.main', {
                url: '/main',
                views: {
                    'menuContent': {
                        templateUrl: "view/main/main.html",
                        controller: 'MainCtrl'
                    }
                }
            })
            .state('acceptJob', {
                url: '/acceptjob/search',
                cache: 'false',
                templateUrl: 'view/acceptjob/search.html',
                controller: 'AcceptJobCtrl'
            })
            .state('jobListing', {
                url: '/joblisting/search',
                cache: 'false',
                templateUrl: 'view/joblisting/search.html',
                controller: 'JoblistingCtrl'
            })
            .state('jobListingList', {
                url: '/joblisting/list',
                cache: 'false',
                templateUrl: 'view/joblisting/list.html',
                controller: 'JoblistingListCtrl'
            })
            .state('jobListingDetail', {
                url: '/joblisting/detail',
                cache: 'false',
                templateUrl: 'view/joblisting/detail.html',
                controller: 'JoblistingDetailCtrl'
            })

            .state('goDriverCodeCtrl', {
                url: '/login',
                views: {
                    'menuContent': {
                        templateUrl: 'view/login/login.html',
                        controller: 'goDriverCodeCtrl'
                    }
                }
            })
            .state('driverCodeCtrl', {
                url: '/driverCode/driverCode',
                cache: 'false',
                templateUrl: 'view/driverCode/driverCode.html',
                controller: 'driverCodeCtrl'
            })
            .state('jobListingConfirm', {
                url: '/joblisting/confirm',
                cache: 'false',
                templateUrl: 'view/joblisting/confirm.html',
                controller: 'JoblistingConfirmCtrl'
            });
        $urlRouterProvider.otherwise('/splash');
        /*
        $ionicFilterBarConfigProvider.theme('calm');
        $ionicFilterBarConfigProvider.clear('ion-close');
        $ionicFilterBarConfigProvider.search('ion-search');
        $ionicFilterBarConfigProvider.backdrop(false);
        $ionicFilterBarConfigProvider.transition('vertical');
        $ionicFilterBarConfigProvider.placeholder('Filter');
        */
    }]);
app.constant('$ionicLoadingConfig', {
    template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
});
