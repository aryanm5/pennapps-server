import { DynamoDB } from 'aws-sdk';

const docClient = new DynamoDB.DocumentClient();

const table = 'pennapps';

const updateItem = async (id, info) => {
    let expressionAttributeNames = {};
    let expressionAttributeValues = { ':id': id };
    let updateExpression = 'set ';
    Object.keys(info).forEach(key => {
        if (info[key] !== undefined) {
            expressionAttributeNames['#' + key] = key;
            updateExpression += `#${key} = :${key}, `;
            expressionAttributeValues[':' + key] = info[key];
        }
    });
    updateExpression = updateExpression.slice(0, -2);

    const params = {
        TableName: table,
        Key: {
            id,
        },
        ConditionExpression: 'id = :id',
        ExpressionAttributeNames: expressionAttributeNames,
        UpdateExpression: updateExpression,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: 'ALL_NEW',
    };

    return (await docClient.update(params).promise()).Attributes;
};

export { updateItem };