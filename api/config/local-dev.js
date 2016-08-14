'use strict';

let winston = require('winston');

let config = {
};

config.http = {
  port: process.env.HTTP_SERVER_PORT || 4040,
};

config.mongoose = {
  uri: 'mongo/api_dev',
  options: {
  }
};

config.winston = {
  level: 'debug',
  transports: [
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true
    })
  ],
  exitOnError: false
};

module.exports = config;
