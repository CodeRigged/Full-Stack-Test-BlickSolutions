import CancelIcon from "@mui/icons-material/Cancel"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import SaveIcon from "@mui/icons-material/Save"
import { Button, Card, CardActions, CardContent, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { ShoppingItem } from "shared/types"
import { apiFetch } from "~/utils/api"

interface ShoppingListItemProps {
  item: ShoppingItem
  loading: boolean
  onChange: () => void
}

const BASE_ROUTE = "/shopping"

const ShoppingListItem = ({ item, onChange, loading }: ShoppingListItemProps) => {
  const [editMode, setEditMode] = useState(false)
  const [editName, setEditName] = useState(item.name)

  // Save edited shopping item
  const handleSaveEdit = () => {
    if (!editName.trim()) return
    apiFetch(`${BASE_ROUTE}/${item._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editName }),
    }).then(() => {
      setEditMode(false)
      onChange()
    })
  }

  // Cancel editing
  const handleCancelEdit = () => {
    setEditMode(false)
    setEditName(item.name)
  }

  // Delete shopping item
  const handleDelete = () => {
    apiFetch(`${BASE_ROUTE}/${item._id}`, { method: "DELETE" }).then(() => onChange())
  }

  // Toggle bought status
  const handleToggleBought = () => {
    apiFetch(`${BASE_ROUTE}/${item._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bought: !item.bought }),
    }).then(() => onChange())
  }

  return (
    <Card variant="outlined">
      <CardContent sx={{ display: "flex", alignItems: "center" }}>
        {editMode ? (
          <TextField
            value={editName}
            onChange={e => setEditName(e.target.value)}
            size="small"
            fullWidth
            autoFocus
            onKeyDown={e => {
              if (e.key === "Enter") handleSaveEdit()
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
      <CardActions sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Button
          size="small"
          variant={item.bought ? "contained" : "outlined"}
          color={item.bought ? "success" : "inherit"}
          onClick={handleToggleBought}
          disabled={loading || item.bought}
          sx={{ minWidth: 80 }}
        >
          {item.bought ? "Bought" : "Buy"}
        </Button>
        <span style={{ flex: 1 }} />
        {editMode ? (
          <>
            <Button
              size="small"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleSaveEdit}
              disabled={loading || !editName.trim()}
              sx={{ ml: 1 }}
            >
              Save
            </Button>
            <Button
              size="small"
              color="inherit"
              startIcon={<CancelIcon />}
              onClick={handleCancelEdit}
              disabled={loading}
              sx={{ ml: 1 }}
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
              onClick={() => setEditMode(true)}
              disabled={loading || item.bought}
              sx={{ ml: 1 }}
            >
              Edit
            </Button>
            <Button
              size="small"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
              disabled={loading}
              sx={{ ml: 1 }}
            >
              Delete
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  )
}

export default ShoppingListItem
