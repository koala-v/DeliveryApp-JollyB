app.controller( 'SettingCtrl', [ 'ENV', '$scope', '$state', '$ionicHistory', '$ionicPopup', '$cordovaToast', '$cordovaFile',
  function( ENV, $scope, $state, $ionicHistory, $ionicPopup, $cordovaToast, $cordovaFile ) {
    $scope.Setting = {
      Version: ENV.version,
      WebApiURL: rmProtocol( ENV.api, ENV.port ),
      WebSiteUrl: rmProtocol( ENV.website, ENV.port ),
      WebPort: ENV.port,
      SSL: {
        checked: ENV.ssl === '0' ? false : true
      },
      blnWeb: ENV.fromWeb
    };
    var writeFile = function( path, file, data ) {
        $cordovaFile.writeFile( path, file, data, true )
            .then( function( success ) {
                var blnSSL = ENV.ssl === 0 ? false : true;
                ENV.website = appendProtocol( ENV.website, blnSSL, ENV.port );
                ENV.api = appendProtocol( ENV.api, blnSSL, ENV.port );
                $scope.return();
            }, function( error ) {
                $cordovaToast.showShortBottom( error );
                console.error( error );
            } );
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
      ENV.ssl = $scope.Setting.SSL.checked ? '1' : '0';
      var blnSSL = $scope.Setting.SSL.checked ? true : false;
      if ( is.not.empty( $scope.Setting.WebPort ) ) {
        ENV.port = $scope.Setting.WebPort;
      } else {
        $scope.Setting.WebPort = ENV.port;
      }
      if ( is.not.empty( $scope.Setting.WebApiURL ) ) {
        ENV.api = $scope.Setting.WebApiURL;
      } else {
        $scope.Setting.WebApiURL = rmProtocol( ENV.api, ENV.port );
      }
      if ( is.not.empty( $scope.Setting.WebSiteUrl ) ) {
        ENV.website = $scope.Setting.WebSiteUrl;
      } else {
        $scope.Setting.WebSiteUrl = rmProtocol( ENV.website, ENV.port );
      }
      if ( !ENV.fromWeb ) {
        var data =  'website=' + ENV.website +
                    '##api=' + ENV.api +
                    '##port=' + ENV.port;
        var path = cordova.file.externalRootDirectory;
        var file = ENV.rootPath + '/' + ENV.configFile;
        writeFile(path, file, data);
      } else {
        ENV.website = appendProtocol( ENV.website, blnSSL, ENV.port );
        ENV.api = appendProtocol( ENV.api, blnSSL, ENV.port );
        $scope.return();
      }
    };
    $scope.reset = function() {
      $scope.Setting.WebApiURL = ENV.reset.api;
      $scope.Setting.WebSiteUrl = ENV.reset.website;
      $scope.Setting.WebPort = ENV.reset.port;
      if ( !ENV.fromWeb ) {
        var path = cordova.file.externalRootDirectory;
        var file = ENV.rootPath + '/' + ENV.configFile;
        $cordovaFile.removeFile( path, file )
          .then( function( success ) {
              $scope.save();
          }, function( error ) {
              $cordovaToast.showShortBottom( error );
          } );
      }
    };
  }
] );
