'use strict';

var express = require('express'),
    router = express.Router(),
    path = require('path'),
    storageConfig = require('../../config/storage'),
    SaleMedia = require('../../model/SaleMedia'),
    multer = require('multer'),
    images = require('../../middleware/images')(storageConfig.gcloud, storageConfig.gcloud.cloudStorageBucket),
    logger = require('../../logger'),
    util = require('util'),
    serverConfig = require('../../config/server'),
    oauthToken = require('../../middleware/oauthToken');

// bootstrap with some information 
logger.info('[Media REST api] Using gcloud bucket storage');
logger.info('[Media REST api] gcloud project id: %s', storageConfig.gcloud.projectId);
logger.info('[Media REST api] gcloud storage bucket: %s', storageConfig.gcloud.cloudStorageBucket);


/**
* @api {post} /media/upload Upload Image
* @apiName Upload Image
* @apiGroup Media
* @apiVersion 1.0.0
*
* @apiUse Oauth2
* @apiSuccess {SaleMedia} Gets the bucket url where applications can send requests to for uploading
*/
router.post('/upload',oauthToken.authenticate, images.multer.single('image'), images.sendUploadToGCS,
    function (req, res) {
        var data = req.body;
    
        // Was an image uploaded? If so, we'll use its public URL
        // in cloud storage.
        if (req.file && req.file.cloudStoragePublicUrl) {
            data.imageUrl = req.file.cloudStoragePublicUrl;
        }
            
        // Save the data to the database.
        var saleMedia = new SaleMedia({ imageUrl: data.imageUrl });
        saleMedia.save(data, function (err, savedData) {
            if (err) {
                res.status(400).send({error: err });
            }
            res.status(200).json(savedData);
        });
    });
    
/**
* @api {get} /media Get all images
* @apiName Get all media
* @apiGroup Media
* @apiVersion 1.0.0
*
* @apiSuccess {SaleMedia} Sale media object containing a record of an upload
*/
router.get('/',function (req, res) {
    SaleMedia.find(function (err, results) {
        if (err) {
            res.status(404).send({error: err });
        }
        res.status(200).json(results);
    });
});

/**
* @api {get} /media/bucket Get bucket
* @apiName Get media bucket
* @apiGroup Media
* @apiVersion 1.0.0
*
* @apiSuccess {String} Gets the bucket url where applications can send requests to for uploading
*/
router.get('/bucket', function(req,res) {
     res.status(200).send(util.format('%s/%s', serverConfig.url(), 'media/upload'));
});

/**
* @api {get} /media/:id Get image record
* @apiName Get media for id
* @apiGroup Media
* @apiVersion 1.0.0
*
* @apiSuccess {SaleMedia} Sale media object containing a record of an upload
*/
router.get('/:mediaId', function (req, res) {
    SaleMedia.findById(req.param.id, function (err, saleMedia) {
        if (err) {
            res.status(400).send({ error: err });
        }
        res.status(200).json(saleMedia);
    });
});



module.exports = router;