module.exports = function(app, http) {
    //region Dependencies
    let express = require('express'),
        bodyParser = require('body-parser'),
        methodOverride = require('method-override'),
        cors = require('cors'),
        consign = require('consign');
    //endregion

    //region Config
    app.use(bodyParser.json({ limit: '1000000000000000b' })); // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
    app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
    app.use(express.static(process.cwd()+'/public/'));
    app.use(cors({origin: 'http://localhost:3000', methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'}));
    app.use(cors({origin: 'http://192.168.1.103:80', methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'}));
    app.options('*', cors());
    //endregion

    //region Consign
    consign({
            cwd: './server/config',
            verbose: false
        })
        .include('models')
        .then('routes')
        .into(app);
    //endregion
};