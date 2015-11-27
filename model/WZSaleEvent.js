'use strict';

var _ = require('lodash');

/**
 * @class WZEvent
 * @description
 * An event where the BUYER can purchase ITEMs.   
 * An OPPORTUNITY may be point in time (consignment sale, garage sale) 
 * or ongoing (consignment store
 */ 
function WZSaleEvent( request ) {
	if ( !_.isUndefined(request) ) {
		this.deserialize(request);
	} 
}

/**
 * @type {String}
 */ 
WZSaleEvent.prototype.name = undefined;

/**
 * @type {String}
 */ 
WZSaleEvent.prototype.description = undefined;

/**
 * @type {Date}
 */ 
WZSaleEvent.prototype.createdTS = undefined;

/**
 * @description
 * receives a 
 */ 
WZSaleEvent.prototype.deserialize = function deserialize(options) {
	
	this.name = _.has(options, 'name') ? options.name : undefined;
	this.description = _.has(options, 'description') ? options.description : undefined;
	this.createdTS = _.has(options, 'createdTS') ? options.createdTS : new Date();
	
}

module.exports = WZSaleEvent;