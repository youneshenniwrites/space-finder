import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";

interface AuthStackProps extends StackProps {}

export class AuthStack extends Stack {
  constructor(scope: Construct, id: string, props?: AuthStackProps) {
    super(scope, id, props);
  }
}
