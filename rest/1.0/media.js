'use strict';

var express = require('express'),
    router = express.Router(),
    path = require('path'),
    multer = require('multer');

var db = require('../../data/client'),
    config = require('../../').config,
    assert = require('assert');

var COLLECTION_NAME = 'media';


// conditionally add a route to handle uploading to our local
// file storage
if (config.storage.strategy === 'local') {
    var destination = path.join(__dirname, '/../../', config.storage.local.directory);
    console.log('[Media REST api] Using local file storage stategy');
    console.log('[Media REST api] destination: %s', destination);

    router.post('/upload', multer({dest: destination}).any(), function (req, res) {
        // do I need to do something here?
        res.status(200).send('response here');        
    });

    router.get('/bucket', function (req, res) {
        res.status(200).send('/media/upload');
    });

    router.get('/:mediaId', function (req, res) {

    });
}


module.exports = router;