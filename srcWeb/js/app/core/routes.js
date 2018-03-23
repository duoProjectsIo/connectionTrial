angular
    .module('core')
	.config(function ($stateProvider, $urlRouterProvider, $locationProvider, stateHelperProvider) {
        //region URLPROVIDER
        $urlRouterProvider.otherwise('/home');

        $urlRouterProvider.when('/admin', '/admin/trial');
        $urlRouterProvider.when('/home', '/');
        //endregion

        stateHelperProvider
            .state({
                name: 'home',
                url: '/',
                controller: 'homeController',
                controllerAs: 'home',
                templateUrl: 'templates/modules/home/home.html'
            })

            .state({
                name: 'login',
                url: '/login',
                controller: 'loginController',
                controllerAs: 'login',
                templateUrl: 'templates/modules/login/login.html'
            })

			.state({
                name: 'admin',
                url: '/admin',
                abstract: true,
                templateUrl: "templates/app/layout/layout.html",
                children: [
                    //region Trial
                    {
                        name: 'trial',
                        url: '/trial',
                        controller: 'trialController',
                        controllerAs: 'trial',
                        templateUrl: 'templates/modules/trial/trial.html'
                    },
                    //endregion
                ]
			});

        $locationProvider.html5Mode(true);
	});