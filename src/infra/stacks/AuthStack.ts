import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import {
  CfnUserPoolGroup,
  UserPool,
  UserPoolClient,
} from "aws-cdk-lib/aws-cognito";

import { Construct } from "constructs";

interface AuthStackProps extends StackProps {}

export class AuthStack extends Stack {
  private userPool: UserPool;
  private userPoolClient: UserPoolClient;

  constructor(scope: Construct, id: string, props?: AuthStackProps) {
    super(scope, id, props);

    this.createUserPool();
    this.createUserPoolClient();
    this.createAdminsGroup();
  }

  getUserPool(): UserPool {
    return this.userPool;
  }

  private createUserPool() {
    this.userPool = new UserPool(this, "SpaceUserPool", {
      selfSignUpEnabled: true,
      signInAliases: {
        username: true,
        email: true,
      },
    });

    new CfnOutput(this, "SpaceUserPoolId", {
      value: this.userPool.userPoolId,
    });
  }
  private createUserPoolClient() {
    this.userPoolClient = this.userPool.addClient("SpaceUserPoolClient", {
      authFlows: {
        adminUserPassword: true,
        custom: true,
        userPassword: true,
        userSrp: true,
      },
    });

    new CfnOutput(this, "SpaceUserPoolClient", {
      value: this.userPoolClient.userPoolClientId,
    });
  }

  private createAdminsGroup() {
    new CfnUserPoolGroup(this, "SpaceAdmins", {
      userPoolId: this.userPool.userPoolId,
      groupName: "admins",
    });
  }
}
