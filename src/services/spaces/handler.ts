import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { postSpaces } from "./PostSpaces";
import { getSpaces } from "./GetSpaces";
import { updateSpace } from "./UpdateSpace";

const dynamodbClient = new DynamoDBClient({});

async function handler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  let message: string;
  let response: APIGatewayProxyResult;

  try {
    switch (event.httpMethod) {
      case "GET":
        response = await getSpaces(event, dynamodbClient);
        return response;
      case "POST":
        response = await postSpaces(event, dynamodbClient);
        return response;
      case "PUT":
        response = await updateSpace(event, dynamodbClient);
        return response;
      default:
        break;
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error.message),
    };
  }

  response = {
    statusCode: 200,
    body: JSON.stringify(message),
  };

  return response;
}

export { handler };
