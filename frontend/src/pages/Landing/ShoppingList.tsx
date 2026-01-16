import { Box, CircularProgress, Typography } from "@mui/material"
import { useEffect } from "react"
import { FormattedMessage } from "react-intl"
import { useShoppingStore } from "~/stores/shopping-store"
import ShoppingListForm from "./ShoppingListForm"
import ShoppingListItems from "./ShoppingListItems"

const ShoppingList = () => {
  const { items, isPending, fetchItems } = useShoppingStore()

  useEffect(() => {
    fetchItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box maxWidth={480} mx="auto" mt={4}>
      <Typography variant="h4" gutterBottom align="center">
        <FormattedMessage id="pages.landing.shoppingListTitle" defaultMessage="Shopping List" />
      </Typography>
      <ShoppingListForm />
      {isPending && (
        <Box display="flex" justifyContent="center" my={2}>
          <CircularProgress size={32} />
        </Box>
      )}
      <ShoppingListItems />
      {items.length === 0 && !isPending && (
        <Typography align="center" color="text.secondary" mt={2}>
          <FormattedMessage id="pages.landing.noShoppingItems" defaultMessage="No shopping items yet." />
        </Typography>
      )}
    </Box>
  )
}

export default ShoppingList
