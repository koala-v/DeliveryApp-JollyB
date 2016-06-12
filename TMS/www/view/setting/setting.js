app.controller( 'SettingCtrl', [ 'ENV', '$rootScope', '$scope', '$state', '$ionicHistory', '$ionicPopup', '$cordovaToast', '$cordovaFile',
    function( ENV, $rootScope,  $scope, $state, $ionicHistory, $ionicPopup, $cordovaToast, $cordovaFile ) {
        $scope.Setting = {
            Version:    ENV.version,
            WebApiURL:  rmProtocol(ENV.api),
            WebSiteUrl: rmProtocol(ENV.website),
            SSL:        { checked: ENV.ssl === '0' ? false : true },
            blnWeb:    ENV.fromWeb
        };
        $scope.return = function() {
            if ( $ionicHistory.backView() ) {
                $ionicHistory.goBack();
            } else {
                $state.go( 'index.login', {}, {
                    reload: true
                } );
            }
        };
        $scope.save = function() {
            if ( is.not.empty( $scope.Setting.WebApiURL ) ) {
                ENV.api = $scope.Setting.WebApiURL;
            } else {
                $scope.Setting.WebApiURL = rmProtocol(ENV.api);
            }
            if ( is.not.empty( $scope.Setting.WebSiteUrl ) ) {
                ENV.website = $scope.Setting.WebSiteUrl;
            } else {
                $scope.Setting.WebSiteUrl = rmProtocol(ENV.website);
            }
            ENV.ssl = $scope.Setting.SSL.checked ? '1' : '0';
            var blnSSL = $scope.Setting.SSL.checked ? true : false;
            ENV.website = appendProtocol(ENV.website, blnSSL, ENV.port);
            ENV.api     = appendProtocol(ENV.api, blnSSL, ENV.port);
            if ( !ENV.fromWeb ) {
                var data = 'website=' + ENV.website + '##api=' + ENV.api + '##ssl=' + ENV.ssl;
                var path = cordova.file.externalRootDirectory;
                var file = ENV.rootPath + '/' + ENV.configFile;
                $cordovaFile.writeFile( path, file, data, true )
                    .then( function( success ) {
                        //$rootScope.$broadcast( 'logout' );
                        $state.go( 'index.login', {}, {
                            reload: true
                        } );
                    }, function( error ) {
                        $cordovaToast.showShortBottom( error );
                    } );
            } else {
                //$rootScope.$broadcast( 'logout' );
                $state.go( 'index.login', {}, {
                    reload: true
                } );
            }
        };
        $scope.reset = function() {
            $scope.Setting.WebApiURL = 'www.sysfreight.net/apis/tms/jollyb';
            $scope.Setting.WebSiteUrl = 'www.sysfreight.net/mobileapp-JollyB';
            $scope.Setting.SSL = { checked: false };
            if ( !ENV.fromWeb ) {
                var path = cordova.file.externalRootDirectory;
                var file = ENV.rootPath + '/' + ENV.configFile;
                $cordovaFile.removeFile( path, file )
                    .then( function( success ) {

                    }, function( error ) {
                        //$cordovaToast.showShortBottom( error );
                    } );
            }
        };
    } ] );
