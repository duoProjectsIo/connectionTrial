module.exports = function(app) {
    let path = require('path'),
        appDir = path.dirname(require.main.filename),
        multipart = require('connect-multiparty'),
        multiparty = require('multiparty'),
        expressJwt = require('express-jwt'),
        authenticate = expressJwt({
            secret: 'connectionTrial'
        });

    //region WEB Routes
    //region SignUp / doLogin
    let doSignUpWeb = require('./web/modules/login/doSignUp');
    app.post('/web/doSignUp', doSignUpWeb.doSignUp);

    let doLoginWeb = require('./web/modules/login/doLogin');
    app.post('/web/doLogin', doLoginWeb.doLogin);

    let emailValidationWeb = require('./web/modules/login/emailValidation');
    app.post('/web/emailValidation', emailValidationWeb.emailValidation);
    //endregion

    //region Trials
    let getTrialsWeb = require('./web/modules/trial/getTrials');
    app.get('/web/getTrials', getTrialsWeb.getTrials);

    let getKeywordsWeb = require('./web/modules/trial/getKeywords');
    app.get('/web/getKeywords', getKeywordsWeb.getKeywords);

    let saveTrialWeb = require('./web/modules/trial/saveTrial');
    app.post('/web/saveTrial', saveTrialWeb.saveTrial);

    let deleteTrialWeb = require('./web/modules/trial/deleteTrial');
    app.post('/web/deleteTrial', deleteTrialWeb.deleteTrial);
    //endregion
    //endregion

    //region Response
    app.get('*', function(req, res) {
        res.sendFile(appDir + '/public/index.html');
    });
    //endregion
};