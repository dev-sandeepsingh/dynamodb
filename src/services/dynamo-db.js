const { uuid } = require('uuidv4');
const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' });

const dynamodb = new AWS.DynamoDB.DocumentClient();
const TableName = 'project-management';

const createDynamoDBService = () => {
  const addItem = ({ name, tier }) => {
    const orgId = uuid();
    const params = {
      TableName,
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

  const getOrganization = ({ orgId }) => {
    const params = {
      TableName,
      Key: {
        PK: `ORG#${orgId}`,
        SK: `#METADATA#${orgId}`,
      },
    };

    dynamodb.get(params, function(err, data) {
      if (err) console.log(err);
      else console.log(data);
    });
  };

  const updateOrganization = ({ orgId, name }) => {
    const params = {
      TableName,
      Key: { PK: `ORG#${orgId}`, SK: `#METADATA#${orgId}` },
      UpdateExpression: 'set #org_id = :org_id, #name = :name',
      ExpressionAttributeNames: { '#org_id': 'org_id', '#name': 'name' },
      ExpressionAttributeValues: {
        ':org_id': orgId,
        ':name': name,
      },
    };

    dynamodb.update(params, function(err, data) {
      if (err) console.log(err);
      else console.log(data);
    });
  };
  const addProjectByOrganization = ({ name, type, orgId }) => {
    const projectId = uuid();
    const params = {
      TableName,
      Item: {
        PK: `ORG#${orgId}`,
        SK: `PRO#${type}#${projectId}`,
        name,
        projectId,
      },
    };

    dynamodb.put(params, function(err, data) {
      if (err) console.log(err);
      else console.log(data);
    });
  };
  return {
    addItem,
    addProjectByOrganization,
    updateOrganization,
    getOrganization,
  };
};

module.exports = { createDynamoDBService };
