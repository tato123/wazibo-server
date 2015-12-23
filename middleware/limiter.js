'use strict';

var rateLimit = require('express-rate-limit'),
	logger = require('../logger');
	
module.exports = rateLimit();