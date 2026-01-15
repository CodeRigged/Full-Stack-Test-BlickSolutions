import defaultLocale from "../i18n/json/en-US.json"
import { DotPaths } from "./utils"

// enables types for ids using formatMessage({ id: "some.id.from.defaultLocale" })}
declare global {
  namespace FormatjsIntl {
    interface Message {
      ids: DotPaths<typeof defaultLocale>
    }
  }
}
