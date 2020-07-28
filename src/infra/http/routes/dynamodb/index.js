const { Router } = require('express');
const { createAddUserRoute } = require('./add-user.js');
const {
  createAddProjectByOrganizationRoute,
} = require('./add-project-by-organization.js');
const { createUpdateOrganizationRoute } = require('./update-organization.js');
const { createGetUserRoute } = require('./get-user.js');
const {
  createGetProjectByOrganizationRoute,
} = require('./get-projects-by-organization.js');

const createDynamoDBRoute = ({ services }) => {
  const router = new Router();

  createAddUserRoute({ router, services });
  createAddProjectByOrganizationRoute({ router, services });
  createUpdateOrganizationRoute({ router, services });
  createGetUserRoute({ router, services });
  createGetProjectByOrganizationRoute({ router, services });
  return router;
};

module.exports = { createDynamoDBRoute };
