const { Router } = require('express');
const { createAddUserRoute } = require('./add-user.js');
const {
  createAddProjectByOrganizationRoute,
} = require('./add-project-by-organization.js');
const { createUpdateUserRoute } = require('./update-user.js');
const { createGetUserRoute } = require('./get-user.js');
const {
  createGetProjectByOrganizationRoute,
} = require('./get-projects-by-organization.js');

const createDynamoDBRoute = ({ services }) => {
  const router = new Router();

  createAddUserRoute({ router, services });
  createAddProjectByOrganizationRoute({ router, services });
  createUpdateUserRoute({ router, services });
  createGetUserRoute({ router, services });
  createGetProjectByOrganizationRoute({ router, services });
  return router;
};

module.exports = { createDynamoDBRoute };
