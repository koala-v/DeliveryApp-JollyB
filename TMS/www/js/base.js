var appendProtocol = function(url, blnSSL, portNo) {
    if (url.length > 0 && url.toUpperCase().indexOf('HTTPS://') < 0 && url.toUpperCase().indexOf('HTTP://') < 0) {
        if(blnSSL){
            url = 'https://' + url;
        }else{
            var aURL = url.split('/');
            if(aURL[0].indexOf(':') < 0){
                url = 'http://' + aURL[0] + ':' + portNo;
            }else{
                url = 'http://' + aURL[0];
            }
            for(var i=1; i<aURL.length; i++){
                url = url + '/' + aURL[i];
            }
        }
    }
    return url;
};
var rmProtocol = function(url) {
    if (url.length > 0) {
        var regex = /(https?:\/\/)?/gi;
        url = url.replace(regex, '');
    }
    return url;
};

var dbInfo = {
    dbName: 'TmsDB',
    dbVersion: '1.0',
    dbDisplayName: 'TMS Database',
    dbEstimatedSize: 10 * 11024 * 1024
};
var dbSql = '';
function dbError(tx, error) {
    console.log(error.message);
}
var dbTms = window.openDatabase(dbInfo.dbName, dbInfo.dbVersion, dbInfo.dbDisplayName, dbInfo.dbEstimatedSize);
if (dbTms) {
    dbTms.transaction(function (tx) {
        dbSql = 'DROP TABLE if exists Tobk1_Accept';
        tx.executeSql(dbSql, [], null, dbError);
        dbSql = "CREATE TABLE Tobk1_Accept (BookingNo TEXT, JobNo TEXT)";
        tx.executeSql(dbSql, [], null, dbError);
    });
}
