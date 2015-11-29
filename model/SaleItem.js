'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SaleItem = new Schema({
	id: String,
    name: String,    
	price: String,
	photos: String,
	description: String,
});

module.exports = mongoose.model('saleItem', SaleItem);