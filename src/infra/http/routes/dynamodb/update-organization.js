const check = require('express-validator');
const { validateInput } = require('../../utils/validate-input.js');
const { toApiResponse } = require('../../utils/response.js');

const createUpdateOrganizationRoute = ({
  router,
  services: {
    dynamoDBService: { updateOrganization },
  },
}) => {
  router.put(
    '/organization',
    [check.body('name').isString(), check.param('orgId')],
    validateInput,
    toApiResponse(async ({ body: { name }, query: { orgId } }) => {
      await updateOrganization({ name, orgId });
      return { status: 204, data: null };
    }),
  );

  return router;
};

module.exports = { createUpdateOrganizationRoute };
