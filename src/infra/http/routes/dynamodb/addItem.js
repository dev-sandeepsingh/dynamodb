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
   * @api {post} /item/addItem Add item
   * @apiName AddItem
   * @apiGroup Item
   *
   * @apiParam { string } companyName
   * @apiParam { string } tier
   *
   */
  router.post(
    '/addItem',
    [check.body('name').isString(), check.body('tier').isString()],
    validateInput,
    toApiResponse(async ({ body: { name, tier } }) => {
      await addItem({ name, tier });
      return { status: 204, data: null };
    }),
  );

  return router;
};

module.exports = { createAddItemRoute };
