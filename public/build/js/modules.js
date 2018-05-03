(function(){
"use strict";
angular.module('modules', [
    'home',
    'trial',
    'login'
]);
})();
(function(){
"use strict";
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
})();
(function(){
"use strict";
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
})();
(function(){
"use strict";
angular.module('trial', [])
    .controller('trialController', trial);

function trial($scope, $filter, trialService, profileGet, dialogAdvanced, dialogAlert, dialogConfirm) {
    var trial = this;
    trial.vars = {};

    trial.functions = {
        core : function () {
            trial.functions.defineVars();
            trial.functions.getTrials.getTrials();
            trial.functions.search();
        },

        defineVars : function () {
            trial.vars.filter = false;
            trial.vars.query = {
                order: '-briefTitle',
                limit: 25,
                page: 1
            };
        },

        closeFilter : function () {
            trial.vars.filter = false;
            trial.vars.search = '';
        },

        getTrials : {
            getTrials: function () {
                trialService.getTrials.get(trial.functions.getTrials.successGetTrials);
            },

            successGetTrials : function (data) {
                if(data.status){
                    trial.vars.listTrials = data.data;
                    trial.vars.listTrialsFilter = trial.vars.listTrials;
                }
            }
        },

        search : function () {
            $scope.$watch('trial.vars.search', function (newvalue, oldvalue) {
                if(newvalue < oldvalue){
                    trial.vars.listProductsFilter = trial.vars.listTrials
                }else{
                    trial.vars.listTrialsFilter = $filter('filter')(trial.vars.listTrials, {
                        briefTitle : newvalue
                    });
                }
            });
        },

        saveTrial : function (data) {
            dialogAdvanced.show({
                controller : saveTrialController,
                controllerAs : 'saveTrial',
                templateUrl : 'templates/modules/trial/saveTrial.html',
                clickOutsideToClose : false,
                dataToDialog : data,
                functionThen : function () {
                    dialogAlert.show({
                        title : 'Sucesso!',
                        content : 'Seu Trial foi salvo com sucesso!',
                        ok : 'OK!'
                    });
                    trial.functions.getTrials.getTrials();
                },
                functionCancel : function () {
                    trial.functions.getTrials.getTrials();
                }
            });
        },

        deleteTrial : function (data) {
            dialogConfirm.show({
                title : 'Atenção!',
                textContent : 'Deseja realmente deletar este trial?',
                ok : 'Sim',
                cancel : 'Cancelar',
                confirmFunction : function () {
                    trialService.deleteTrial.save(data, function () {
                        dialogAlert.show({
                            title : 'Trial deletado!',
                            content : 'Seu trial foi deletado com sucesso.',
                            ok : 'OK'
                        });
                        trial.functions.getTrials.getTrials();
                    });
                }
            });
        }
    };

    trial.functions.core();
}

function saveTrialController(dialogAdvanced, toastAction, trialService, profileGet, data, dialogAlert, chipSimpleToList, $scope) {
    var saveTrial = this;
    saveTrial.vars = {};

    saveTrial.functions = {
        core: function (salveAndNew) {
            saveTrial.functions.defineVars(salveAndNew);
            saveTrial.functions.getKeywords().then(function () {
                saveTrial.functions.prepareChips();
            });
        },

        defineVars : function (salveAndNew) {
            if(data && !salveAndNew) {
                saveTrial.vars = data;
            }else{
                saveTrial.vars = {
                    firstSubmittedDate : { value : null, status : false},
                    firstPostedDate : { value : null, status : false},
                    lastUpdatePostedDate : { value : null, status : false},
                    startDate : { value : null, status : false},
                    estimatedPrimaryCompletionDate : { value : null, status : false},
                    currentPrimaryOutcomeMeasures : { value : null, status : false},
                    originalPrimaryOutcomeMeasures : { value : null, status : false},
                    changeHistory : { value : null, status : false},
                    currentSecondaryOutcomeMeasures : { value : null, status : false},
                    originalSecondaryOutcomeMeasures : { value : null, status : false},
                    currentOtherOutcomeMeasures : { value : null, status : false},
                    originalOtherOutcomeMeasures : { value : null, status : false},

                    //Descriptive Information
                    briefTitle : { value : null, status : false},
                    officialTitle : { value : null, status : false},
                    briefSummary : { value : null, status : false},
                    detailedDescription : { value : null, status : false},
                    studyType : { value : null, status : false},
                    studyPhase : { value : null, status : false},
                    studyDesign : { value : null, status : false},
                    condition : { value : null, status : false},
                    intervention : { value : null, status : false},
                    studyArms : { value : null, status : false},
                    publications : { value : null, status : false},

                    //Recruitment Information
                    recruitmentStatus : { value : null, status : false},
                    estimatedEnrollment : { value : null, status : false},
                    eligibilityCriteria : { value : null, status : false},
                    gender : { value : null, status : false},
                    ages : { value : null, status : false},
                    acceptsHealthyVolunteers : { value : null, status : false},
                    contacts : { value : null, status : false},
                    listedLocationCountries : { value : null, status : false},
                    removedLocationCountries : { value : null, status : false},

                    //Administrative Information
                    NCTNumber : { value : null, status : false},
                    otherStudyIDNumbers : { value : null, status : false},
                    hasDataMonitoringCommittee : { value : null, status : false},
                    USFDARegulatedProduct : { value : null, status : false},
                    IPDSharingStatement : { value : null, status : false},
                    responsibleParty : { value : null, status : false},
                    studySponsor : { value : null, status : false},
                    collaborators : { value : null, status : false},
                    investigators : { value : null, status : false},
                    PRSAccount : { value : null, status : false},
                    verificationDate : { value : null, status : false},

                    keywords : []
                }
            }

            saveTrial.vars.tags = {};
            saveTrial.vars.profile = profileGet;
            saveTrial.vars.tinymceOptions = {
                selector: 'textarea',
                plugins: 'print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern',
                toolbar: 'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat'
            }
        },

        getKeywords : function () {
            return new Promise(function (success) {
                trialService.getKeywords.get(function (data) {
                    if(data.status){
                        saveTrial.vars.tags.arrayValues = [];
                        data.data.forEach(function (value) {
                            saveTrial.vars.tags.arrayValues.push(value.keywords);
                        });
                    }else {
                        saveTrial.vars.tags.arrayValues = [];
                    }
                    success();
                });
            })
        },

        prepareChips : function () {
            saveTrial.vars.tags = chipSimpleToList.show({
                readonly : false,
                selectedItem : null,
                searchText : saveTrial.vars.tags.searchText,
                autoCompleteDemoRequireMatch : null,
                selectedValues : [],
                arrayValues : saveTrial.vars.tags.arrayValues
            });
        },

        hide : function () {
            saveTrial.vars = {};
            dialogAdvanced.hide();
        },

        cancel : function () {
            saveTrial.vars = {};
            dialogAdvanced.cancel();
        },

        save : {
            doSave : function () {
                trialService.saveTrial.save(saveTrial.vars, saveTrial.functions.save.successSaveTrial);
            },

            successSaveTrial : function (data) {
                saveTrial.functions.hide();
            }
        },

        saveAndNew : {
            doSave : function () {
                trialService.saveTrial.save(saveTrial.vars, saveTrial.functions.saveAndNew.successSaveTrial);
            },

            successSaveTrial : function (data) {
                toastAction.show({
                    top : false,
                    bottom : true,
                    left : false,
                    right : true,
                    text : 'Trial salvo!',
                    scope : saveTrial
                });
                saveTrial.functions.core(true);
            }
        }
    };

    saveTrial.functions.core();
}
})();
(function(){
"use strict";
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
})();
(function(){
"use strict";
angular.module('home', [])
    .controller('homeController', home);

function home(dialogAdvanced) {
    var home = this;
    home.vars = {};

    home.functions = {
        core: function() {},
    };

}
})();