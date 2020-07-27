const check = require('express-validator');
const { validateInput } = require('../../utils/validate-input.js');
const { toApiResponse } = require('../../utils/response.js');

const createGetProjectByOrganizationRoute = ({
  router,
  services: {
    dynamoDBService: { getAllProjectsByOrganization },
  },
}) => {
  router.get(
    '/projectByOrganization',
    [check.param('orgId')],
    validateInput,
    toApiResponse(async ({ query: { orgId } }) => {
      const projects = await getAllProjectsByOrganization({ orgId });
      return { status: 200, data: projects };
    }),
  );

  return router;
};

module.exports = { createGetProjectByOrganizationRoute };
