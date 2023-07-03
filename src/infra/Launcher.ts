import { App } from "aws-cdk-lib";
import { DataStack } from "./stacks/DataStack";
import { LambdaStack } from "./stacks/LambdaStack";
import { ApiStack } from "./stacks/ApiStack";
import { AuthStack } from "./stacks/AuthStack";

const app = new App();

const dataStack = new DataStack(app, "DataStack");

const lambdaStack = new LambdaStack(app, "LambdaStack", {
  spacesTable: dataStack.spacesTable,
});

const authStack = new AuthStack(app, "AuthStack");

new ApiStack(app, "ApiStack", {
  spacesLamdbdaApiIntegration: lambdaStack.spacesLamdbdaApiIntegration,
  userPool: authStack.getUserPool(),
});
