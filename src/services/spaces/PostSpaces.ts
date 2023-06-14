import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 } from "uuid";

export async function postSpaces(
  event: APIGatewayProxyEvent,
  dynamodbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> {
  const randomId = v4();

  const item = JSON.parse(event.body);
  item.id = randomId;

  await dynamodbClient.send(
    new PutItemCommand({
      TableName: process.env.TABLE_NAME,
      Item: {
        id: {
          S: randomId,
        },
        location: {
          S: item.location,
        },
      },
    })
  );

  return {
    statusCode: 201,
    body: JSON.stringify({ id: randomId }),
  };
}
