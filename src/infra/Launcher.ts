import { App } from "aws-cdk-lib";
import { DataStack } from "./stacks/DataStack";
import { LambdaStack } from "./stacks/LambdaStack";
import { ApiStack } from "./stacks/ApiStack";

const app = new App();

new DataStack(app, "DataStack");

const lambdaStack = new LambdaStack(app, "LambdaStack");

new ApiStack(app, "ApiStack", {
  helloLamdbdaIntegration: lambdaStack.helloLambdaIntegration,
});
