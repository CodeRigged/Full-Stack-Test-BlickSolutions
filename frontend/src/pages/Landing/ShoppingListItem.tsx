import CancelIcon from "@mui/icons-material/Cancel"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import SaveIcon from "@mui/icons-material/Save"
import { Button, Card, CardActions, CardContent, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { FormattedMessage } from "react-intl"
import { ShoppingItem } from "shared/types"
import { useShoppingStore } from "~/stores/shopping-store"

interface ShoppingListItemProps {
  item: ShoppingItem
}

const ShoppingListItem = ({ item }: ShoppingListItemProps) => {
  const [editMode, setEditMode] = useState(false)
  const [editName, setEditName] = useState(item.name)

  const { updateItem, deleteItem, isPending } = useShoppingStore()

  // Save edited shopping item
  const handleSaveEdit = async () => {
    if (!editName.trim()) return
    await updateItem(item._id, { name: editName })
    setEditMode(false)
  }

  // Cancel editing
  const handleCancelEdit = () => {
    setEditMode(false)
    setEditName(item.name)
  }

  // Delete shopping item
  const handleDelete = async () => {
    await deleteItem(item._id)
  }

  // Toggle bought status
  const handleToggleBought = async () => {
    await updateItem(item._id, { bought: !item.bought })
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
            disabled={isPending}
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
          disabled={isPending || item.bought || editMode}
          sx={{ minWidth: 80 }}
        >
          {item.bought ? (
            <FormattedMessage id="pages.landing.bought" defaultMessage="Bought" />
          ) : (
            <FormattedMessage id="pages.landing.buy" defaultMessage="Buy" />
          )}
        </Button>
        <span style={{ flex: 1 }} />
        {editMode ? (
          <>
            <Button
              size="small"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleSaveEdit}
              disabled={isPending || !editName.trim()}
              sx={{ ml: 1 }}
            >
              <FormattedMessage id="common.save" defaultMessage="Save" />
            </Button>
            <Button
              size="small"
              color="inherit"
              startIcon={<CancelIcon />}
              onClick={handleCancelEdit}
              disabled={isPending}
              sx={{ ml: 1 }}
            >
              <FormattedMessage id="common.cancel" defaultMessage="Cancel" />
            </Button>
          </>
        ) : (
          <>
            <Button
              size="small"
              color="info"
              startIcon={<EditIcon />}
              onClick={() => setEditMode(true)}
              disabled={isPending || item.bought}
              sx={{ ml: 1 }}
            >
              <FormattedMessage id="common.edit" defaultMessage="Edit" />
            </Button>
            <Button
              size="small"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
              disabled={isPending}
              sx={{ ml: 1 }}
            >
              <FormattedMessage id="common.delete" defaultMessage="Delete" />
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  )
}

export default ShoppingListItem
