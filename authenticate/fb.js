'use strict';

var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    config = require('../').config;

console.log('[passport strategy] Adding facebook passport strategy');

passport.use(new FacebookStrategy(
  {
    clientID: config.authentication.facebook.id,
    clientSecret: config.authentication.facebook.secret,
    callbackURL: config.authentication.facebook.callbackUrl,
    enableProof: config.authentication.facebook.enableProof
  },
  function (accessToken, refreshToken, profile, done) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));