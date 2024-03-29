'use strict';

var passport = require('passport'),
  FacebookTokenStrategy = require('passport-facebook-token'),
  authConfig = require('./auth'),
  User = require('../model/User'),
  logger = require('../logger');

module.exports = function (passport) {

  passport.use(new FacebookTokenStrategy(
    {
      clientID: authConfig.facebook.id,
      clientSecret: authConfig.facebook.secret,
      profileFields: ['id', 'name', 'displayName', 'photos', 'hometown', 'profileUrl', 'email']
    },
    function (accessToken, refreshToken, profile, done) {
      process.nextTick(function () {


        User.findOne({ 'identities.userId': profile.id }, function (err, user) {
              
          // if there is an error, stop everything and return that
          // ie an error connecting to the database
          if (err)
            return done(err);
 
          // if the user is found, then log them in
          if (user) {
            return done(null, user); // user found, return that user
          } else {            
            // if there is no user found with that facebook id, create them
            var newUser = new User({
                email           : profile.emails[0].value,
                gender          : profile.gender,
                givenName       : profile.name.givenName,
                familyName      : profile.name.familyName,
                displayName     : profile.displayName,
                photo           : profile.photos[0].value,
                middleName      : profile.middleName,
                identies        : []
            });
            
            newUser.identities.push({
                provider    : profile.provider,
                accessToken : accessToken,
                refreshToken: refreshToken,
                userId      : profile.id                
            });
              
            // save our user to the database
            newUser.save(function (err) {
              if (err) {
                throw err;
              }
                 
              // if successful, return the new user
              return done(null, newUser);
            });
          }
        });

      });

    }));
}
