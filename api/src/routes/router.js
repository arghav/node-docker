/**
 * An extension of the express router with custom methods
 */
const express = require('express');
const router = express.Router();

router.sendResponse = (response, resource, code) => {
  if (!resource) {
    response.status(404).json({ message: "Resource not found" });
  } else {
    response.status(!code ? 200 : code).json(resource);
  }
};

router.sendError = (response, error) => {
  if ("ObjectId" === error.kind && "CastError" === error.name) {
    response.status(404).json({ message: "Resource not found" });
  } else {
    response.status(500).json({ message: "Internal server error" });
  }
};

module.exports = router;
