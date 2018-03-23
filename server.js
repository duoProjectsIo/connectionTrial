//region Dependencies
let express = require('express'),
    app = express(),
    http = require('http').Server(app),
    appName = 'connectionTrial';
//endregion

//region General Config
require('./server/config/config')(app, http);
require('./server/config/database/databaseConfig')('mongodb://localhost/' + appName);
//endregion

//region Start App
let port = process.env.PORT || 80;
http.listen(port);
exports = module.exports = app;
console.log('Server opened at port ' + port);
//endregion