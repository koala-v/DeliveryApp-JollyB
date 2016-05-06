var appFactory = angular.module('TMS.factories', [
    'TMS.services'
]);

appFactory.factory('ACCEPTJOB_ORM', function() {
    var ACCEPTJOB_ORM = {
        LIST: {
            Tobk1s: {},
            _setTobk: function(value) {
                this.Tobk1s = value;
            }
        }
    };
    ACCEPTJOB_ORM.init = function() {
        this.LIST.Tobk1s = {};
    };
    return ACCEPTJOB_ORM;
});
