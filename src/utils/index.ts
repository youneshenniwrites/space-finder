import "dotenv/config";
import { Amplify } from "aws-amplify";
import { Fn, Stack } from "aws-cdk-lib";
import { randomUUID } from "crypto";

export function createRandomId() {
  return randomUUID();
}

export function getSuffixFromStack(stack: Stack) {
  const shortStackId = Fn.select(2, Fn.split("/", stack.stackId));
  const suffix = Fn.select(4, Fn.split("-", shortStackId));
  return suffix;
}

export function configureAmplify() {
  Amplify.configure({
    Auth: {
      region: process.env.AWS_REGION,
      userPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
      userPoolWebClientId: process.env.AWS_COGNITO_USER_POOL_WEB_CLIENT,
      authenticationFlowType: "USER_PASSWORD_AUTH",
    },
  });
}
