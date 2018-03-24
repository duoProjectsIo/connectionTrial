angular.module('trial')
    .service('trialService', trialService);

function trialService($resource, defineHost) {
    return {
        getTrials : $resource(defineHost.host + '/web/getTrials'),
        getKeywords : $resource(defineHost.host + '/web/getKeywords'),
        saveTrial : $resource(defineHost.host + '/web/saveTrial'),
        deleteTrial : $resource(defineHost.host + '/web/deleteTrial')
    }
}