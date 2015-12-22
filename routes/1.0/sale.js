'use strict';

var express = require('express'),
    router = express.Router(),
    SaleItem = require('../../model/SaleItem'),
    SaleEvent = require('../../model/SaleEvent'),
    _ = require('lodash'),
    logger = require('../../logger'),
    oauthToken = require('../../middleware/oauthToken');

/**
* @api {POST} /sale/event New Event
* @apiName Post a new event
* @apiGroup Sale Event
* @apiUse Oauth2
* @apiVersion 1.0.0
* @apiSuccess {SaleMedia} Sale media object containing a record of an upload
*/
router.post('/event', oauthToken.authenticate, function (req, res) {
        var sale = new SaleEvent(req.body);
        sale._creator = req.user._id;
        sale.save(function (err) {
            if (err) {
                return res.status(400).send({ error: err });
            }
            logger.info('stored new event', req.body);
            res.status(200).json(sale);
        });
    })    
    
/**
* @api {GET} /sale/event Get all events
* @apiName Get all events
* @apiGroup Sale Event
* @apiVersion 1.0.0
*
* @apiSuccess {SaleMedia} Sale media object containing a record of an upload
*/
router.get('/event', function (req, res) {
        SaleEvent.find({})
            .populate('_creator')
            .exec(function (err, events) {
                if (err) {
                    res.status(400).send({ error: err });
                }
                res.status(200).json(events);
            });
    });
    
/**
* @api {POST} /sale/event/:id Update event
* @apiName Update an event
* @apiGroup Sale Event
* @apiUse Oauth2
* @apiVersion 1.0.0
* @apiSuccess {SaleMedia} Sale media object containing a record of an upload
*/
router.post('/event/:id', oauthToken.authenticate, function (req, res) {
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

    });
    
/**
* @api {DELETE} /sale/event/:id Delete event
* @apiName Delete an event
* @apiGroup Sale Event
* @apiUse Oauth2
* @apiVersion 1.0.0
*/
router.delete('/event/:id', oauthToken.authenticate, function (req, res) {
        SaleEvent.findById(req.params.id, function (err, saleEvent) {
            if (err) {
                res.status(400).send({ error: err });
            }
            if (!saleEvent) {
                return res.status(404).send();
            }
            saleEvent.remove();
            res.status(201).send();
        });
    })
    
/**
* @api {GET} /sale/event/:id Get event by id
* @apiName Get event by id
* @apiGroup Sale Event
* @apiVersion 1.0.0
*
* @apiSuccess {SaleMedia} Sale media object containing a record of an upload
*/
router.get('/event/:id', function (req, res) {
        var id = req.params.id;
        logger.info('Looking for sale event with id', id);
        SaleEvent.findById(id, function (err, saleEvent) {
            if (err) {
                res.status(400).send();
            }
            res.status(200).json(saleEvent);
        });
    });


/**
* @api {POST} /sale/item/:id Post new item
* @apiName Post new item
* @apiGroup Sale Item
* @apiUse Oauth2
* @apiVersion 1.0.0
*
* @apiSuccess {SaleItem} Sale media object containing a record of an upload
*/
router.post('/item', oauthToken.authenticate, function (req, res) {
        
        var sale = new SaleItem(req.body);
        sale._creator = req.user._id;
        // check if there is an associated event,if there is upload
        // this item to that event 
        
        if (req.query.event_id) {
            logger.info('Got a event_id', req.query.event_id);
            SaleEvent.findById(req.query.event_id, function (err, event) {
                logger.info('Saving item', req.body);
                if (err || !event) {
                    logger.error('unable to save event', err);
                    return res.status(400).json([]);
                }
                if ( event ) {
                    event.items.push(sale);
                    event.save(function (err) {
                        if (err) {
                            return res.status(400).json([]);
                        }
                        res.status(200).json(sale);
                    });    
                }
                
            });
        }
        // store it in our attic
        else {
            SaleEvent
                .where({ '_creator': req.user._id })
                .where({ 'attic': true })
                .exec(function (err, event) {
                    // if we have an attic, then populate it
                    // with this item
                    if (event) {
                        event.items.push(sale);
                        event.save(function (err) {
                            if (err) {
                                return res.status(400).json([]);
                            }
                            res.status(200).json(sale);
                        });
                    }
                    // if we don't have an attic, build it here
                    else {
                        var attic = new SaleEvent();
                        attic._creator = req.user._id;
                        attic.attic = true;
                        attic.items.push(sale);
                        attic.save(function (err) {
                            if (err) {
                                return res.status(400).send({ error: err });
                            }
                            res.status(200).json(sale);
                        });
                    }

                });
        }
    })
    
/**
* @api {GET} /sale/item Get all items
* @apiName Get all items
* @apiGroup Sale Item
* @apiVersion 1.0.0
*
* @apiSuccess {SaleItem} Sale media object containing a record of an upload
*/
router.get('/item', function (req, res) {
        SaleItem.find({}, function (err, saleItems) {
            if (err) {
                res.status(400).json([]);
            }
            res.json(saleItems);
        });
    });
    
/**
* @api {POST} /sale/item/:id Update sale item
* @apiName Update item by id
* @apiGroup Sale Item
* @apiUse Oauth2
* @apiVersion 1.0.0
*
* @apiSuccess {SaleItem} Sale media object containing a record of an upload
*/
router.post('/item/:id', oauthToken.authenticate, function (req, res) {
        SaleItem.findById(req.param.id, function (err, saleItem) {
            if (err) {
                res.status(400).send([]);
            }
            _.extend(saleItem, req.body);
            saleItem.save(function (err) {
                if (err) {
                    res.status(400).send([]);
                }
                res.status(200).send({ results: saleItem });
            });
        });
    });
/**
* @api {GET} /sale/item/:id Get item by id
* @apiName Get item by id
* @apiGroup Sale Item
* @apiVersion 1.0.0
*
* @apiSuccess {SaleItem} Sale media object containing a record of an upload
*/
router.get('/item/:id', function (req, res) {
        SaleItem.findById(req.param.id, function (err, saleItem) {
            if (err) {
                res.status(400).send([]);
            }
            res.status(200).json(saleItem);
        });
    });

module.exports = router;