import {
  Context,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda";

async function handler(event: APIGatewayProxyEvent, context: Context) {
  const response: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify("Hello from lambda!"),
  };
  return response;
}

export { handler };
