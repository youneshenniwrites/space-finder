import { handler } from "../src/services/spaces/handler";

handler({
  httpMethod: "GET", // "POST" "DELETE" "PUT"
  queryStringParameters: {
    // id: "some-id-here",
  },
  // body: JSON.stringify({
  //   location: "Tokyo",
  // }),
} as any);
