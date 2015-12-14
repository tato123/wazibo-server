'use strict';

module.exports = {
	host: process.env.MONGO_PORT_27017_TCP_ADDR || 'localhost',
	port: process.env.MONGO_PORT_27017_TCP_PORT || 27017
};