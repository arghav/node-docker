const config = require('config');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Make sure the app parses JSON
app.use(bodyParser.json({ strict: true }));

const mongoose = require('./db');
const routes = require('./routes/index');

app.use('/tasks', routes.tasks);

module.exports = app;
