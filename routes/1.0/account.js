'use strict';

var express = require('express'),
    router = express.Router(),
    User = require('../../model/User'),
    oauthToken = require('../../middleware/oauthToken');

router.get('/', oauthToken.authenticate, function(req, res, next) {
    if ( req.user ) {
        return res.status(200).json(req.user);
    }
    res.status(404).send();
});


module.exports = router;