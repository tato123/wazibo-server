'use strict';

var express = require('express'),
    router = express.Router();
 

router.route('/')

    /**
    * @api {post} /sale_item/:id Post new item
    * @apiName Post new item
    * @apiGroup Sale Item
    *
    * @apiSuccess {SaleItem} Sale media object containing a record of an upload
    */
    .post(function (req, res) {
       res.status(500).send({message:'not implemented yet'});
    })
    
    /**
    * @api {get} /sale_item/:id Get all items
    * @apiName Get all items
    * @apiGroup Sale Item
    *
    * @apiSuccess {SaleItem} Sale media object containing a record of an upload
    */
    .get(function (req, res) {
        res.status(500).send({message:'not implemented yet'});
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
        res.status(500).send({message:'not implemented yet'});
    })
    /**
    * @api {get} /sale_item/:id Get item by id
    * @apiName Get item by id
    * @apiGroup Sale Item
    *
    * @apiSuccess {SaleItem} Sale media object containing a record of an upload
    */
    .get(function(req, res) {
        res.status(500).send({message:'not implemented yet'});
    });

module.exports = router;