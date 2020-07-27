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
    '/addProjectByOrganization',
    [check.body('name').isString(), check.param('orgId')],
    validateInput,
    toApiResponse(async ({ body: { name }, query: { orgId } }) => {
      await addProjectByOrganization({ name, orgId });
      return { status: 204, data: null };
    }),
  );

  return router;
};

module.exports = { createAddProjectByOrganizationRoute };
