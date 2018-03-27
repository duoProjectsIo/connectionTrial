angular.module('login', [])
    .controller('loginController', login);

function login($scope, $filter, $window, loginService, profileGet, dialogAdvanced, dialogAlert, dialogConfirm) {
    var login = this;
    login.vars = {};

    login.functions = {
        core: function() {
            login.functions.watchMatch();
        },

        watchMatch: function() {
            $scope.$watchGroup(['login.vars.signUpPassword', 'login.vars.repassword'], function(value) {
                console.log(value);
                if (value[0] !== value[1]) {
                    $scope.signUpForm.password.$setValidity('notMatch', false);
                    $scope.signUpForm.repassword.$setValidity('notMatch', false);
                } else {
                    $scope.signUpForm.password.$setValidity('notMatch', true);
                    $scope.signUpForm.repassword.$setValidity('notMatch', true);
                }
            });
        },

        doLogin: function() {
            loginService.doLogin.save(login.vars, function(data) {
                switch (true) {
                    case data.status === true:
                        login.vars.alert = false;

                        $window.localStorage.token = data.token;
                        $window.location.reload();
                        break;

                    case data.status === false:
                        $scope.loginForm.email.$setValidity('userPassFound', false);
                        $scope.loginForm.password.$setValidity('userPassFound', false);
                        break;

                    default:
                        $scope.loginForm.email.$setValidity('userPassFound', false);
                        $scope.loginForm.password.$setValidity('userPassFound', false);
                }
            });
        },

        doSignUp: function() {
            loginService.doSignUp.save(login.vars, function(data) {
                switch (true) {
                    case data.status === true:
                        login.vars.message = 'Você foi cadastrado com sucesso!';
                        $window.localStorage.token = data.token;
                        $window.location.reload();
                        break;

                    case data.status === false:
                        login.vars.message = data.message;
                        break;

                    default:
                        login.vars.message = 'Alguma coisa deu errado, tente novamente :(!';
                }

                dialogAlert.show({
                    title: 'Atenção',
                    content: login.vars.message,
                    ok: 'Ok'
                });
            });
        },

        emailChange: function() {
            loginService.emailValidation.save(login.vars, function(data) {
                switch (true) {
                    case data.status === true:
                        $scope.signUpForm.email.$setValidity('userExist', true);
                        break;

                    case data.status === false:
                        $scope.signUpForm.$valid = false;
                        $scope.signUpForm.email.$setValidity('userExist', false);
                        login.vars.message = data.message;
                        break;

                    default:
                        login.vars.message = data.message;
                }
            })
        },
    };

    login.functions.core();
}