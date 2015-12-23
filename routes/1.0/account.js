'use strict';

var express = require('express'),
    router = express.Router(),
    User = require('../../model/User'),
    authenticate = User.authenticate(),
    oauthToken = require('../../middleware/oauthToken'),
    limiter = require('../../middleware/limiter'),
    logger = require('../../logger');    

/**
* @api {GET} /account Get account
* @apiName GetAccount
* @apiGroup Account
* @apiPermission user
* @apiVersion 1.0.0
* @apiUse Oauth2
* @apiDescription
* Retrieves the account information for a currently logged in user. A user must be logged in and 
* provide Oauth2 bearer token as well as the authentication provider. This will only return the 
* user you are logged in as. 
* 
* @apiUse userResponse
* @apiUse noDataResponse
*/
router.get('/', oauthToken.authenticate, function (req, res, next) {
    if (req.user) {
        return res.status(200).json(req.user);
    }
    res.status(404).send();
});

/**
* @api {POST} /account/register Register account
* @apiName PostAccountRegister
* @apiGroup Account
* @apiVersion 1.0.0
* @apiDescription
* Registers a new user account to the service, this is used when a user does not want to authenticate
* using a third party openid service like Facebook or Google and would instead like to register
* directly with Wazibo
* @apiUse badRequest
* @apiUse userResponse
*/
router.post('/register',limiter, function (req, res) {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send();
    }
    
    var user = new User({
        local: {
            email: req.body.email,            
        }
    });
    
    User.register(user, req.body.password, function(err) {
        if (err) {
            logger.error('Unable to create user account', err);
            return res.status(400).send();
        }
        logger.debug('Created new user account for email %s', req.body.email);
        res.status(200).json(user);
    });
});

/**
* @api {POST} /account/register Login account
* @apiName PostAccountLogin
* @apiGroup Account
* @apiVersion 1.0.0
* @apiDescription
* Registers a new user account to the service, this is used when a user does not want to authenticate
* using a third party openid service like Facebook or Google and would instead like to register
* directly with Wazibo
* @apiUse badRequest
* @apiUse userResponse
*/
router.post('/login',limiter, function (req, res) {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send();
    }
   
    authenticate(req.body.email, req.body.password, function(err, auth, reason) {
        if ( err ) {
            logger.error('Not able to authenticate user', err);
            return res.status(400).send();
        }
        if (!auth ) {
            return res.status(400).json(reason);
        }        
        // pull it up with all hidden fields hidden
        User.findById(auth._id, function(err, user) {
            if ( err ) {
                logger.error('Not able to pull down protected user account', err);
                return res.status(400).send();
            }
            if (!user ) {
                return res.status(400).json(reason);
            }  
            // then register an access token
            user.local.accessToken = '12312';
            user.save(function(err){
                if ( err ) {
                    logger.error('Not able to store access token', err);
                    return res.status(400).send();
                }
                res.status(200).json(user);
            });
            
        });
    });    
        
});


module.exports = router;