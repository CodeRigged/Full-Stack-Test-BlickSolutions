import { IShoppingItem, ShoppingItem } from "../models/ShoppingItem";

/**
 * Fetch all shopping items from the database.
 * @returns {Promise<IShoppingItem[]>} Array of shopping item documents
 */
export const getAllShoppingItems = async (): Promise<IShoppingItem[]> => {
  return ShoppingItem.find();
};

/**
 * Create a new shopping item with the given name.
 * @param {string} name - The name of the shopping item
 * @returns {Promise<IShoppingItem>} The created shopping item document
 */
export const createShoppingItem = async (
  name: string
): Promise<IShoppingItem> => {
  const shoppingItem = new ShoppingItem({ name });
  return shoppingItem.save();
};

/**
 * Update the name and/or bought status of a shopping item by its ID.
 * @param {string} id - The ID of the shopping item to update
 * @param {object} updates - The fields to update (name and/or bought)
 * @returns {Promise<IShoppingItem | null>} The updated shopping item document, or null if not found
 */
export const updateShoppingItem = async (
  id: string,
  updates: Partial<Pick<IShoppingItem, "name" | "bought">>
): Promise<IShoppingItem | null> => {
  const updateFields: Partial<Pick<IShoppingItem, "name" | "bought">> = {};
  if (typeof updates.name !== "undefined") updateFields.name = updates.name;
  if (typeof updates.bought !== "undefined")
    updateFields.bought = updates.bought;

  return ShoppingItem.findByIdAndUpdate(id, updateFields, { new: true });
};

/**
 * Delete a shopping item by its ID.
 * @param {string} id - The ID of the shopping item to delete
 * @returns {Promise<IShoppingItem | null>} The deleted shopping item document, or null if not found
 */
export const deleteShoppingItem = async (
  id: string
): Promise<IShoppingItem | null> => {
  return ShoppingItem.findByIdAndDelete(id);
};
