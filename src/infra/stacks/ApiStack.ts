import { Stack, StackProps } from "aws-cdk-lib";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";

interface ApiStackProps extends StackProps {
  spacesLamdbdaApiIntegration: LambdaIntegration;
}

export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);

    const api = new RestApi(this, "SpacesApi");
    const spacesResources = api.root.addResource("spaces");
    spacesResources.addMethod("GET", props.spacesLamdbdaApiIntegration);
    spacesResources.addMethod("POST", props.spacesLamdbdaApiIntegration);
  }
}
