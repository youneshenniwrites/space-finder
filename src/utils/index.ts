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
