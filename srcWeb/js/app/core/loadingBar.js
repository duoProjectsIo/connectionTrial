angular
    .module('core')
    .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
        cfpLoadingBarProvider.includeBar = true;
        cfpLoadingBarProvider.loadingBarTemplate = '<div id="loading-bar"><div class="bar"><div class="peg"></div></div></div>';
    }]);