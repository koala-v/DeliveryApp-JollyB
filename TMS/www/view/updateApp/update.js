app.controller( 'UpdateCtrl', [ 'ENV', '$scope', '$state', '$stateParams', '$ionicPopup', 'DownloadFileService',
    function( ENV, $scope, $state, $stateParams, $ionicPopup, DownloadFileService ) {
        var alertPopup = null,
          alertPopupTitle = '';
        $scope.strVersion = $stateParams.Version;
        $scope.return = function() {
          $state.go( 'index.login', {}, {
            reload: true
          } );
        };
        var onDownloadError = function() {
          alertPopupTitle = 'Dowload Failed';
          alertPopup = $ionicPopup.alert( {
            title: alertPopupTitle,
            okType: 'button-assertive'
          } );
          alertPopup.then( function( res ) {
            $scope.return();
          } );
        };
        $scope.upgrade = function() {
          DownloadFileService.Download( ENV.website + '/' + ENV.apkName + '.apk', ENV.apkName + '.apk', 'application/vnd.android.package-archive', null, null, onDownloadError );
        };
    }
] );
