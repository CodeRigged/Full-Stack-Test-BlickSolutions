import { ShoppingItem } from "shared/types"
import { create } from "zustand"
import { apiFetch } from "~/utils/api"
import { createPendingSlice, PendingState } from "./state-handlers"

interface ShoppingStore extends PendingState {
  addItem: (name: string) => Promise<void>
  deleteItem: (id: ShoppingItem["_id"]) => Promise<void>
  fetchItems: () => Promise<void>
  items: ShoppingItem[]
  updateItem: (id: ShoppingItem["_id"], updates: Partial<Pick<ShoppingItem, "name" | "bought">>) => Promise<void>
}

export const useShoppingStore = create<ShoppingStore>((set, get, ...args) => ({
  ...createPendingSlice(set, get, ...args),
  items: [],
  fetchItems: async () => {
    const { setIsPending } = get()
    setIsPending(true, "Fetching shopping items...")
    try {
      const res = await apiFetch("/shopping")
      const data = await res.json()
      set({ items: data.shoppingItems })
    } finally {
      setIsPending(false)
    }
  },
  addItem: async name => {
    const { setIsPending, fetchItems } = get()
    setIsPending(true, "Adding item...")
    try {
      await apiFetch("/shopping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      })
      await fetchItems()
    } finally {
      setIsPending(false)
    }
  },
  updateItem: async (id, updates) => {
    const { setIsPending, fetchItems } = get()
    setIsPending(true, "Updating item...")
    try {
      await apiFetch(`/shopping/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      })
      await fetchItems()
    } finally {
      setIsPending(false)
    }
  },
  deleteItem: async id => {
    const { setIsPending, fetchItems } = get()
    setIsPending(true, "Deleting item...")
    try {
      await apiFetch(`/shopping/${id}`, { method: "DELETE" })
      await fetchItems()
    } finally {
      setIsPending(false)
    }
  },
}))
