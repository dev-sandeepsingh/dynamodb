const check = require('express-validator');
const { validateInput } = require('../../utils/validate-input.js');
const { toApiResponse } = require('../../utils/response.js');

const createAddUserRoute = ({
  router,
  services: {
    dynamoDBService: { addUser },
  },
}) => {
  /**
   * @api {post} /item/item Add item
   * @apiName item
   * @apiGroup Item
   *
   * @apiParam { string } companyName
   * @apiParam { string } tier
   *
   */
  router.post(
    '/user',
    [check.body('email').isEmail()],
    validateInput,
    toApiResponse(async ({ body: { email } }) => {
      await addUser({ email });
      return { status: 200, data: null };
    }),
  );

  return router;
};

module.exports = { createAddUserRoute };
