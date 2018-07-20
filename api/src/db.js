const debug = require('debug')('api:db');
const config = require('config');
const mongoose = require('mongoose');

// Setup events
const setupEvents = () => {
  const { connection } = mongoose;

  connection.on('connected', function () {
    debug('MongoDB connection open to mongodb://' + connection.host + ":" + connection.port);
  });

  connection.on('error', function (err) {
    debug('MongoDB connection error: ' + err);
  });

  connection.on('disconnected', function () {
    debug('MongoDB connection disconnected');
  });

  process.on('SIGINT', function() {
    connection.close(function () {
      debug('MongoDB connection disconnected through app termination');
      process.exit(0);
    });
  });
}

module.exports = {
  connect: async () => {
    await setupEvents();

    return await mongoose.connect(config.get('mongoose').uri, config.get('mongoose').options);
  },
  disconnect: async () => {
    return mongoose.disconnect();
  }
};
