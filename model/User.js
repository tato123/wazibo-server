'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	local            : {
        email        : String,
        password     : String,
        provider     : { type: String, default: 'local' }
    },
    facebook         : {
        id           : String,
        displayName  : String,
        name         : Object,
        accessToken  : String,
        refreshToken : String,
        emails       : Array,                
        photos       : Array,
        provider     : { type: String, default: 'facebook' }         
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String,
        provider     : { type: String, default: 'twitter' }
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String,
        provider     : { type: String, default: 'google' }
    }
});

module.exports = mongoose.model('User', User);