import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
} from "@package/types/api";

export const signInApi = async ({ email, password }: SignInRequest) => {
  const response = await fetch("/api/signin", {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  const data: SignInResponse = await response.json();
  return data;
};
export const signUpApi = async ({ email, password, name }: SignUpRequest) => {
  const response = await fetch("/api/signup", {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
    method: "POST",
    body: JSON.stringify({ email, password, name }),
  });
  const data: SignInResponse = await response.json();
  return data;
};
