'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
	local            : {        
        accessToken  : String,
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

User.plugin(passportLocalMongoose, {
    usernameField: 'local.email',
    saltField: 'local.salt',
    hashField: 'local.hash',
    attemptsField: 'local.attempts',
    lastLoginField: 'local.last',
});

module.exports = mongoose.model('User', User);