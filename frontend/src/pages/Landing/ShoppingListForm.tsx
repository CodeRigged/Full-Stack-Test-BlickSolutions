import { Box, Button, TextField } from "@mui/material"
import { useState } from "react"
import { apiFetch } from "~/utils/api"

interface ShoppingListFormProps {
  loading: boolean
  onAdd: () => void
}

const ShoppingListForm = ({ onAdd, loading }: ShoppingListFormProps) => {
  const [newItem, setNewItem] = useState("")

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newItem.trim()) return
    apiFetch("/shopping", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newItem }),
    }).then(() => {
      setNewItem("")
      onAdd()
    })
  }

  return (
    <Box component="form" onSubmit={handleAdd} mb={3} display="flex" gap={2}>
      <TextField
        value={newItem}
        onChange={e => setNewItem(e.target.value)}
        placeholder="Add a new shopping item"
        disabled={loading}
        size="small"
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary" disabled={loading || !newItem.trim()}>
        Add
      </Button>
    </Box>
  )
}

export default ShoppingListForm
