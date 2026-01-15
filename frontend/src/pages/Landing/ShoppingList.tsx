import CancelIcon from "@mui/icons-material/Cancel"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import SaveIcon from "@mui/icons-material/Save"
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import { useEffect, useState } from "react"
import { ShoppingItem } from "shared/types"
import { useErrorStore } from "~/stores/state-handlers"
import { apiFetch } from "~/utils/api"

const ShoppingList = () => {
  const [items, setItems] = useState<ShoppingItem[]>([])
  const [newItem, setNewItem] = useState("")
  const [editId, setEditId] = useState<ShoppingItem["_id"] | null>(null)
  const [editName, setEditName] = useState("")
  const { setError } = useErrorStore()
  const [loading, setLoading] = useState(false)

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

  // Add shopping item
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newItem.trim()) return
    setLoading(true)
    apiFetch("/shopping", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newItem }),
    })
      .then(res => res.json())
      .then(() => {
        setNewItem("")
        fetchItems()
      })
      .catch(e => setError(e))
      .finally(() => setLoading(false))
  }

  // Delete shopping item
  const handleDelete = (id: ShoppingItem["_id"]) => {
    setLoading(true)
    apiFetch(`/shopping/${id}`, { method: "DELETE" })
      .then(res => res.json())
      .then(() => fetchItems())
      .catch(e => setError(e))
      .finally(() => setLoading(false))
  }

  // Start editing a shopping item
  const handleEdit = (id: ShoppingItem["_id"], name: string) => {
    setEditId(id)
    setEditName(name)
  }

  // Cancel editing
  const handleCancelEdit = () => {
    setEditId(null)
    setEditName("")
  }

  // Save edited shopping item
  const handleSaveEdit = (id: ShoppingItem["_id"]) => {
    if (!editName.trim()) return
    setLoading(true)
    apiFetch(`/shopping/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editName }),
    })
      .then(res => res.json())
      .then(() => {
        setEditId(null)
        setEditName("")
        fetchItems()
      })
      .catch(e => setError(e))
      .finally(() => setLoading(false))
  }

  // Toggle bought status
  const handleToggleBought = (id: ShoppingItem["_id"], bought: boolean) => {
    setLoading(true)
    apiFetch(`/shopping/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bought: !bought }),
    })
      .then(res => res.json())
      .then(() => fetchItems())
      .catch(e => setError(e))
      .finally(() => setLoading(false))
  }

  return (
    <Box maxWidth={480} mx="auto" mt={4}>
      <Typography variant="h4" gutterBottom align="center">
        Shopping List
      </Typography>
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
      {loading && (
        <Box display="flex" justifyContent="center" my={2}>
          <CircularProgress size={32} />
        </Box>
      )}
      <Stack spacing={2}>
        {items.map(item => (
          <Card key={item._id as unknown as string} variant="outlined">
            <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Button
                size="small"
                variant={item.bought ? "contained" : "outlined"}
                color={item.bought ? "success" : "inherit"}
                onClick={() => handleToggleBought(item._id, item.bought)}
                disabled={loading || item.bought}
                sx={{ minWidth: 80 }}
              >
                {item.bought ? "Bought" : "Buy"}
              </Button>
              {editId === item._id ? (
                <TextField
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  size="small"
                  fullWidth
                  autoFocus
                  onKeyDown={e => {
                    if (e.key === "Enter") handleSaveEdit(item._id)
                    if (e.key === "Escape") handleCancelEdit()
                  }}
                  disabled={loading}
                  sx={{ ml: 2 }}
                />
              ) : (
                <Typography
                  sx={{
                    textDecoration: item.bought ? "line-through" : "none",
                    color: item.bought ? "text.secondary" : "text.primary",
                    ml: 2,
                  }}
                >
                  {item.name}
                </Typography>
              )}
            </CardContent>
            <CardActions>
              {editId === item._id ? (
                <>
                  <Button
                    size="small"
                    color="primary"
                    startIcon={<SaveIcon />}
                    onClick={() => handleSaveEdit(item._id)}
                    disabled={loading || !editName.trim()}
                  >
                    Save
                  </Button>
                  <Button
                    size="small"
                    color="inherit"
                    startIcon={<CancelIcon />}
                    onClick={handleCancelEdit}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    size="small"
                    color="info"
                    startIcon={<EditIcon />}
                    onClick={() => handleEdit(item._id, item.name)}
                    disabled={loading}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(item._id)}
                    disabled={loading}
                  >
                    Delete
                  </Button>
                </>
              )}
            </CardActions>
          </Card>
        ))}
      </Stack>
      {items.length === 0 && !loading && (
        <Typography align="center" color="text.secondary" mt={2}>
          No shopping items yet.
        </Typography>
      )}
    </Box>
  )
}

export default ShoppingList
