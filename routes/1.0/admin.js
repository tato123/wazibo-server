'use strict';

var express = require('express'),
    router = express.Router(),
    SaleEvent = require('../../model/SaleEvent'),
    User = require('../../model/User');

router.route('/account/user')
    .delete(function(req, res) {
        User.find({}, function (err, saleEvent) {
            if (err) {
                res.status(400).send({ error: err });
            }
            if ( !saleEvent ) {
                return res.status(404).send();
            }
            saleEvent.forEach(function(event) {
                event.remove();
            }, this);            
            
            res.status(200).send();
        });
    })
    .get(function (req, res) {
        User.find({}, function (err, response) {
            if (err) {
                res.status(400).json([]);
            }
            res.json(response);
        });
    });
    
router.route('/sale_event')    
    .delete(function(req, res) {
        SaleEvent.find({}, function (err, saleEvent) {
            if (err) {
                res.status(400).send({ error: err });
            }
            if ( !saleEvent ) {
                return res.status(404).send();
            }
            saleEvent.forEach(function(event) {
                event.remove();
            }, this);            
            
            res.status(200).send();
        });
    })

module.exports = router;