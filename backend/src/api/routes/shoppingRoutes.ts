import { Router } from "express";
import * as todoController from "../controllers/shoppingController";

const router = Router();

// todo routes
router.get("/", todoController.getTodos);
router.post("/", todoController.createTodo);
router.put("/:id", todoController.updateTodo);
router.delete("/:id", todoController.deleteTodo);

export default router;
