'use strict';

var util = require('util'),
	logger = require('../logger');

module.exports = {
	host: process.env.WAZIBO_MONGO_PORT_27017_TCP_ADDR || 'localhost',
	port: process.env.WAZIBO_MONGO_PORT_27017_TCP_PORT || 27017,
	db: 'wazibo',
	url: function() {
		return util.format('mongodb://%s:%s/%s', this.host, this.port, this.db )
	},
	validate: function() {
		
		if (!process.env.WAZIBO_MONGO_PORT_27017_TCP_ADDR) {
			logger.error('Missing required environment variable [%s]', 'MONGO_PORT_27017_TCP_ADDR')			
			return false;
		}

		if (!process.env.WAZIBO_MONGO_PORT_27017_TCP_PORT) {
			logger.error('Missing required environment variable [%s]', 'MONGO_PORT_27017_TCP_PORT')			
			return false;
		}
		return true;
	}
};