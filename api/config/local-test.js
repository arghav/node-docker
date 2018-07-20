const config = {};

config.http = {
  port: process.env.PORT || 8080,
};

config.mongoose = {
  uri: 'mongodb://mongo_test:27017/api',
  options: {
    useNewUrlParser: true,
  }
};

module.exports = config;
