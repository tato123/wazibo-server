'use strict';

var express = require('express'),
  router = express.Router(),
  SaleItem = require('../../model/SaleItem'),
  SaleEvent = require('../../model/SaleEvent'),
  _ = require('lodash'),
  logger = require('../../logger'),
  oauthToken = require('../../middleware/oauthToken'),
  qr = require('qr-image'),
  serverConfig = require('../../config/server'),
  util = require('util');

/**
* @api {POST} /sale/event New Event
* @apiName Post a new event
* @apiGroup Sale
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
* @apiGroup Sale
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
* @apiGroup Sale
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
* @apiGroup Sale
* @apiUse Oauth2
* @apiVersion 1.0.0
*/
router.delete('/event/:id', oauthToken.authenticate, function (req, res) {
  SaleEvent.findById(req.params.id)
    .where('_creator', req.user._id)
    .exec(function (err, saleEvent) {
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
* @apiGroup Sale
* @apiVersion 1.0.0
*
* @apiSuccess {SaleMedia} Sale media object containing a record of an upload
*/
router.get('/event/:id', function (req, res) {
  var id = req.params.id;
  logger.debug('Looking for sale event with id', id);
  SaleEvent.findById(id, function (err, saleEvent) {
    if (err) {
      res.status(400).send();
    }
    res.status(200).json(saleEvent);
  });
});

router.get('/event/:id/qr', function (req, res) {

  if (!req.params.id) {
    res.status(400).send();
  }
  // validate that this item actually exists
  SaleEvent.findById(req.params.id, function (err, saleEvent) {
    if (err) {
      res.status(400).send();
    }
    // if the item exists, then generate the qr image
    var code = qr.image(util.format('%s/%s/%s', serverConfig.url(), 'sale/event', req.params.id), { type: 'svg' })
    res.type('svg');
    code.pipe(res);
  });
});

/**
* @api {POST} /sale/item/:id Post new item
* @apiName Post new item
* @apiGroup Sale
* @apiUse Oauth2
* @apiVersion 1.0.0
*
* @apiSuccess {SaleItem} Sale media object containing a record of an upload
*/
router.post('/item', oauthToken.authenticate, function (req, res) {
  logger.info('POST item called', req.body);

  var saleItem = new SaleItem(req.body);
  saleItem._creator = req.user._id;
  saleItem.save(function (err) {
    if (err) {
      logger.error('Unable to save item', req.body, 'for user', req.user._id, 'with error', err);
      res.status(400).send([]);
    }
    res.status(200).json(saleItem);
  });
});
    
/**
* @api {GET} /sale/item Get all items
* @apiName Get all items
* @apiGroup Sale
* @apiVersion 1.0.0
* @apiParam {String} user_id Limit items to a specific user id
* @apiSuccess {SaleItem} Sale media object containing a record of an upload
*/
router.get('/item', function (req, res) {
  logger.info('GET item called');
  var searchTerms = [];
  if (req.query.user_id) {
    logger.info('Seraching for item with creators', req.query.user_id);
    searchTerms.push({ _creator: req.query.user_id });
  }

  SaleItem
    .find(searchTerms)
    .populate('photos')
    .exec(function (err, saleItems) {
      if (err) {
        res.status(400).json([]);
      }
      res.json(saleItems);
    });
});
    
/**
* @api {POST} /sale/item/:id Update sale item
* @apiName Update item by id
* @apiGroup Sale
* @apiUse Oauth2
* @apiVersion 1.0.0
*
* @apiSuccess {SaleItem} Sale media object containing a record of an upload
*/
router.post('/item/:id', oauthToken.authenticate, function (req, res) {
  logger.info('POST by id item called');

  SaleItem.findById(req.params.id, function (err, saleItem) {
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
* @apiGroup Sale
* @apiVersion 1.0.0
*
* @apiSuccess {SaleItem} Sale media object containing a record of an upload
*/
router.get('/item/:id', function (req, res) {
  logger.info('GET item by id item called');

  SaleItem
    .findById(req.params.id)
    .populate('photos')
    .exec(function (err, saleItem) {
      if (err) {
        res.status(400).send([]);
      }
      res.status(200).json(saleItem);
    });
});


/**
* @api {GET} /sale/item/:id Get item by id
* @apiName Get item by id
* @apiGroup Sale
* @apiVersion 1.0.0
*
* @apiSuccess {SaleItem} Sale media object containing a record of an upload
*/
router.delete('/item/:id', oauthToken.authenticate, function (req, res) {
  logger.info('Delete item by id');
  SaleItem
    .findById(req.params.id)
    .where('_creator', req.user._id)
    .exec(function (err, saleItem) {
      if (err) {
        res.status(400).send({ error: err });
      }
      if (!saleItem) {
        return res.status(404).send();
      }
      saleItem.remove();
      res.status(201).send();
    });
});

/**
* @api {GET} /sale/item/:id Get item by id
* @apiName Get item by id
* @apiGroup Sale
* @apiVersion 1.0.0
*
* @apiSuccess {SaleItem} Sale media object containing a record of an upload
*/
router.get('/item/:id/qr', function (req, res) {
  logger.info('GET item by id item called');

  SaleItem.findById(req.params.id, function (err, saleItem) {
    if (err) {
      res.status(400).send([]);
    }
    // if the item exists, then generate the qr image
    var code = qr.image(util.format('%s/%s/%s', serverConfig.url(), 'sale/item', req.params.id), { type: 'svg' })
    res.type('svg');
    code.pipe(res);
  });
});


module.exports = router;