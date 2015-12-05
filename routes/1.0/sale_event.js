'use strict';

var express = require('express'),
    router = express.Router(),
    SaleEvent = require('../../model/SaleEvent'),
    isAuthenticated = require('../../middleware/isAuthenticated'),
    _ = require('lodash');

router.route('/')
/**
* @api {post} /sale_event New Event
* @apiName Post a new event
* @apiGroup Sale Event
*
* @apiSuccess {SaleMedia} Sale media object containing a record of an upload
*/
    .post(isAuthenticated, function (req, res) {
        var sale = new SaleEvent(req.body);
        sale.save(function (err) {
            if (err) {
                res.status(400).send({ error: err });
            }
            res.status(200).send({ results: sale });
        })

    })
    
/**
* @api {get} /sale_event Get all events
* @apiName Get all events
* @apiGroup Sale Event
*
* @apiSuccess {SaleMedia} Sale media object containing a record of an upload
*/
    .get(isAuthenticated, function (req, res) {
        SaleEvent.find({}, function (err, events) {
            if (err) {
                res.status(400).send({ error: err });
            }
            res.status(200).send({ results: events });
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
    .post(isAuthenticated, function (req, res) {
        SaleEvent.findById(req.param.id, function (err, saleEvent) {
            if (err) {
                res.status(400).send({ error: err });
            }
            _.extend(saleEvent, req.body);
            saleEvent.save(function (err) {
                if (err) {
                    res.status(400).send({ error: err });
                }
                res.status(200).send({ results: saleEvent });
            });
        });

    })
    
/**
* @api {get} /sale_event/:id Get event by id
* @apiName Get event by id
* @apiGroup Sale Event
*
* @apiSuccess {SaleMedia} Sale media object containing a record of an upload
*/
    .get(isAuthenticated, function (req, res) {

        SaleEvent.findById(req.param.id, function (err, saleEvent) {
            if (err) {
                res.status(400).send({ error: err });
            }
            res.status(200).send({ results: saleEvent });
        });
    });

module.exports = router;