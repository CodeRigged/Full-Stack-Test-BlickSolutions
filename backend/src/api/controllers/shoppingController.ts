import { Request, Response } from "express";
import * as shoppingService from "../services/shoppingService";

/**
 * Controller to handle fetching all shopping items and sending them in the response.
 * Responds with a JSON array of shopping items or an error message.
 * @route GET /shopping-items
 */
export const getShoppingItems = async (_req: Request, res: Response) => {
  try {
    const shoppingItems = await shoppingService.getAllShoppingItems();
    res.json({ shoppingItems });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch shopping items" });
  }
};

/**
 * Controller to handle creating a new shopping item from request body.
 * Returns the created shopping item or an error message.
 * @route POST /shopping-items
 */
export const createShoppingItem = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });
    const shoppingItem = await shoppingService.createShoppingItem(name);
    res.status(201).json({ shoppingItem });
  } catch (err) {
    res.status(500).json({ error: "Failed to create shopping item" });
  }
};

/**
 * Controller to update a shopping item's name and bought status by ID.
 * Returns the updated shopping item or a not found/error message.
 * @route PUT /shopping-items/:id
 */
export const updateShoppingItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, bought } = req.body;
    if (typeof name === "undefined" && typeof bought === "undefined") {
      return res
        .status(400)
        .json({ error: "At least one of 'name' or 'bought' is required" });
    }
    const updatedShoppingItem = await shoppingService.updateShoppingItem(id, {
      name,
      bought,
    });
    if (!updatedShoppingItem) {
      return res.status(404).json({ error: "Shopping item not found" });
    }
    res.json({
      message: "Shopping item updated",
      shoppingItem: updatedShoppingItem,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to update shopping item" });
  }
};

/**
 * Controller to delete a shopping item by its ID.
 * Returns the deleted shopping item or a not found/error message.
 * @route DELETE /shopping-items/:id
 */
export const deleteShoppingItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedShoppingItem = await shoppingService.deleteShoppingItem(id);
    if (!deletedShoppingItem) {
      return res.status(404).json({ error: "Shopping item not found" });
    }
    res.json({
      message: "Shopping item deleted",
      shoppingItem: deletedShoppingItem,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete shopping item" });
  }
};
