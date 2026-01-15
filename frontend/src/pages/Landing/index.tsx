import { useIntl } from "react-intl"
import PageLayout from "~/layouts/PageLayout"
import ToDoList from "./ToDoList"

const LandingPage = () => {
  const { formatMessage } = useIntl()

  return (
    <PageLayout documentTitle={formatMessage({ id: "pages.landing.title" })}>
      <ToDoList />
    </PageLayout>
  )
}
export default LandingPage
