import { Grid2 as Grid } from "@mui/material"
import { ReactElement } from "react"

// filepath: c:/Users/ta.THDOM/Documents/git/projects/react-ts-template/src/components/pages/LogoutPage.tsx

/**
 * Renders a simple logout page with a grid layout.
 *
 * @return {ReactElement} The rendered logout page.
 */
const LogoutPage = (): ReactElement => {
  return (
    <Grid className="logout-page" container alignItems="center" justifyContent="center" spacing={2}>
      <Grid size="auto">
        <h1>You have been logged out</h1>
      </Grid>
    </Grid>
  )
}

export default LogoutPage
