var express = require('express');
var passport = require('passport');
var router = express.Router();


router.get('/', function (req, res) {
    res.render('index', { title: 'wazibo', user : req.user });
});

router.get('/login', passport.authenticate('facebook'), function(req, res) {
    res.redirect('/');
});

module.exports = router;