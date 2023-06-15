import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export async function getSpaces(
  event: APIGatewayProxyEvent,
  dynamodbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> {
  const result = await dynamodbClient.send(
    new ScanCommand({
      TableName: process.env.TABLE_NAME,
    })
  );

  return {
    statusCode: 201,
    body: JSON.stringify(result.Items),
  };
}
