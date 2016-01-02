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
* @api {POST} /media/upload Upload an image
* @apiName PostUpload
* @apiGroup Media
* @apiVersion 1.0.0
* @apiPermission user
* @apiUse Oauth2
* @apiUse saleMediaResponse
*
* @apiDescription
* Allows users to upload a new image that can then be used with any object type that accepts a media
* record. This API method stores the image and provides a handle back to that image. All images
* are automatically associated with the user account that uploaded the image.
*/
router.post('/upload', oauthToken.authenticate, images.multer.single('image'), images.sendUploadToGCS,
  function (req, res) {
    var data = req.body;
    
    // Was an image uploaded? If so, we'll use its public URL
    // in cloud storage.
    if (req.file && req.file.cloudStoragePublicUrl) {
      data.imageUrl = req.file.cloudStoragePublicUrl;
    }
            
    // Save the data to the database.
    var saleMedia = new SaleMedia({
      imageUrl: data.imageUrl,
      _creator: req.user._id
    });
    saleMedia.save(data, function (err, savedData) {
      if (err) {
        res.status(400).send({ error: err });
      }
      res.status(200).json(savedData);
    });
  });
    
/**
* @api {GET} /media Get all images
* @apiName GetAllMedia
* @apiGroup Media
* @apiVersion 1.0.0
* @apiUse noDataResponse
* @apiUse saleMediaResponse
*
* @apiDescription
* <h2 style="color:red">EXPERIMENTAL</h2>
* Gets all of the media records, this api call should be considered experimental since there may never be a need to 
* get all of the media records without actually getting their associated parent (i.e. event or item)
*/
router.get('/', function (req, res) {
  SaleMedia.find(function (err, results) {
    if (err) {
      res.status(404).send({ error: err });
    }
    res.status(200).json(results);
  });
});

/**
* @api {GET} /media/bucket Get bucket
* @apiName Get media bucket
* @apiGroup Media
* @apiVersion 1.0.0
*
* @apiSuccess (200) {String} Gets the bucket url where applications can send requests to for uploading
* @apiSuccessExample {String} Success-Response:
* HTTP/1.1 200 OK
* http://api.wazibo.com/media/upload   
*/
router.get('/bucket', function (req, res) {
  res.status(200).send(util.format('%s/%s', serverConfig.url(), '1.0/media/upload'));
});

/**
* @api {GET} /media/:id Get image record
* @apiName Get media for id
* @apiGroup Media
* @apiVersion 1.0.0
* @apiUse noDataResponse
* @apiUse saleMediaResponse
* @apiUse badRequest
*
* @apiDescription 
* Get a particular media record associated to an id 
*/
router.get('/:mediaId', function (req, res) {
  if (!req.param.id) {
    res.status(400).send();
  }

  SaleMedia.findById(req.param.id, function (err, saleMedia) {
    if (err) {
      res.status(404).send();
    }
    res.status(200).json(saleMedia);
  });
});



module.exports = router;