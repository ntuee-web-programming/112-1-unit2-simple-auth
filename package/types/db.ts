export type User = {
  id: string;
  name: string;
  email: string;
  hashedPassword: string;
};

export type Todo = {
  id: string;
  userId: User["id"];
  content: string;
};
