'use strict';

var util = require('util');

module.exports = {
	host: process.env.MONGO_PORT_27017_TCP_ADDR || 'localhost',
	port: process.env.MONGO_PORT_27017_TCP_PORT || 27017,
	db: 'wazibo',
	url: function() {
		return util.format('mongodb://%s:%s/%s', this.host, this.port, this.db )
	}
};