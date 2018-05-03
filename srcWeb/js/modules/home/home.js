angular.module('home', [])
    .controller('homeController', home);

function home(dialogAdvanced) {
    var home = this;
    home.vars = {};

    home.functions = {
        core: function() {},
    };

}