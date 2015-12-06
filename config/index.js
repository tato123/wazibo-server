'use strict';

var env = process.env.NODE_ENV || 'development';
var config = require('./config.json');

module.exports = {
	config: config
};