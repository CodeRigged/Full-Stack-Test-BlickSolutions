import { useIntl } from "react-intl"
import Tabs, { TabType } from "~/components/navigation/Tabs"
import PageLayout from "~/layouts/PageLayout"
import AdvancedTab from "./AdvancedTab"
import GeneralTab from "./GeneralTab"

const SettingsPage = () => {
  const { formatMessage } = useIntl()

  const tabs: TabType[] = [
    { label: formatMessage({ id: "pages.settings.tabs.general.title" }), content: <GeneralTab /> },
    { label: formatMessage({ id: "pages.settings.tabs.advanced.title" }), content: <AdvancedTab /> },
  ]
  return (
    <PageLayout documentTitle={formatMessage({ id: "pages.settings.title" })}>
      <Tabs tabs={tabs} />
    </PageLayout>
  )
}
export default SettingsPage
