'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	id: String,
	firstName: String,
	lastName: String,
	email: String
});

module.exports = mongoose.model('user', User);