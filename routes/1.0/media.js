'use strict';

var express = require('express'),
    router = express.Router(),
    path = require('path'),
    storageConfig = require('../../config/storage'),
    SaleMedia = require('../../model/SaleMedia'),
    multer = require('multer');

/**
* @api {post} /media/upload Upload Image
* @apiName Upload Image
* @apiGroup Media
*/

/**
* @api {get} /media/:id Get Image
* @apiName View media record
* @apiGroup Media
*
* @apiSuccess {SaleMedia} Sale media object containing a record of an upload
*/


console.log('[Media REST api] Using gcloud bucket storage');
console.log('[Media REST api] gcloud project id: %s', storageConfig.gcloud.projectId);
console.log('[Media REST api] gcloud storage bucket: %s', storageConfig.gcloud.cloudStorageBucket);

var images = require('../../middleware/images')(storageConfig.gcloud, storageConfig.gcloud.cloudStorageBucket);


router.post('/upload', images.multer.single('image'), images.sendUploadToGCS,
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
                res.status(400).send({ message: 'unable to store', error: err });
            }
            res.status(200).send({ message: 'saved succesfully', response: savedData });
        });
    });

router.get('/', function (req, res) {
    SaleMedia.find(function (err, results) {
        if (err) {
            res.status(404).send({ message: 'error cocured', response: [], error: err });
        }

        res.status(200).send({ message: 'results found', response: results });
    });
});

router.get('/:mediaId', function (req, res) {
    SaleMedia.findById(req.param.id, function (err, saleMedia) {
        if (err) {
            res.status(400).send({ error: err });
        }
        res.status(200).send({ results: saleMedia });
    });
});



module.exports = router;