import { createTodo, getTodos } from "../controllers/todos";
import express from "express";

const router = express.Router();

router.get("/", getTodos);
router.post("/", createTodo);

export default router;
