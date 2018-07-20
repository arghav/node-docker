const tasks = require('./tasks');

module.exports = {
  init: (app, prefix = '') => {
    app.use(`${prefix}/tasks`, tasks);
  }
}
