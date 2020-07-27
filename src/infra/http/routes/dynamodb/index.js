const { Router } = require('express');
const { createAddItemRoute } = require('./add-item.js');
const {
  createAddProjectByOrganizationRoute,
} = require('./add-project-by-organization.js');

const createDynamoDBRoute = ({ services }) => {
  const router = new Router();

  createAddItemRoute({ router, services });
  createAddProjectByOrganizationRoute({ router, services });
  return router;
};

module.exports = { createDynamoDBRoute };
