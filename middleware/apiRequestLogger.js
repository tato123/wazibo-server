'use strict';

var logger = require('../logger'),
  util = require('util'),
  url = require('url');

function hasAccessToken(req, field) {
  var OAuth2AuthorizationField = 'Authorization';
  return req.body && req.body[field] || 
    req.query && req.query[field] || 
    req.headers && (req.headers[field] || 
    req.headers[field.toLowerCase()]) || 
    req.headers && (req.headers[OAuth2AuthorizationField] || 
    req.headers[OAuth2AuthorizationField.toLowerCase()]);
}

module.exports = function (req, res, next) {
  var msg = '\n************ [Request] *****************\n';
  msg += util.format('Time: %s\n', new Date());
  msg += util.format('Method: %s\n', req.method);
  msg += util.format('URL: %s\n', url.parse(req.originalUrl).pathname);
  msg += util.format('Authorization: [%s]\n', hasAccessToken(req, 'access_token')? 'true' : 'false');
  msg += util.format('Query: %j\n', req.query );
  msg += util.format('Path Params: %j\n', req.params );
  msg += '*****************************\n';
  logger.info(msg);
  next();
};