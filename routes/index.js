var express = require('express');
var passport = require('passport');
var router = express.Router();


router.get('/', function (req, res) {
    res.status(200).send({ title: 'wazibo', user : req.user });
});

router.get('/login', passport.authenticate('facebook'), function(req, res) {
    res.status(200).send({message:'user is authenticated'});
});

module.exports = router;