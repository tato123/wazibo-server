'use strict';

var util = require('util'),
	logger = require('../logger');

module.exports = {
	port: 9080,
	fqdn: process.env.WAZIBO_API_URL,
	transport: process.env.WAZIBO_HTTP_TRANSPORT,
	url: function() {
		return util.format('%s://%s', this.transport, this.fqdn);
	},
	validate: function() {
		
		if (!process.env.WAZIBO_API_URL) {
			logger.error('Missing required environment variable [%s]', 'WAZIBO_API_URL')			
			return false;
		}

		if (!process.env.WAZIBO_HTTP_TRANSPORT) {
			logger.error('Missing required environment variable [%s]', 'WAZIBO_HTTP_TRANSPORT')			
			return false;
		}
		return true;
	}
}