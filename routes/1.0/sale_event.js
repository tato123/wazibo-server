'use strict';

var express = require('express'),
    router = express.Router(),
    SaleEvent = require('../../model/SaleEvent'),
    _ = require('lodash'),
    logger = require('../../logger'),
    oauthToken = require('../../middleware/oauthToken');

router.route('/')

    /**
    * @api {post} /sale_event New Event
    * @apiName Post a new event
    * @apiGroup Sale Event
    *
    * @apiSuccess {SaleMedia} Sale media object containing a record of an upload
    */
    .post(oauthToken.authenticate, function (req, res) {        
        var sale = new SaleEvent(req.body);                        
        sale._creator = req.user._id;        
        sale.save(function (err) {
            if (err) {
                return res.status(400).send({ error: err });
            }
            logger.info('stored new event',req.body);
            res.status(200).json( sale );
        });
    })    
    
    /**
    * @api {get} /sale_event Get all events
    * @apiName Get all events
    * @apiGroup Sale Event
    *
    * @apiSuccess {SaleMedia} Sale media object containing a record of an upload
    */
    .get(function (req, res) {
        SaleEvent.find({}, function (err, events) {
            if (err) {
                res.status(400).send({ error: err });
            }
            res.status(200).json(events);
        });
    });


router.route('/:id')
    
    /**
    * @api {post} /sale_event/:id Update event
    * @apiName Update an event
    * @apiGroup Sale Event
    *
    * @apiSuccess {SaleMedia} Sale media object containing a record of an upload
    */
    .post(oauthToken.authenticate, function (req, res) {
        SaleEvent.findById(req.params.id, function (err, saleEvent) {
            if (err) {
                res.status(400).send({ error: err });
            }
            _.extend(saleEvent, req.body);
            saleEvent.save(function (err) {
                if (err) {
                    res.status(400).send({ error: err });
                }
                res.status(200).json(saleEvent);
            });
        });

    })
    
    .delete(oauthToken.authenticate, function(req, res) {
        SaleEvent.findById(req.params.id, function (err, saleEvent) {
            if (err) {
                res.status(400).send({ error: err });
            }
            if ( !saleEvent ) {
                return res.status(404).send();
            }
            saleEvent.remove();
            res.status(201).send();
        });
    })
    
    /**
    * @api {get} /sale_event/:id Get event by id
    * @apiName Get event by id
    * @apiGroup Sale Event
    *
    * @apiSuccess {SaleMedia} Sale media object containing a record of an upload
    */
    .get(function (req, res) {
        var id = req.params.id;
        logger.info('Looking for sale event with id', id);
        SaleEvent.findById(id, function (err, saleEvent) {
            if (err) {
                res.status(400).send();
            }
            res.status(200).json(saleEvent);
        });
    });

module.exports = router;