const { uuid } = require('uuidv4');
const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' });

const dynamodb = new AWS.DynamoDB.DocumentClient();

const createDynamoDBService = () => {
  const addItem = ({ name, tier }) => {
    const orgId = uuid();
    const params = {
      TableName: 'project-management',
      Item: {
        PK: `ORG#${orgId}`,
        SK: `#METADATA#${orgId}`,
        name,
        tier,
      },
    };

    dynamodb.put(params, function(err, data) {
      if (err) console.log(err);
      else console.log(data);
    });
  };
  return { addItem };
};

module.exports = { createDynamoDBService };
