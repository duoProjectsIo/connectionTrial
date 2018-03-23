angular
    .module('core')
    .run(function($rootScope, $window, $state, jwtHelper, loginService) {
        $rootScope.$on('$stateChangeStart', function (e, toState) {
            window.scrollTo(0, 0);
            var token = $window.localStorage.token;

            if (token !== undefined) {
                if (jwtHelper.isTokenExpired(token)) {
                    loginService.doLogout();
                }
            }

            if ((toState.name.indexOf('admin') > -1) && token === undefined) {
                e.preventDefault();
                $window.localStorage.clear();
                $state.go('login');
            }else if (toState.name.indexOf('login') > -1 && token !== undefined) {
                e.preventDefault();
                $state.go('admin.trial');
            }
        });
    });