import { Document, Schema, model } from "mongoose";
import { ShoppingItem as ShoppingItemType } from "shared/types";

export type IShoppingItem = ShoppingItemType & Document;

const shoppingItemSchema = new Schema<IShoppingItem>({
  name: { type: String, required: true },
  bought: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const ShoppingItem = model<IShoppingItem>(
  "ShoppingItem",
  shoppingItemSchema
);
