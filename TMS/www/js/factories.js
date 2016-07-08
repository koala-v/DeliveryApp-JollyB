var appFactory = angular.module( 'TMS.factories', [
    'TMS.services'
] );

appFactory.factory( 'ACCEPTJOB_ORM', function () {
    var ACCEPTJOB_ORM = {
        LIST: {
            Csbk1s: {},
            _setCsbk: function ( value ) {
                this.Csbk1s = value;
            }
        }
    };
    ACCEPTJOB_ORM.init = function () {
        this.LIST.Csbk1s = {};
    };
    return ACCEPTJOB_ORM;
} );

appFactory.factory( 'TABLE_DB', function () {
    var TABLE_DB = {
        Csbk1: {
            TrxNo: 'INT',
            BookingNo: 'TEXT',
            JobNo: 'TEXT',
            StatusCode: 'TEXT',
            BookingCustomerCode: 'TEXT',
            Pcs: 'INT',
            CollectionTimeStart: 'TEXT',
            CollectionTimeEnd: 'TEXT',
            PostalCode: 'TEXT',
            BusinessPartyCode: 'TEXT',
            BusinessPartyName: 'TEXT',
            Address1: 'TEXT',
            Address2: 'TEXT',
            Address3: 'TEXT',
            Address4: 'TEXT',
            CompletedFlag: 'TEXT',
            TimeFrom: 'TEXT',
            TimeTo: 'TEXT',
            ColTimeFrom: 'TEXT',
            ColTimeTo: 'TEXT',
            CompletedDate: 'TEXT',
            DriverId: 'TEXT',
            CollectedAmt: 'INT',
            ScanDate: 'TEXT',
            DriverCode: 'TEXT'
        }
    };
    return TABLE_DB;
} );
