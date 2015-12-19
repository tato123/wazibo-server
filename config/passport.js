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


        User.findOne({ 'facebook.id': profile.id }, function (err, user) {
              
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
              facebook: {
                id: profile.id,
                displayName: profile.displayName,
                name: profile.name,  
                accessToken: accessToken,
                refreshToken: refreshToken,         
                photos: profile.photos,                                
                emails: profile.emails             
              }
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
