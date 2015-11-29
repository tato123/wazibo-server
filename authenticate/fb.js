'use strict';

var passport = require('passport'),
  FacebookStrategy = require('passport-facebook').Strategy,
  User = require('../model/User'),
  _ = require('lodash'),
  facebook_config = require('../').config.authentication.facebook;

console.log('[passport strategy] Adding facebook passport strategy');

passport.use(new FacebookStrategy(
  {
    clientID: facebook_config.id,
    clientSecret: facebook_config.secret,
    callbackURL: facebook_config.callbackUrl,
    enableProof: facebook_config.enableProof
  },
  function (accessToken, refreshToken, profile, done) {
    
       // asynchronous
    process.nextTick(function() {
      // find the user in the database based on their facebook id
      User.findOne({ 'id': profile.id }, function (err, user) {
 
        // if there is an error, stop everything and return that
        // ie an error connecting to the database
        if (err)
          return done(err);
 
        // if the user is found, then log them in
        if (user) {
          return done(null, user); // user found, return that user
        } else {
          // if there is no user found with that facebook id, create them
          var newUser = new User();
 
          // set all of the facebook information in our user model
          newUser.id = profile.id; // set the users facebook id                 
          newUser.strategy = 'facebook';
          
          // requires fb approval before we are allowed to receive
          // this information
          newUser.firstName = _.includes(facebook_config.acl, 'givenName') ? profile.name.givenName : '';
          newUser.lastName = _.includes(facebook_config.acl, 'familyName') ? profile.name.familyName : '';
          newUser.email = _.includes(facebook_config.acl, 'email') ? profile.emails[0].value : '';
          
 
          // save our user to the database
          newUser.save(function (err) {
            if (err)
              throw err;
 
            // if successful, return the new user
            return done(null, newUser);
          });
        }
      });
    });

  }));