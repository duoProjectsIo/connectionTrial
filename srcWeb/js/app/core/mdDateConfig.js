angular
    .module('core')
    .config(function ($mdDateLocaleProvider) {
        $mdDateLocaleProvider.formatDate = function(date) {
            return moment(date).format('YYYY-MM-DD');
        };
    });