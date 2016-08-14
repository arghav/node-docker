const config = require('config');
const mongoose = require('mongoose');
const winston = require('winston');

const logger = new winston.Logger(config.get('winston'));

// Use system Promise
mongoose.Promise = global.Promise;

// connect to mongodb
mongoose.connect(config.get('mongoose').uri, config.get('mongoose').options);

// Events
mongoose.connection.on('connected', function () {
  logger.info('MongoDB connection open to mongodb://' + mongoose.connection.host + ":" + mongoose.connection.port);
});

mongoose.connection.on('error',function (err) {
  logger.info('MongoDB connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  logger.info('MongoDB connection disconnected');
});

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    logger.info('MongoDB connection disconnected through app termination');
    process.exit(0);
  });
});

module.exports = mongoose;
