import { createTodo, deleteTodo, getTodos } from "../controllers/todos";
import { userAuth } from "../middlewares/userAuth";
import express from "express";

const router = express.Router();

// Add middleware to the routes
router.get("/", userAuth, getTodos);
router.post("/", userAuth, createTodo);
router.delete("/:id", userAuth, deleteTodo);

export default router;
