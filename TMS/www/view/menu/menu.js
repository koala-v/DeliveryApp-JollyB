'use strict';
app.controller( 'IndexCtrl', [ 'ENV', '$ionicPlatform', '$scope', '$state', '$rootScope', '$http',
  '$ionicLoading', '$ionicPopup', '$ionicSideMenuDelegate', '$cordovaAppVersion', '$cordovaFile', '$cordovaToast', '$cordovaSQLite',
  function ( ENV, $ionicPlatform, $scope, $state, $rootScope, $http, $ionicLoading, $ionicPopup,
        $ionicSideMenuDelegate, $cordovaAppVersion, $cordovaFile, $cordovaToast, $cordovaSQLite ) {
        var alertPopup = null;
        var alertPopupTitle = '';
        $scope.Status = {
            Login: false
        };
        var deleteLogin = function () {
            if ( !ENV.fromWeb ) {
                $cordovaSQLite.execute( db, 'DELETE FROM Users' )
                    .then(
                        function ( res ) {
                            console.log( 'Delete LoginInfo' );
                            $rootScope.$broadcast( 'logout' );
                            $state.go( 'index.login', {}, {} );
                        },
                        function ( error ) {}
                    );
            } else {
                $state.go( 'index.login', {}, {} );
                $rootScope.$broadcast( 'logout' );
            }
        };
        $scope.logout = function () {
            var confirmPopup = $ionicPopup.confirm( {
                title: 'Log Out',
                template: 'Are you sure to log out?'
            } );
            confirmPopup.then( function ( res ) {
                if ( res ) {
                    deleteLogin();
                }
            } );
        };
        $scope.gotoSetting = function () {
            $state.go( 'index.setting', {}, {
                reload: true
            } );
        };
        $scope.gotoUpdate = function () {
            if ( !ENV.fromWeb ) {
                var url = ENV.website + '/' + ENV.updateFile;
                $http.get( url )
                    .success( function ( res ) {
                        var serverAppVersion = res.version;
                        $cordovaAppVersion.getVersionNumber().then( function ( version ) {
                            if ( version != serverAppVersion ) {
                                $ionicSideMenuDelegate.toggleLeft();
                                $state.go( 'index.update', {
                                    'Version': serverAppVersion
                                } );
                            } else {
                                alertPopupTitle = 'Already the Latest Version!';
                                alertPopup = $ionicPopup.alert( {
                                    title: alertPopupTitle,
                                    okType: 'button-assertive'
                                } );
                            }
                        } );
                    } )
                    .error( function ( res ) {
                        console.error(res);
                        alertPopupTitle = 'Connect Update Server Error!';
                        alertPopup = $ionicPopup.alert( {
                            title: alertPopupTitle,
                            okType: 'button-assertive'
                        } );
                    } );
            } else {
                alertPopupTitle = 'No Updates!';
                alertPopup = $ionicPopup.alert( {
                    title: alertPopupTitle,
                    okType: 'button-calm'
                } );
            }
        };
        $rootScope.$on( 'logout', function () {
            $scope.Status.Login = false;
            $ionicSideMenuDelegate.toggleLeft();
        } );
        $rootScope.$on( 'login', function () {
            $scope.Status.Login = true;
        } );
        //
        var writeFile = function ( path, file, data ) {
            $cordovaFile.writeFile( path, file, data, true )
                .then( function ( success ) {
                    var blnSSL = ENV.ssl === 0 ? false : true;
                    ENV.website = appendProtocol( ENV.website, blnSSL, ENV.port );
                    ENV.api = appendProtocol( ENV.api, blnSSL, ENV.port );
                }, function ( error ) {
                    $cordovaToast.showShortBottom( error );
                    console.error( error );
                } );
        };
        $ionicPlatform.ready( function () {
            console.log( 'ionicPlatform.ready' );
            if ( !ENV.fromWeb ) {
                var data = 'website=' + ENV.website + '##' +
                    'api=' + ENV.api + '##' +
                    'port=' + ENV.port + '##';
                var path = cordova.file.externalRootDirectory,
                    directory = ENV.rootPath,
                    file = ENV.rootPath + '/' + ENV.configFile;
                $cordovaFile.createDir( path, directory, false )
                    .then( function ( success ) {
                        writeFile( path, file, data );
                    }, function ( error ) {
                        // If an existing directory exists
                        $cordovaFile.checkFile( path, file )
                            .then( function ( success ) {
                                $cordovaFile.readAsText( path, file )
                                    .then( function ( success ) {
                                        var arConf = success.split( '##' );
                                        if ( arConf.length == 4 ) {
                                            var arWebServiceURL = arConf[ 0 ].split( '=' );
                                            if ( is.not.empty( arWebServiceURL[ 1 ] ) ) {
                                                ENV.website = arWebServiceURL[ 1 ];
                                            }
                                            var arWebSiteURL = arConf[ 1 ].split( '=' );
                                            if ( is.not.empty( arWebSiteURL[ 1 ] ) ) {
                                                ENV.api = arWebSiteURL[ 1 ];
                                            }
                                            var arWebPort = arConf[ 2 ].split( '=' );
                                            if ( is.not.empty( arWebPort[ 1 ] ) ) {
                                                ENV.port = arWebPort[ 1 ];
                                            }
                                            var blnSSL = ENV.ssl === 0 ? false : true;
                                            ENV.website = appendProtocol( ENV.website, blnSSL, ENV.port );
                                            ENV.api = appendProtocol( ENV.api, blnSSL, ENV.port );
                                        } else {
                                            $cordovaFile.removeFile( path, file )
                                                .then( function ( success ) {
                                                    writeFile( path, file, data );
                                                }, function ( error ) {
                                                    $cordovaToast.showShortBottom( error );
                                                } );
                                        }
                                    }, function ( error ) {
                                        $cordovaToast.showShortBottom( error );
                                        console.error( error );
                                    } );
                            }, function ( error ) {
                                // If file not exists
                                writeFile( path, file, data );
                            } );
                    } );
            } else {
                var blnSSL = 'https:' === document.location.protocol ? true : false;
                ENV.ssl = blnSSL ? '1' : '0';
                ENV.website = appendProtocol( ENV.website, blnSSL, ENV.port );
                ENV.api = appendProtocol( ENV.api, blnSSL, ENV.port );
            }
        } );
  }
] );
