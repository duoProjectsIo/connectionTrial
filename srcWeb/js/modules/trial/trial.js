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