//region Dependencies
let express = require('express'),
    app = express(),
    http = require('http').Server(app),
    appName = 'connectionTrial',
    dbUser = 'dev',
    dbPassword = 'dev001!';
//endregion

//region General Config
require('./server/config/config')(app, http);
require('./server/config/database/databaseConfig')('mongodb://localhost/' + appName);
/*require('./server/config/database/databaseConfig')('mongodb://'+ dbUser +':'+ dbPassword + '@ds013486.mlab.com:13486/heroku_lf75hpr5');*/
//endregion

//region Start App
let port = process.env.PORT || 80;
http.listen(port);
exports = module.exports = app;
console.log('Server opened at port ' + port);
//endregion