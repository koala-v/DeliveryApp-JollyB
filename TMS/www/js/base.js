var appendProtocol = function(url, blnSSL, portNo) {
  if (url.length > 0 && url.toUpperCase().indexOf('HTTPS://') < 0 && url.toUpperCase().indexOf('HTTP://') < 0) {
    if (blnSSL) {
      url = 'https://' + url;
    } else {
      var aURL = url.split('/');
      if (aURL[0].indexOf(':') < 0) {
        url = 'http://' + aURL[0] + ':' + portNo;
      } else {
        url = 'http://' + aURL[0];
      }
      for (var i = 1; i < aURL.length; i++) {
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
var checkDatetime = function(datetime) {
  if (is.equal(moment(datetime).format('DD-MMM-YYYY'), '01-Jan-0001')) {
    datetime = '';
  }
  if (is.not.empty(datetime)) {
    datetime = moment(datetime).format('DD-MMM-YYYY');
  }
  return datetime;
};
var repalceObj = function(obj) {
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      if (is.null(obj[i])) {
        obj[i] = '';
      }
      if (is.undefined(obj[i])) {
        obj[i] = '';
      }
      if (is.equal(obj[i], 'undefined')) {
        obj[i] = '';
      }
    }
  }
  return obj;
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
  dbTms.transaction(function(tx) {
    dbSql = 'DROP TABLE if exists Tobk1_Accept';
    tx.executeSql(dbSql, [], null, dbError);
    dbSql = "CREATE TABLE Tobk1_Accept (BookingNo TEXT, JobNo TEXT, JobType TEXT,CustomerCode TEXT,CustomerName TEXT,CustomerRefNo TEXT,CompletedFlag TEXT,DeliveryEndDateTime TEXT,TotalPcs int,ToAddress1 TEXT,ToAddress2 TEXT,ToAddress3 TEXT,ToAddress4 TEXT,UomCode TEXT)";
    tx.executeSql(dbSql, [], null, dbError);
  });
}
var db_del_Tobk1_Accept = function() {
  if (dbTms) {
    dbTms.transaction(function(tx) {
      dbSql = 'Delete from Tobk1_Accept';
      tx.executeSql(dbsql, [], null, dbError)
    });
  }
}
var db_add_Tobk1_Accept = function(Tobk1) {
  if (dbTms) {
    dbTms.transaction(function(tx) {
      Tobk1 = repalceObj(Tobk1);
      dbSql = 'INSERT INTO Tobk1_Accept(BookingNo,JobNo,JobType,CustomerCode,CustomerName,CustomerRefNo,CompletedFlag,DeliveryEndDateTime,TotalPcs,ToAddress1,ToAddress2,ToAddress3,ToAddress4,UomCode) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
      tx.executeSql(dbSql, [Tobk1.BookingNo, Tobk1.JobNo, Tobk1.JobType, Tobk1.CustomerCode, Tobk1.CustomerName, Tobk1.CustomerRefNo, Tobk1.CompletedFlag, Tobk1.DeliveryEndDateTime, Tobk1.TotalPcs, Tobk1.ToAddress1, Tobk1.ToAddress2, Tobk1.ToAddress3, Tobk1.ToAddress4, Tobk1.UomCode], null, dbError);

    });
  }
}

var db_update_Tobk1_Accept = function(Tobk1) {
  if (dbTms) {
    dbTms.transaction(function(tx) {
      dbSql = 'Update Tobk1_Accept set CompletedFlag=? where BookingNo=?';
      tx.executeSql(dbSql, [Tobk1.CompletedFlag, Tobk1.BookingNo], null, dbError);
    });
  }
}
