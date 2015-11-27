'use strict';

var express = require('express'),
    router = express.Router();
    
var db = require('../../data/client'),
    assert = require('assert'),
    ObjectID = require('mongodb').ObjectID,
    model = require('../../model');
    
var COLLECTION_NAME = 'sale_event';    


router.route('/')
    /**
    * @description
    * Allows users to publish a new oppurtunity 
    */
    .post(function (req, res) {
        var collection = db.get().collection(COLLECTION_NAME);
        var saleEvent = new model.WZSaleEvent(req.body);
        
        collection.insert(saleEvent, function(err, result) {
            if ( err !== null ) {
                res.status(400).send({message: err})
            }
            else {
                res.status(200).send({message:'success'});    
            }                         
        });        
    })
    // get all events
    .get(function (req, res) {
        var collection = db.get().collection(COLLECTION_NAME);

        collection.find().toArray(function (err, docs) {
            if ( err !== null ) {
                res.status(400).send({message: err})
            }
            else {
                res.status(200).send(docs);    
            } 

        });
    });
    
router.route('/:id')
    // update an event
    .post(function(req, res) {
        var collection = db.get().collection(COLLECTION_NAME);
        var saleEvent = new model.WZSaleEvent(req.body);
        
        collection.updateOne(
            { "_id" : req.params.id },
            {
                $set: saleEvent,
                $currentDate: { "lastModified": true}
            }, function(err, results) {
                if ( err !== null ) {
                    res.status(400).send({message: err})
                }
                else {
                    res.status(200).send({message:'success'});    
                } 
            });           
    })
    // get an event by its id
    .get(function(req, res) {
        var collection = db.get().collection(COLLECTION_NAME);
        
        collection.find(
            { _id: ObjectID(req.params.id) }
        ).toArray(function (err, docs) {
            if ( err !== null ) {
                res.status(400).send({message: err})
            }
            else {
                res.status(200).send(docs);    
            } 
        });        
    });

module.exports = router;