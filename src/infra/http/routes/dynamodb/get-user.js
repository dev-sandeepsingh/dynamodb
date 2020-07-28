const check = require('express-validator');
const { validateInput } = require('../../utils/validate-input.js');
const { toApiResponse } = require('../../utils/response.js');

const createGetUserRoute = ({
  router,
  services: {
    dynamoDBService: { getUser },
  },
}) => {
  router.get(
    '/user',
    [check.param('userId')],
    validateInput,
    toApiResponse(async ({ query: { userId } }) => {
      const organization = await getUser({ userId });
      return { status: 200, data: organization };
    }),
  );

  return router;
};

module.exports = { createGetUserRoute };
