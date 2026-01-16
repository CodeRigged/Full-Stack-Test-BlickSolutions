import { Stack } from "@mui/material"
import { useShoppingStore } from "~/stores/shopping-store"
import ShoppingListItem from "./ShoppingListItem"

const ShoppingListItems = () => {
  const { items } = useShoppingStore()
  return (
    <Stack spacing={2}>
      {items.map(item => (
        <ShoppingListItem key={item._id as unknown as string} item={item} />
      ))}
    </Stack>
  )
}

export default ShoppingListItems
