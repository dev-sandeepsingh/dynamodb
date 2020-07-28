const check = require('express-validator');
const { validateInput } = require('../../utils/validate-input.js');
const { toApiResponse } = require('../../utils/response.js');

const createUpdateUserRoute = ({
  router,
  services: {
    dynamoDBService: { updateUser },
  },
}) => {
  router.put(
    '/user',
    [check.body('firstName').isString(), check.param('userId')],
    validateInput,
    toApiResponse(async ({ body: { firstName }, query: { userId } }) => {
      await updateUser({ firstName, userId });
      return { status: 204, data: null };
    }),
  );

  return router;
};

module.exports = { createUpdateUserRoute };
