'use strict';

var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    logger = require('../logger');

module.exports = {

    authenticate: function (req, res, next) {
        // log our headers as part of authenticated the user request
        logger.debug('Authenticating user with headers', req.headers);
        
        
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
                    
                    return next();
                });
                
            })(req, res, next);
        } 
        else {
            // if we get to thise point we've fallen out of authentication pathways either from an invalid
            // provider or authentication issue, either way we aren't authenticated    
            res.status(401).send();
        }
        
            
        
        
        
    }
}