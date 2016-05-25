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
    dbSql = 'DROP TABLE if exists Csbk1_Accept';
    tx.executeSql(dbSql, [], null, dbError);
    dbSql = "CREATE TABLE Csbk1_Accept (TrxNo INT,BookingNo TEXT, JobNo TEXT, StatusCode TEXT,BookingCustomerCode TEXT,Pcs INT,CollectionTimeStart TEXT,CollectionTimeEnd TEXT,PostalCode TEXT,BusinessPartyCode TEXT,BusinessPartyName TEXT,Address1 TEXT,Address2 TEXT,Address3 TEXT,Address4 TEXT,CompletedFlag TEXT,TimeFrom TEXT,TimeTo TEXT)";
    tx.executeSql(dbSql, [], null, dbError);
  });
  dbTms.transaction(function(tx) {
    dbSql = 'DROP TABLE if exists Csbk2_Accept';
    tx.executeSql(dbSql, [], null, dbError);
    dbSql = "CREATE TABLE Csbk2_Accept (TrxNo INT,LineItemNo INT, BoxCode TEXT, Status TEXT,Pcs INT,UnitRate TEXT,Volume TEXT,GrossWeight TEXT,CollectedPcs int,CollectedAmt TEXT,DepositAmt TEXT,DiscountAmt TEXT,AttachmentFlag TEXT,ItemNo INT)";
    tx.executeSql(dbSql, [], null, dbError);
  });
}
var db_del_Csbk1_Accept = function() {
  if (dbTms) {
    dbTms.transaction(function(tx) {
      dbSql = 'Delete from Csbk1_Accept';
      tx.executeSql(dbsql, [], null, dbError)
    });
  }
}
var db_add_Csbk1_Accept = function(Csbk1) {
  if (dbTms) {
    dbTms.transaction(function(tx) {
      Csbk1 = repalceObj(Csbk1);
      dbSql = 'INSERT INTO Csbk1_Accept(TrxNo,BookingNo,JobNo,StatusCode,BookingCustomerCode,Pcs,CollectionTimeStart,CollectionTimeEnd,PostalCode,BusinessPartyCode,BusinessPartyName,Address1,Address2,Address3,Address4,CompletedFlag,TimeFrom,TimeTo) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
      tx.executeSql(dbSql, [Csbk1.TrxNo,Csbk1.BookingNo, Csbk1.JobNo, Csbk1.StatusCode, Csbk1.BookingCustomerCode, Csbk1.Pcs, Csbk1.CollectionTimeStart, Csbk1.CollectionTimeEnd, Csbk1.PostalCode, Csbk1.BusinessPartyCode,Csbk1.BusinessPartyName, Csbk1.Address1, Csbk1.Address2, Csbk1.Address3, Csbk1.Address4,Csbk1.CompletedFlag,Csbk1.TimeFrom,Csbk1.TimeTo], null, dbError);
  });
  }
}
var db_add_Csbk2_Accept = function(Csbk2) {
  if (dbTms) {
    dbTms.transaction(function(tx) {
      Csbk2 = repalceObj(Csbk2);
      dbSql = 'INSERT INTO Csbk2_Accept(TrxNo,LineItemNo, BoxCode, Status,Pcs,UnitRate,Volume,GrossWeight,CollectedPcs,CollectedAmt,DepositAmt,DiscountAmt,AttachmentFlag,ItemNo) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
      tx.executeSql(dbSql, [Csbk2.TrxNo,Csbk2.LineItemNo, Csbk2.BoxCode, Csbk2.Status,Csbk2.Pcs,Csbk2.UnitRate,Csbk2.Volume,Csbk2.GrossWeight,Csbk2.CollectedPcs,Csbk2.CollectedAmt,Csbk2.DepositAmt,Csbk2.DiscountAmt,Csbk2.AttachmentFlag,Csbk2.ItemNo], null, dbError);
  });
  }
}

var onStrToURL = function(strURL) {
    if (strURL.length > 0 && strURL.indexOf('http://') < 0 && strURL.indexOf('HTTP://') < 0) {
        strURL = "http://" + strURL;
    }
    return strURL;
};

var db_update_Csbk1_Accept = function(Csbk1) {
  if (dbTms) {
    dbTms.transaction(function(tx) {
      dbSql = 'Update Csbk1_Accept set CompletedFlag=? where BookingNo=?';
      tx.executeSql(dbSql, [Csbk1.CompletedFlag, Csbk1.BookingNo], null, dbError);
    });
  }
}

var db_update_Csbk2_Accept = function(Csbk2) {
  if (dbTms) {
    dbTms.transaction(function(tx) {
      dbSql = 'Update Csbk2_Accept set CollectedPcs=?,CollectedAmt=? where TrxNo=? and LineItemNo=?';
      tx.executeSql(dbSql, [Csbk2.CollectedPcs, Csbk2.CollectedAmt,Csbk2.TrxNo,Csbk2.LineItemNo], null, dbError);
    });
  }
}
