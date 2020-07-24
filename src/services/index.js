const { createDynamoDBService } = require('./dynamo-db.js');

const createServices = () => {
  const dynamoDBService = createDynamoDBService();

  return {
    dynamoDBService,
  };
};

module.exports = { createServices };
