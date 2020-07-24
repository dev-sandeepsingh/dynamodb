const { Router } = require('express');
const { createAddItemRoute } = require('./addItem.js');

const createDynamoDBRoute = ({ services }) => {
  const router = new Router();

  createAddItemRoute({ router, services });
  return router;
};

module.exports = { createDynamoDBRoute };
