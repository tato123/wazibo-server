'use strict';

var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    logger = require('../logger');

module.exports = {

    authenticate: function (req, res, next) {
        // use the facebook token strategy, verify the information and then
        // get the
        logger.info('Oauth headers', req.headers);
        if (req.headers['X-Authorization-Provider'] === 'facebook' || 
            req.headers['X-Authorization-Provider'.toLowerCase()] === 'facebook' ) {
            passport.authenticate('facebook-token', function (err, user, info) {
                if (err) {
                    logger.error('Unable to authenticate OAUTH token for facebook', err);
                    return next();
                }
                if (!user) {
                    logger.error('Unable to authenticate OAUTH token for facebook', 'No user present');
                    return next();
                }
                req.logIn(user, { session: false }, function (err) {
                    if (err) {
                        logger.error('Unable to authenticate OAUTH token for facebook', err);
                        return next();
                    }
                    if ( !req.user ) {                        
                        req.user = user;
                        req.user.active = 'facebook';
                        logger.info('No user present, adding user to request', req.user);    
                    }
                    
                    next();
                });
                
            })(req, res, next);
        } else {
            next(new Error('Unspecified provider'));    
        }
        
        
    }
}