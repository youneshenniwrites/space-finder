import "dotenv/config";
import { AuthService } from "./AuthService";

async function testAuth() {
  const service = new AuthService();
  const loginResult = await service.login(
    process.env.AWS_COGNITO_USERNAME,
    process.env.AWS_COGNITO_PASSWORD
  );
}

testAuth();
