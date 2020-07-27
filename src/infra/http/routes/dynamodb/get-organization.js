const check = require('express-validator');
const { validateInput } = require('../../utils/validate-input.js');
const { toApiResponse } = require('../../utils/response.js');

const createGetOrganizationRoute = ({
  router,
  services: {
    dynamoDBService: { getOrganization },
  },
}) => {
  router.get(
    '/organization',
    [check.param('orgId')],
    validateInput,
    toApiResponse(async ({ query: { orgId } }) => {
      const organization = await getOrganization({ orgId });
      return { status: 200, data: organization };
    }),
  );

  return router;
};

module.exports = { createGetOrganizationRoute };
