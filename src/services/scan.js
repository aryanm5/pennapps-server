import { DynamoDB } from 'aws-sdk';

const docClient = new DynamoDB.DocumentClient();

const scan = async () =>
    (await docClient.scan({
        TableName: 'pennapps',
    }).promise()).Items;

export { scan };