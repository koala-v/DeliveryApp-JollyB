'use strict';
app.controller('IndexCtrl', ['ENV', '$scope', '$state', '$rootScope', '$http',
    '$ionicLoading', '$ionicPopup', '$ionicSideMenuDelegate', '$cordovaAppVersion',
    function(ENV, $scope, $state, $rootScope, $http, $ionicLoading, $ionicPopup,
        $ionicSideMenuDelegate, $cordovaAppVersion) {
            var alertPopup = null;
            var alertPopupTitle = '';
            $scope.Status = {
                Login: false
            };
            $scope.logout = function() {
                $rootScope.$broadcast( 'logout' );
                $state.go( 'index.login', {}, {} );
            };
            $scope.gotoSetting = function() {
                $state.go( 'index.setting', {}, {
                    reload: true
                } );
            };
            $scope.gotoUpdate = function() {
                if ( !ENV.fromWeb ) {
                    var url = ENV.website + '/' + ENV.updateFile;
                    $http.get( url )
                        .success( function( res ) {
                            var serverAppVersion = res.version;
                             $cordovaAppVersion.getVersionNumber().then( function( version ) {
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
                        .error( function( res ) {
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
            }
            $rootScope.$on( 'logout', function() {
                $scope.Status.Login = false;
                $ionicSideMenuDelegate.toggleLeft();
            } );
            $rootScope.$on( 'login', function() {
                $scope.Status.Login = true;
            } );
        }
]);
