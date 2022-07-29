import * as uuid from "uuid";
import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export async function main(event, context) {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.tableName,
    Item: {
      // The attributes of the item to be created
      userId: "123", // The id of the author
      wuId: uuid.v1(), // A unique uuid
      wuTitle: data.wuTitle, // Parsed from requet body
      wuDescription: data.wuDescription, // Parsed from request body
      cloudApps: data.cloudApps, // Parsed from request body
      onPremApps: data.onPremApps, // Parsed from request body
      recordsPerMonth: data.recordsPerMonth, // Parsed from request body
      hoursPerMonth: data.hoursPerMonth, // Parsed from request body
      whoDoesItNow: data.whoDoesItNow, // Parsed from request body
      hourlyRate: data.hourlyRate,  // Parsed from request body
      attachment: data.attachment, // Parsed from request body
      createdAt: Date.now(), // Current Unix timestamp
    },
  };

  // Set response headers to enable CORS (Cross-Origin Resource Sharing)
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  };

  try {
    await dynamoDb.put(params).promise();

    return {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(params.Item),
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: headers,
      body: JSON.stringify({ error: e.message }),
    };
  }
}