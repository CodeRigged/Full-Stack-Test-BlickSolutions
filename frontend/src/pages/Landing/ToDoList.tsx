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
import { Todo } from "shared/types"
import { useErrorStore } from "~/stores/state-handlers"
import { apiFetch } from "~/utils/api"

const ToDoList = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")
  const [editId, setEditId] = useState<string | null>(null)
  const [editText, setEditText] = useState("")
  const { setError } = useErrorStore()
  const [loading, setLoading] = useState(false)

  // Fetch todos
  const fetchTodos = () => {
    setLoading(true)
    apiFetch("/todos")
      .then(res => res.json())
      .then(data => setTodos(data.todos))
      .catch(e => setError(e))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchTodos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Add todo
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTodo.trim()) return
    setLoading(true)
    apiFetch("/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newTodo }),
    })
      .then(res => res.json())
      .then(() => {
        setNewTodo("")
        fetchTodos()
      })
      .catch(e => setError(e))
      .finally(() => setLoading(false))
  }

  // Delete todo
  const handleDelete = (id: string) => {
    setLoading(true)
    apiFetch(`/todos/${id}`, { method: "DELETE" })
      .then(res => res.json())
      .then(() => fetchTodos())
      .catch(e => setError(e))
      .finally(() => setLoading(false))
  }

  // Start editing a todo
  const handleEdit = (id: string, text: string) => {
    setEditId(id)
    setEditText(text)
  }

  // Cancel editing
  const handleCancelEdit = () => {
    setEditId(null)
    setEditText("")
  }

  // Save edited todo
  const handleSaveEdit = (id: string) => {
    if (!editText.trim()) return
    setLoading(true)
    apiFetch(`/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: editText }),
    })
      .then(res => res.json())
      .then(() => {
        setEditId(null)
        setEditText("")
        fetchTodos()
      })
      .catch(e => setError(e))
      .finally(() => setLoading(false))
  }

  return (
    <Box maxWidth={480} mx="auto" mt={4}>
      <Typography variant="h4" gutterBottom align="center">
        Todo List
      </Typography>
      <Box component="form" onSubmit={handleAdd} mb={3} display="flex" gap={2}>
        <TextField
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          disabled={loading}
          size="small"
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" disabled={loading || !newTodo.trim()}>
          Add
        </Button>
      </Box>
      {loading && (
        <Box display="flex" justifyContent="center" my={2}>
          <CircularProgress size={32} />
        </Box>
      )}
      <Stack spacing={2}>
        {todos.map(todo => (
          <Card key={todo._id} variant="outlined">
            <CardContent>
              {editId === todo._id ? (
                <TextField
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                  size="small"
                  fullWidth
                  autoFocus
                  onKeyDown={e => {
                    if (e.key === "Enter") handleSaveEdit(todo._id)
                    if (e.key === "Escape") handleCancelEdit()
                  }}
                  disabled={loading}
                />
              ) : (
                <Typography>{todo.text}</Typography>
              )}
            </CardContent>
            <CardActions>
              {editId === todo._id ? (
                <>
                  <Button
                    size="small"
                    color="primary"
                    startIcon={<SaveIcon />}
                    onClick={() => handleSaveEdit(todo._id)}
                    disabled={loading || !editText.trim()}
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
                    onClick={() => handleEdit(todo._id, todo.text)}
                    disabled={loading}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(todo._id)}
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
      {todos.length === 0 && !loading && (
        <Typography align="center" color="text.secondary" mt={2}>
          No todos yet.
        </Typography>
      )}
    </Box>
  )
}

export default ToDoList
