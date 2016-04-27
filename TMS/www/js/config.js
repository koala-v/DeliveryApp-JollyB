'use strict';
var appConfig = angular.module('TMS.config',[]);
appConfig.constant('ENV', {
    'website':      'www.sysfreight.net/mobileapp-tms',
    'api':          'www.sysfreight.net/WebApi-tms',
    'port':         '8081', // http port no
    'debug':        true,
    'mock':         false,
    'fromWeb':      true,
    'appId':        '9CBA0A78-7D1D-49D3-BA71-C72E93F9E48F',
    'apkName':      'TMS',
    'updateFile':   'update.json',
    'rootPath':     'TMS',
    'configFile':   'config.txt',
    'version':      '1.0.1'
});
