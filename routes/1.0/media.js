'use strict';

var express = require('express'),
    router = express.Router(),
    path = require('path'),
    config = require('../../config').config,
    SaleMedia = require('../../model/SaleMedia'),
    multer = require('multer'),
    isAuthenticated = require('../../middleware/isAuthenticated');

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

// conditionally add a route to handle uploading to our local
// file storage
if (config.storage.strategy === 'local') {
    var destination = path.join(__dirname, '/../../', config.storage.local.directory);
    console.log('[Media REST api] Using local file storage stategy');
    console.log('[Media REST api] destination: %s', destination);

    router.post('/upload', multer({ dest: destination }).any(), function (req, res) {
        // do I need to do something here?
        res.status(200).send('response here');
    });

    router.get('/:mediaId', function (req, res) {
        res.status(500).send('not yet implemented');
    });
}

if (config.storage.strategy === 'gcloud') {
    console.log('[Media REST api] Using gcloud bucket storage');
    console.log('[Media REST api] gcloud project id: %s', config.storage.gcloud.projectId);
    console.log('[Media REST api] gcloud storage bucket: %s', config.storage.gcloud.cloudStorageBucket);

    var images = require('../../middleware/images')(config.storage.gcloud, config.storage.gcloud.cloudStorageBucket);

   
    router.post('/upload', isAuthenticated, images.multer.single('image'), images.sendUploadToGCS,
        function(req, res) {
            var data = req.body;
    
            // Was an image uploaded? If so, we'll use its public URL
            // in cloud storage.
            if (req.file && req.file.cloudStoragePublicUrl) {
                data.imageUrl = req.file.cloudStoragePublicUrl;
            }
            
            // Save the data to the database.
            var saleMedia = new SaleMedia({imageUrl: data.imageUrl});
            saleMedia.save(data, function (err, savedData) {
                if (err) { 
                    res.status(400).send({message:'unable to store', error: err}); 
                }
                res.status(200).send({message:'saved succesfully', response: savedData});                
            });
        });

    router.get('/', isAuthenticated, function(req, res) {
        SaleMedia.find(function(err, results) {
            if (err) {
                res.status(404).send({message:'error cocured', response: [], error: err});
            } 
            
            res.status(200).send({message:'results found', response: results});             
        });  
    });
    
    router.get('/:mediaId', isAuthenticated, function (req, res) {
        SaleMedia.findById(req.param.id, function (err, saleMedia) {
            if (err) {
                res.status(400).send({ error: err });
            }
            res.status(200).send({ results: saleMedia });
        });
    });
}


module.exports = router;