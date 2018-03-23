angular.module('trial')
    .service('trialService', trialService);

function trialService($resource, defineHost) {
    return {
        getTrials : $resource(defineHost.host + '/web/getTrials'),
        saveTrial : $resource(defineHost.host + '/web/saveTrial')
    }
}