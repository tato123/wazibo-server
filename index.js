'use strict';

// express and socketio
var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    compression = require('compression'),
    passport = require('passport'),
    session = require('express-session'),
    x_no_compress = require('./middleware/x-no-compress'),
    serverConfig = require('./config/server'),
    mongoConfig = require('./config/mongo'),
    util = require('util');

// express middleware
var bodyParser = require('body-parser');

// database client
var mongoose = require('mongoose'),
    User = require('./model/User');

/**
 * @name bootstrap
 * @description
 * Bootstrapping function, responsible for starting up the server
 * and loading each of the required pieces. Split into functions
 * to better articulate what each step should do and isolate steps
 */
function bootstrap() {
    console.log('--------------------------------------------');
    console.log('[Wazibo Server] Starting with environment...');
    console.log(process.env);
    console.log('--------------------------------------------');

    loadMiddleware();
    loadExpressOptions();
    loadRestEndpoints();
    connectMongodb();
    

    console.log('[Wazibo Server] Bootstrapping environment...');
    server.listen(serverConfig.port, function () {        
        console.log('[Wazibo Server] Server available at %s', serverConfig.port);        
    });
}

/**
 * @description
 * Certain express parameters should be tuned for performance and security
 * considerations.
 */ 
function loadExpressOptions() {
    app.disable('x-powered-by');
}

/**
 * @name connectMongodb
 * @description
 * Handles connecting to our mongodb source 
 */
function connectMongodb() {
    var host =  mongoConfig.host;
    var port = mongoConfig.port;
    var url = util.format('mongodb://%s:%s/mydatabase', host, port);
    console.log('[Connect mongodb] connecting to url %s', url);
    mongoose.connect(url);
};

/**
 * @name loadMiddlware
 * @description
 * Load all of our specified middlware that is required
 * for this application. This doesn't preclude dynamically adding 
 * more middleware, just the initial set of middleware required to
 * get running.
 */
function loadMiddleware() {
    app.use(bodyParser.json());
    app.use(compression({ filter: x_no_compress }));

    app.use(session({
        secret: 'test session',
        resave: false,
        saveUninitialized: true
    }));    
    app.use(express.static(__dirname +'/public/api'));
}

function loadRestEndpoints() {
    // load the dynamic routes from the routes folder
    // require the module and pass the  
    // express instance 
    require('express-load-routes')(app, './routes');
}

if (!module.parent) {
    bootstrap();
}