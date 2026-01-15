import { Box, CircularProgress, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { ShoppingItem } from "shared/types"
import { useErrorStore } from "~/stores/state-handlers"
import { apiFetch } from "~/utils/api"
import ShoppingListForm from "./ShoppingListForm"
import ShoppingListItems from "./ShoppingListItems"

const ShoppingList = () => {
  const [items, setItems] = useState<ShoppingItem[]>([])
  const [loading, setLoading] = useState(false)
  const { setError } = useErrorStore()

  // Fetch shopping items
  const fetchItems = () => {
    setLoading(true)
    apiFetch("/shopping")
      .then(res => res.json())
      .then(data => setItems(data.shoppingItems))
      .catch(e => setError(e))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box maxWidth={480} mx="auto" mt={4}>
      <Typography variant="h4" gutterBottom align="center">
        Shopping List
      </Typography>
      <ShoppingListForm onAdd={fetchItems} loading={loading} />
      {loading && (
        <Box display="flex" justifyContent="center" my={2}>
          <CircularProgress size={32} />
        </Box>
      )}
      <ShoppingListItems items={items} onChange={fetchItems} loading={loading} />
      {items.length === 0 && !loading && (
        <Typography align="center" color="text.secondary" mt={2}>
          No shopping items yet.
        </Typography>
      )}
    </Box>
  )
}

export default ShoppingList
