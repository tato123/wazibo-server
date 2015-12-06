'use strict';

var express = require('express'),
    router = express.Router(),
    SaleItem = require('../../model/SaleItem'),
    isAuthenticated = require('../../middleware/isAuthenticated'),
    _ = require('lodash');
 

router.route('/')

    /**
    * @api {post} /sale_item/:id Post new item
    * @apiName Post new item
    * @apiGroup Sale Item
    *
    * @apiSuccess {SaleItem} Sale media object containing a record of an upload
    */
    .post(isAuthenticated, function (req, res) {
       var sale = new SaleItem(req.body);
       sale.save(function (err) {
            if (err) {
                res.status(400).send({ error: err });
            }
            res.status(200).send({ results: sale });
        });
    })
    
    /**
    * @api {get} /sale_item/:id Get all items
    * @apiName Get all items
    * @apiGroup Sale Item
    *
    * @apiSuccess {SaleItem} Sale media object containing a record of an upload
    */
    .get(isAuthenticated, function (req, res) {
        SaleItem.find({}, function (err, saleItems) {
            if (err) {
                res.status(400).send({ error: err });
            }
            res.status(200).send({ results: saleItems });
        });
    });
    
router.route('/:id')
    /**
    * @api {post} /sale_item/:id Update sale item
    * @apiName Update item by id
    * @apiGroup Sale Item
    *
    * @apiSuccess {SaleItem} Sale media object containing a record of an upload
    */
    .post(isAuthenticated, function(req, res) {
        SaleItem.findById(req.param.id, function (err, saleItem) {
            if (err) {
                res.status(400).send({ error: err });
            }
            _.extend(saleItem, req.body);
            saleItem.save(function (err) {
                if (err) {
                    res.status(400).send({ error: err });
                }
                res.status(200).send({ results: saleItem });
            });
        });
    })
    /**
    * @api {get} /sale_item/:id Get item by id
    * @apiName Get item by id
    * @apiGroup Sale Item
    *
    * @apiSuccess {SaleItem} Sale media object containing a record of an upload
    */
    .get(isAuthenticated, function(req, res) {
        SaleItem.findById(req.param.id, function (err, saleItem) {
            if (err) {
                res.status(400).send({ error: err });
            }
            res.status(200).send({ results: saleItem });
        });
    });

module.exports = router;