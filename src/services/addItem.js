import { DynamoDB } from 'aws-sdk';

const docClient = new DynamoDB.DocumentClient();

const addItem = async info =>
    await docClient.put({
        TableName: 'pennapps',
        Item: info,
        ConditionExpression: 'attribute_not_exists(id)',
    }).promise();

export { addItem };