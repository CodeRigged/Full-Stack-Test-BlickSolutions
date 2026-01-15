import { Router } from "express";
import * as shoppingController from "../controllers/shoppingController";

const router = Router();

// shopping item routes
router.get("/", shoppingController.getShoppingItems);
router.post("/", shoppingController.createShoppingItem);
router.put("/:id", shoppingController.updateShoppingItem);
router.delete("/:id", shoppingController.deleteShoppingItem);

export default router;
