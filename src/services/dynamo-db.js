const { uuid } = require('uuidv4');
const AWS = require('aws-sdk');
const {
  partationKeyPrefix,
  skEmailPrefix,
  skTokenPrefix,
  skConnectionPrefix,
  tableName,
} = require('../config.js');

AWS.config.update({ region: 'us-east-1' });

const dynamodb = new AWS.DynamoDB.DocumentClient();

const createDynamoDBService = () => {
  const addUser = ({ email }) => {
    const userId = uuid();
    const params = {
      TableName: tableName,
      Item: {
        PK: `${partationKeyPrefix}${userId}`,
        SK: `#METADATA#${userId}`,
        email,
        uuid: userId,
      },
    };

    dynamodb.put(params, function(err, data) {
      if (err) console.log(err);
      else console.log(data);
    });
  };

  const getUser = async ({ userId }) => {
    const params = {
      TableName: tableName,
      Key: {
        PK: `${partationKeyPrefix}${userId}`,
        SK: `#METADATA#${userId}`,
      },
    };
    let result;
    await dynamodb
      .get(params)
      .promise()
      .then(function(data) {
        result = data.Item;
      })
      .catch(function(err) {
        console.log(err);
      });
    return result;
  };

  const updateUser = ({ userId, firstName }) => {
    const params = {
      TableName: tableName,
      Key: { PK: `${partationKeyPrefix}${userId}`, SK: `#METADATA#${userId}` },
      UpdateExpression: 'set #firstName = :firstName',
      ExpressionAttributeNames: {
        '#firstName': 'firstName',
      },
      ExpressionAttributeValues: {
        ':firstName': firstName,
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
      TableName: tableName,
      Item: {
        PK: `${partationKeyPrefix}${orgId}`,
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
  const getAllProjectsByOrganization = async ({ orgId }) => {
    const params = {
      TableName: tableName,
      KeyConditionExpression: '#PK = :PK and begins_with(#SK, :SK)',
      ExpressionAttributeNames: { '#PK': 'PK', '#SK': 'SK' },
      ExpressionAttributeValues: {
        ':PK': `${partationKeyPrefix}${orgId}`,
        ':SK': 'PRO',
      },
    };
    let result;
    await dynamodb
      .query(params)
      .promise()
      .then(function(data) {
        result = data.Items;
      })
      .catch(function(err) {
        console.log(err);
      });
    return result;
  };

  return {
    addUser,
    addProjectByOrganization,
    updateUser,
    getUser,
    getAllProjectsByOrganization,
  };
};

module.exports = { createDynamoDBService };
