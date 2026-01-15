import { Stack } from "@mui/material"
import { ShoppingItem } from "shared/types"
import ShoppingListItem from "./ShoppingListItem"

interface ShoppingListItemsProps {
  items: ShoppingItem[]
  loading: boolean
  onChange: () => void
}

const ShoppingListItems = ({ items, onChange, loading }: ShoppingListItemsProps) => {
  return (
    <Stack spacing={2}>
      {items.map(item => (
        <ShoppingListItem key={item._id as unknown as string} item={item} onChange={onChange} loading={loading} />
      ))}
    </Stack>
  )
}

export default ShoppingListItems
