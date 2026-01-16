import { useIntl } from "react-intl"
import PageLayout from "~/layouts/PageLayout"
import ShoppingList from "./ShoppingList"

const LandingPage = () => {
  const { formatMessage } = useIntl()

  return (
    <PageLayout documentTitle={formatMessage({ id: "pages.landing.title" })}>
      <ShoppingList />
    </PageLayout>
  )
}
export default LandingPage
