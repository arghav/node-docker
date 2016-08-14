'use strict';

const router = require('./router');
const task = require('../models/task');

router.get('/:id', function(request, response) {
  task.get(request.params.id).then(function (resource) {
    router.sendResponse(response, resource);
  }).catch(function (error) {
    router.sendError(response, error);
  });
});

router.get('/', function(request, response) {
  task.getAll(request.query.since_id).then(function (resource) {
    router.sendResponse(response, resource);
  }).catch(function (error) {
    router.sendError(response, error);
  });
});

router.post('/', function(request, response) {
  task.post(request.body).then(function (resource) {
    router.sendResponse(response, resource, 201);
  }).catch(function (error) {
    router.sendError(response, error);
  });
});

router.put('/:id', function(request, response) {
  if (!request.body) {
    response.status(400).json({ message: "request body is missing" });
  }
    
  task.put(request.params.id, request.body).then(function (resource) {
    router.sendResponse(response, resource);
  }).catch(function (error) {
    router.sendError(response, error);
  });
});

router.delete('/:id', function(request, response) {
  task.delete(request.params.id).then(function (resource) {
    router.sendResponse(response, resource);
  }).catch(function (error) {
    router.sendError(response, error);
  });
});

module.exports = router;
