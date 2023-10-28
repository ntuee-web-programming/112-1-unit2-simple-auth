import { Todo, User } from "./db";

export type SignUpRequest = {
  email: User["email"];
  name: User["name"];
  password: string;
};
export type SignUpResponse = {
  user: Omit<User, "hashedPassword">;
  token: string;
};

export type SignInRequest = {
  email: User["email"];
  password: string;
};
export type SignInResponse = SignUpResponse;

export type GetTodosRequest = {
  userId: User["id"];
};
export type GetTodosResponse = Omit<Todo, "userId">[];

export type CreateTodoRequest = Todo;
export type CreateTodoResponse = Omit<Todo, "userId">;
