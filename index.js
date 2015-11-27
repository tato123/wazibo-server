'use strict';

// express and socketio
var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    compression = require('compression');

// express middleware
var bodyParser = require('body-parser');

// file system libraries
var path = require('path'),
    fs = require('fs');

// utilitiy libraries
var _ = require('lodash');

// database client
var db = require('./data/client');


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
}

Server.prototype.connectMongodb = function () {
    // Connect to Mongo on start
    db.connect('mongodb://localhost:27017/mydatabase', function (err) {
        if (err) {
            console.log('Unable to connect to Mongo.')
            process.exit(1)
        } else {
            app.listen(3000, function () {
                console.log('Listening on port 3000...')
            })
        }
    });
}

Server.prototype.exportConfig = function() {
    var env = process.env.NODE_ENV || 'development';
    this.config = require('./config/' + env + '.json'); 
    module.exports = {
        config: this.config
    };
}

/**
 * @description
 * Load all of our 
 */
Server.prototype.loadMiddleware = function () {
    app.use(bodyParser.json());
    app.use(compression({ filter: shouldCompress }))
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