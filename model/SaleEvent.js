'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SaleEvent = new Schema({
    name: String,    
	description: String,
	created: Date
});

module.exports = mongoose.model('saleEvent', SaleEvent);