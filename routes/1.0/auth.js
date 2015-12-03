'use strict';

var express = require('express'),
    router = express.Router(),
    passport = require('passport');
	
  
/**
 * @api {get} /auth/facebook Authenticate
 * @apiName Login with facebook
 * @apiGroup Authentication
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.get('/facebook',
  passport.authenticate('facebook'));

/**
 * @description
 * Private api method, this is the oauth2 compliant callback
 */ 
router.get('/facebook/callback',
 passport.authenticate('facebook', { successRedirect: '/auth/succcess', failureRedirect: '/auth/login' }));

router.get('/auth/succcess', function (req, res) {
    res.status(200).send({ title: 'wazibo', user : req.user });
});

router.get('/auth/login', passport.authenticate('facebook'), function(req, res) {
    res.status(200).send({message:'user is authenticated'});
});                                      

module.exports = router;