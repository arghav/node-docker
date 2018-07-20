const config = require('config');
const express = require('express');
const bodyParser = require('body-parser');

const db = require('./db');
const routes = require('./routes/index');

const app = express();

// Make sure the app parses JSON
app.use(bodyParser.json({ strict: true }));

// Add routes
routes.init(app, '/api');

module.exports = app;
