angular
    .module('core')
    .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('grey', {
                'default' : '800'
            })
            .accentPalette('blue')
            .warnPalette('orange');
    });