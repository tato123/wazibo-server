'use strict';

var express = require('express'),
    router = express.Router(),
    passport = require('passport');
	
router.get('/facebook',
  passport.authenticate('facebook'));

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    console.log('succesfully logged in');
    // Successful authentication, redirect home.
    res.redirect('/');
  });


module.exports = router;