'use strict';

var winston = require('winston'),
    moment = require('moment'),
    util = require('util');

var logger = new (winston.Logger)({
  transports: [
    new winston.transports.Console({
      colorize: true,
      label: 'wazibo-server',
      timestamp: function() {
        return util.format('[%s]', moment().format('HH:mm:ss'));
      },
      level: 'debug'
    }),
  ]
});

module.exports = logger;