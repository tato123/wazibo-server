'use strict';

/**
 * @class WZItem
 * @description
 * A physical item that can be sold or transfered
 */ 
function WZItem() {
	
}

/**
 * @type {String}
 */ 
WZItem.prototype.name = undefined;

/**
 * @type {String}
 */ 
WZItem.prototype.price = undefined;

/**
 * @type {Array}
 */ 
WZItem.prototype.photos = undefined;

/**
 * @type {String}
 */ 
WZItem.prototype.description = undefined;


module.exports = WZItem;