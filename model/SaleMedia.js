'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SaleMedia = new Schema({
    imageUrl: String
});

module.exports = mongoose.model('saleMedia', SaleMedia);