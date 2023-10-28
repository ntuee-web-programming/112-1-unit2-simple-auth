import { db } from "../db";
import { todosTable } from "../db/schema";
import {
  CreateTodoRequest,
  CreateTodoResponse,
  GetTodosRequest,
  GetTodosResponse,
} from "@package/types/api";
import { eq } from "drizzle-orm";
import { Request, Response } from "express";

export const getTodos = async (
  req: Request<never, never, never, GetTodosRequest>,
  res: Response<GetTodosResponse | { error: string }>,
) => {
  try {
    const { userId } = req.query;
    console.log("[getTodos]");
    console.log("userId", userId);
    const todos = await db
      .select({
        id: todosTable.displayId,
        content: todosTable.content,
      })
      .from(todosTable)
      .where(eq(todosTable.userId, userId))
      .execute();
    return res.status(200).json(
      todos.map((todo) => ({
        content: todo.content,
        id: todo.id,
      })),
    );
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createTodo = async (
  req: Request<never, never, CreateTodoRequest>,
  res: Response<CreateTodoResponse | { error: string }>,
) => {
  try {
    const { content, userId } = req.body;
    console.log("[createTodo]");
    console.log("content", content);
    console.log("userId", userId);
    const [todo] = await db
      .insert(todosTable)
      .values({
        content,
        userId,
      })
      .returning();
    return res.status(201).json({
      id: todo.displayId,
      content: todo.content,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
