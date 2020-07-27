const { Router } = require('express');
const { createAddItemRoute } = require('./add-item.js');
const {
  createAddProjectByOrganizationRoute,
} = require('./add-project-by-organization.js');
const { createUpdateOrganizationRoute } = require('./update-organization.js');
const { createGetOrganizationRoute } = require('./get-organization.js');
const {
  createGetProjectByOrganizationRoute,
} = require('./get-projects-by-organization.js');

const createDynamoDBRoute = ({ services }) => {
  const router = new Router();

  createAddItemRoute({ router, services });
  createAddProjectByOrganizationRoute({ router, services });
  createUpdateOrganizationRoute({ router, services });
  createGetOrganizationRoute({ router, services });
  createGetProjectByOrganizationRoute({ router, services });
  return router;
};

module.exports = { createDynamoDBRoute };
