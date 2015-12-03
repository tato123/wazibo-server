'use strict';

// express and socketio
var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    compression = require('compression'),
    passport = require('passport'),
    session = require('express-session'),
    x_no_compress = require('./middleware/x-no-compress'),
    config = require('./config').config,
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

    loadMiddleware();
    loadPassportStrategies();
    loadRestEndpoints();
    connectMongodb();

    console.log('Bootstrapping environment...');
    server.listen(config.port, function () {
        var host = '0.0.0.0';
        var port = config.port;
        console.log('Listening at http://%s:%s', host, port);
    });
}

/**
 * @name connectMongodb
 * @description
 * Handles connecting to our mongodb source 
 */ 
function connectMongodb() {
    var host = process.env.MONGO_PORT_27017_TCP_ADDR || 'localhost';
    var port = process.env.MONGO_PORT_27017_TCP_PORT || '27017';
    var url = util.format('mongodb://%s:%s/mydatabase', host, port);
    console.log('[Connect mongodb] connecting to url %s', url);
    mongoose.connect(url);
};

/**
 * @name loadPassportStrategies
 * @description
 * Load each of our passport strategies that we would like to include
 * or support as part of this service. In addition we are handling
 * serialization / deserialziation of user object here since our strategies
 * should all conform to this dataset.
 */
 function loadPassportStrategies() {
    require('./authenticate/facebook');
    
    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
}

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
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static('public/api'));
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