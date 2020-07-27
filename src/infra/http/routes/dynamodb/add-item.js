const check = require('express-validator');
const { validateInput } = require('../../utils/validate-input.js');
const { toApiResponse } = require('../../utils/response.js');

const createAddItemRoute = ({
  router,
  services: {
    dynamoDBService: { addItem },
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
    '/item',
    [check.body('name').isString(), check.body('tier').isString()],
    validateInput,
    toApiResponse(async ({ body: { name, tier } }) => {
      await addItem({ name, tier });
      return { status: 200, data: null };
    }),
  );

  return router;
};

module.exports = { createAddItemRoute };
