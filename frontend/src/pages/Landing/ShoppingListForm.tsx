import { Box, Button, TextField } from "@mui/material"
import { useState } from "react"
import { FormattedMessage, useIntl } from "react-intl"
import { useShoppingStore } from "~/stores/shopping-store"

interface ShoppingListFormProps {
  onAdd: () => void
}

const ShoppingListForm = ({ onAdd }: ShoppingListFormProps) => {
  const intl = useIntl()
  const [newItem, setNewItem] = useState("")
  const { addItem, isPending } = useShoppingStore()

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newItem.trim()) return
    await addItem(newItem)
    setNewItem("")
    onAdd()
  }

  return (
    <Box component="form" onSubmit={handleAdd} mb={3} display="flex" gap={2}>
      <TextField
        value={newItem}
        onChange={e => setNewItem(e.target.value)}
        placeholder={intl.formatMessage({
          id: "pages.landing.addShoppingItem",
          defaultMessage: "Add a new shopping item",
        })}
        disabled={isPending}
        size="small"
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary" disabled={isPending || !newItem.trim()}>
        <FormattedMessage id="common.add" defaultMessage="Add" />
      </Button>
    </Box>
  )
}

export default ShoppingListForm
