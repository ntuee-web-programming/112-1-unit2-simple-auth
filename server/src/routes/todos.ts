import { createTodo, deleteTodo, getTodos } from "../controllers/todos";
import express from "express";

const router = express.Router();

router.get("/", getTodos);
router.post("/", createTodo);
router.delete("/:id", deleteTodo);

export default router;
