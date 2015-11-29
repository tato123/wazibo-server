'use strict';

var express = require('express'),
    router = express.Router();
    
router.route('/')
    /**
    * @description
    * Allows users to publish a new oppurtunity 
    */
    .post(function (req, res) {
        res.status(500).send({message:'not implemented yet'});  
    })
    // get all events
    .get(function (req, res) {
        res.status(500).send({message:'not implemented yet'});
    });
    
router.route('/:id')
    // update an event
    .post(function(req, res) {
        res.status(500).send({message:'not implemented yet'});        
    })
    // get an event by its id
    .get(function(req, res) {
        res.status(500).send({message:'not implemented yet'}); 
    });

module.exports = router;