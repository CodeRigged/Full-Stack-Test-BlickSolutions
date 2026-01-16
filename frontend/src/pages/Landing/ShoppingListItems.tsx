import { Stack } from "@mui/material"
import { ShoppingItem } from "shared/types"
import ShoppingListItem from "./ShoppingListItem"

interface ShoppingListItemsProps {
  items: ShoppingItem[]
  onChange: () => void
}

const ShoppingListItems = ({ items, onChange }: ShoppingListItemsProps) => {
  return (
    <Stack spacing={2}>
      {items.map(item => (
        <ShoppingListItem key={item._id as unknown as string} item={item} onChange={onChange} />
      ))}
    </Stack>
  )
}

export default ShoppingListItems
