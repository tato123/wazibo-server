'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var Identity = new Schema({
    provider        : String,
    accessToken    : String,
    expiresIn      : Number,
    userId         : String,
    isSocial        : Boolean
});

var User = new Schema({
    email            : String,
    email_verified   : {type:Boolean, default: false},
    displayName             : String,
    givenName       : String,
    familyName      : String, 
    photo          : String,   
    gender           : String,
    locale           : {type:String, default: 'en'},
    identities      : [Identity]
});

User.plugin(passportLocalMongoose, {
    usernameField: 'email',
    saltField: 'salt',
    hashField: 'hash',
    attemptsField: 'attempts',
    lastLoginField: 'last',
});

module.exports = mongoose.model('User', User);