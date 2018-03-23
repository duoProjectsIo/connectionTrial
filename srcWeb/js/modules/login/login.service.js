angular.module('login')
    .service('loginService', loginService)
    .factory('authInterceptor', authInterceptor)
    .config(function($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    });

function loginService($window, $resource, defineHost) {
    return {
        doSignUp: $resource(defineHost.host + '/web/doSignUp'),
        emailValidation: $resource(defineHost.host + '/web/emailValidation'),
        doLogin: $resource(defineHost.host + '/web/doLogin'),
        doLogout: function() {
            $window.localStorage.clear();
            $window.location.reload();
        }
    }
}

function authInterceptor($q, $window) {
    return {
        request: function(config) {
            config.headers = config.headers || {};

            if ($window.localStorage.token) {
                config.headers.Authorization = 'Bearer ' + $window.localStorage.token;
            }
            return config;
        },
        response: function(response) {
            if (response.status === 401) {
                console.log('denied');
            }
            return response || $q.when(response);
        }
    };
}