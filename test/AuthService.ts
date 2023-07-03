import { Auth } from "aws-amplify";
import { type CognitoUser } from "@aws-amplify/auth";
import { configureAmplify } from "../src/utils";

export class AuthService {
  constructor() {
    configureAmplify();
  }

  public async login(userName: string, password: string) {
    return (await Auth.signIn(userName, password)) as CognitoUser;
  }
}
