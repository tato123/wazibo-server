'use strict';

var express = require('express'),
    router = express.Router();
    
router.route('/')
    /**
    * @api {post} /sale_event New Event
    * @apiName Post a new event
    * @apiGroup Sale Event
    *
    * @apiSuccess {SaleMedia} Sale media object containing a record of an upload
    */
    .post(function (req, res) {
        res.status(500).send({message:'not implemented yet'});  
    })
    
    /**
    * @api {get} /sale_event Get all events
    * @apiName Get all events
    * @apiGroup Sale Event
    *
    * @apiSuccess {SaleMedia} Sale media object containing a record of an upload
    */
    .get(function (req, res) {
        res.status(500).send({message:'not implemented yet'});
    });
    
    
router.route('/:id')
    
    /**
    * @api {post} /sale_event/:id Update event
    * @apiName Update an event
    * @apiGroup Sale Event
    *
    * @apiSuccess {SaleMedia} Sale media object containing a record of an upload
    */
    .post(function(req, res) {
        res.status(500).send({message:'not implemented yet'});        
    })
    
    /**
    * @api {get} /sale_event/:id Get event by id
    * @apiName Get event by id
    * @apiGroup Sale Event
    *
    * @apiSuccess {SaleMedia} Sale media object containing a record of an upload
    */
    .get(function(req, res) {
        res.status(500).send({message:'not implemented yet'}); 
    });

module.exports = router;