'use strict';

var express = require('express'),
    router = express.Router(),
    User = require('../../model/User'),
    oauthToken = require('../../middleware/oauthToken');

/**
* @api {GET} /account Get account
* @apiName Get registered account
* @apiGroup Account
* @apiPermission user
* @apiVersion 1.0.0
* @apiUse Oauth2
* @apiSuccess {String} Gets the bucket url where applications can send requests to for uploading
*/
router.get('/', oauthToken.authenticate, function(req, res, next) {
    if ( req.user ) {
        return res.status(200).json(req.user);
    }
    res.status(404).send();
});


module.exports = router;