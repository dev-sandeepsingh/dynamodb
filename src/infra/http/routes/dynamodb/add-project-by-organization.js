const check = require('express-validator');
const { validateInput } = require('../../utils/validate-input.js');
const { toApiResponse } = require('../../utils/response.js');

const createAddProjectByOrganizationRoute = ({
  router,
  services: {
    dynamoDBService: { addProjectByOrganization },
  },
}) => {
  router.post(
    '/projectByOrganization',
    [
      check.body('name').isString(),
      check.body('type').isString(),
      check.param('orgId'),
    ],
    validateInput,
    toApiResponse(async ({ body: { name, type }, query: { orgId } }) => {
      await addProjectByOrganization({ name, type, orgId });
      return { status: 200, data: null };
    }),
  );

  return router;
};

module.exports = { createAddProjectByOrganizationRoute };
