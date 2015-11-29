'use strict';

// express and socketio
var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    compression = require('compression'),
    passport = require('passport'),
    session = require('express-session'),
    exphbs  = require('express-handlebars'),
    util = require('util');

// express middleware
var bodyParser = require('body-parser');

// file system libraries
var path = require('path'),
    fs = require('fs');

// utilitiy libraries
var _ = require('lodash');

// database client
var mongoose = require('mongoose'),
    User = require('./model/User');



/**
 * @class  
 * @description 
 * Our server object
 */
function Server() {
    this.PORT = 9080;
}

function shouldCompress(req, res) {
    if (req.headers['x-no-compression']) {
        // don't compress responses with this request header
        return false
    }

    // fallback to standard filter function
    return compression.filter(req, res)
};

Server.prototype.connectMongodb = function () {
    var host = process.env.MONGO_PORT_27017_TCP_ADDR || 'localhost';
    var port = process.env.MONGO_PORT_27017_TCP_PORT || '27017';
    var url = util.format('mongodb://%s:%s/mydatabase', host, port);
    console.log('[Connect mongodb] connecting to url %s', url);
    mongoose.connect(url);
};

Server.prototype.exportConfig = function () {
    var env = process.env.NODE_ENV || 'development';
    this.config = require('./config/' + env + '.json');
    module.exports = {
        config: this.config
    };
};

/**
 * @name loadPassportStrategies
 * @description
 * Load each of our passport strategies that we would like to include
 * or support as part of this service
 */
Server.prototype.loadPassportStrategies = function () {
    require('./authenticate/fb');
    
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
 * @description
 * Load all of our 
 */
Server.prototype.loadMiddleware = function () {
    app.engine('handlebars', exphbs({}));
    app.set('view engine', 'handlebars');
    app.use(bodyParser.json());    
    app.use(compression({ filter: shouldCompress }));

    app.use(session({
        secret: 'test session',
        resave: false,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    
}

Server.prototype.loadRestEndpoints = function () {
    // load the dynamic routes from the routes folder
    // require the module and pass the  
    // express instance 
    require('express-load-routes')(app, './routes');
}

Server.prototype.bootstrap = function () {
    var self = this;
    this.exportConfig();
    this.loadMiddleware();
    this.loadPassportStrategies();
    this.loadRestEndpoints();
    this.connectMongodb();

    console.log('Bootstrapping environment...');
    server.listen(this.PORT, function () {
        var host = '0.0.0.0';
        var port = self.PORT;
        console.log('Listening at http://%s:%s', host, port);
    });
}

if (!module.parent) {
    (new Server()).bootstrap();
}