'use strict';

let config = {
};

config.http = {
  port: process.env.HTTP_SERVER_PORT || 3000,
};

module.exports = config;
