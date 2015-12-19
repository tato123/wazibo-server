'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    timestamps = require('mongoose-timestamp');

var SaleMedia = new Schema({
    imageUrl    : String,
    _creator	: { type: Schema.ObjectId, ref: 'User' },
});

SaleMedia.plugin(timestamps);

module.exports = mongoose.model('SaleMedia', SaleMedia);