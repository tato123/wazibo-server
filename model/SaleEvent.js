'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	timestamps = require('mongoose-timestamp');

var SaleEvent = new Schema({
    name		: String,    
	description	: String,
	_creator	: { type: Schema.ObjectId, ref: 'User' },
	contributors: [{ type: Schema.ObjectId, ref: 'User' }],
	items		: Array,
	photos		: Array,
	attic		: Boolean
});

SaleEvent.plugin(timestamps);

module.exports = mongoose.model('SaleEvent', SaleEvent);