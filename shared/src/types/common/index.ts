import type { ObjectId } from "mongodb";

export interface ShoppingItem {
  _id: ObjectId;
  name: string;
  bought: boolean;
  createdAt: Date;
}
