'use strict';

var express = require('express'),
    router = express.Router(),
    SaleItem = require('../../model/SaleItem'),
    _ = require('lodash');
 

router.route('/')

    /**
    * @api {post} /sale_item/:id Post new item
    * @apiName Post new item
    * @apiGroup Sale Item
    *
    * @apiSuccess {SaleItem} Sale media object containing a record of an upload
    */
    .post(function (req, res) {
       var sale = new SaleItem(req.body);
       sale.save(function (err) {
            if (err) {
                res.status(400).json([]);
            }
            res.status(200).json(sale);
        });
    })
    
    /**
    * @api {get} /sale_item/:id Get all items
    * @apiName Get all items
    * @apiGroup Sale Item
    *
    * @apiSuccess {SaleItem} Sale media object containing a record of an upload
    */
    .get(function (req, res) {
        SaleItem.find({}, function (err, saleItems) {
            if (err) {
                res.status(400).json([]);
            }
            res.json(saleItems);
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
    .post(function(req, res) {
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
    })
    /**
    * @api {get} /sale_item/:id Get item by id
    * @apiName Get item by id
    * @apiGroup Sale Item
    *
    * @apiSuccess {SaleItem} Sale media object containing a record of an upload
    */
    .get(function(req, res) {
        SaleItem.findById(req.param.id, function (err, saleItem) {
            if (err) {
                res.status(400).send([]);
            }
            res.status(200).json(saleItem);
        });
    });

module.exports = router;