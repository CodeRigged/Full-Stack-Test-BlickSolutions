import { useIntl } from "react-intl"
import ShoppingList from "~/components/pages/ShoppingPage/ShoppingList"
import PageLayout from "~/layouts/PageLayout"

const LandingPage = () => {
  const { formatMessage } = useIntl()

  return (
    <PageLayout documentTitle={formatMessage({ id: "pages.landing.title" })}>
      <ShoppingList />
    </PageLayout>
  )
}
export default LandingPage
