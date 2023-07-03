import { Stack, StackProps } from "aws-cdk-lib";
import {
  AuthorizationType,
  CognitoUserPoolsAuthorizer,
  LambdaIntegration,
  MethodOptions,
  RestApi,
} from "aws-cdk-lib/aws-apigateway";
import { IUserPool } from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";

interface ApiStackProps extends StackProps {
  spacesLamdbdaApiIntegration: LambdaIntegration;
  userPool: IUserPool;
}

export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);

    const restApi = new RestApi(this, "SpacesApi");

    const restApiAuthorizer = new CognitoUserPoolsAuthorizer(
      this,
      "SpacesApiAuthorizer",
      {
        cognitoUserPools: [props.userPool],
        identitySource: "method.request.header.Authorization",
      }
    );
    restApiAuthorizer._attachToApi(restApi);

    const optionsWithAuth: MethodOptions = {
      authorizationType: AuthorizationType.COGNITO,
      authorizer: {
        authorizerId: restApiAuthorizer.authorizerId,
      },
    };

    const spacesResources = restApi.root.addResource("spaces");
    spacesResources.addMethod(
      "GET",
      props.spacesLamdbdaApiIntegration,
      optionsWithAuth
    );
    spacesResources.addMethod(
      "POST",
      props.spacesLamdbdaApiIntegration,
      optionsWithAuth
    );
    spacesResources.addMethod(
      "PUT",
      props.spacesLamdbdaApiIntegration,
      optionsWithAuth
    );
    spacesResources.addMethod(
      "DELETE",
      props.spacesLamdbdaApiIntegration,
      optionsWithAuth
    );
  }
}
