'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  timestamps = require('mongoose-timestamp');

var SaleItem = new Schema({
  name        : String,
  price       : String,
  photos      : [{ type: Schema.Types.ObjectId, ref: 'SaleMedia' }],
  description : String,
  _creator: { type: Schema.ObjectId, ref: 'User' }
});

SaleItem.plugin(timestamps);

module.exports = mongoose.model('SaleItem', SaleItem);