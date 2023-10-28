import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from "@package/types/api";
import { Request, Response } from "express";

export const signUp = async (
  req: Request<never, never, SignUpRequest>,
  res: Response<SignUpResponse>,
) => {
  const { email, password, name } = req.body;
  console.log("[signUp]");
  console.log("email", email);
  console.log("name", name);
  console.log("password", password);
};

export const signIn = async (
  req: Request<never, never, SignInRequest>,
  res: Response<SignInResponse>,
) => {
  const { email, password } = req.body;
  console.log("[signIn]");
  console.log("email", email);
  console.log("password", password);
};
