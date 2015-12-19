'use strict';

// express and socketio
var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    compression = require('compression'),
    passport = require('passport'),
    passportConfig = require('./config/passport')(passport),
    x_no_compress = require('./middleware/x-no-compress'),
    serverConfig = require('./config/server'),
    mongoConfig = require('./config/mongo'),
    util = require('util'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    logger = require('./logger'),
    User = require('./model/User');


logger.info('--------------------------------------------');
logger.info('[Wazibo Server] Starting with environment...');
logger.info(process.env);
logger.info('--------------------------------------------');

// setup our middleware
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(compression({ filter: x_no_compress }));
app.use(express.static(__dirname +'/public/api'));

// configure our express instance
app.disable('x-powered-by');

// load our routes
require('express-load-routes')(app, './routes');

// connect to mongodb
logger.info('[Connect mongodb] connecting to url %s', mongoConfig.url());
mongoose.connect(mongoConfig.url());
    
// startup our server
logger.info('[Wazibo Server] Bootstrapping environment...');
server.listen(serverConfig.port, function () {        
    logger.info('[Wazibo Server] Server available at %s', serverConfig.port);        
});