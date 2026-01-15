import { CssBaseline, ThemeProvider } from "@mui/material"
import { IntlProvider } from "react-intl"
import { RouterProvider } from "react-router-dom"
import { Locales } from "shared/types"
import { useLocaleLoader } from "./i18n"
import router from "./plugins/router"
import { useAppTheme } from "./theme"

function App() {
  const theme = useAppTheme()
  const { selectedLocale, messages } = useLocaleLoader()

  return (
    <IntlProvider messages={messages} locale={selectedLocale} defaultLocale={Locales.ENGLISH}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </IntlProvider>
  )
}

export default App
