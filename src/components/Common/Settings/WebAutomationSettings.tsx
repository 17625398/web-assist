import React, { useCallback } from "react"
import { useTranslation } from "react-i18next"
import { Form, Switch, Input, Divider, Collapse } from "antd"
import { Storage } from "@plasmohq/storage"

const storage = new Storage()

export const WebAutomationSettings = () => {
  const { t } = useTranslation("common")
  const [form] = Form.useForm()

  // 加载设置
  React.useEffect(() => {
    const loadSettings = async () => {
      const enableOpenCLI = await storage.get("enableOpenCLI")
      const enablePageAgent = await storage.get("enablePageAgent")
      const enableWebAutomation = await storage.get("enableWebAutomation")
      const pageAgentModel = await storage.get("pageAgentModel")
      const pageAgentBaseURL = await storage.get("pageAgentBaseURL")
      const pageAgentApiKey = await storage.get("pageAgentApiKey")

      form.setFieldsValue({
        enableOpenCLI: !!enableOpenCLI,
        enablePageAgent: !!enablePageAgent,
        enableWebAutomation: !!enableWebAutomation,
        pageAgentModel,
        pageAgentBaseURL,
        pageAgentApiKey
      })
    }

    loadSettings()
  }, [form])

  // 保存设置
  const saveSettings = useCallback(async (values: any) => {
    await storage.set("enableOpenCLI", values.enableOpenCLI)
    await storage.set("enablePageAgent", values.enablePageAgent)
    await storage.set("enableWebAutomation", values.enableWebAutomation)
    await storage.set("pageAgentModel", values.pageAgentModel)
    await storage.set("pageAgentBaseURL", values.pageAgentBaseURL)
    await storage.set("pageAgentApiKey", values.pageAgentApiKey)
  }, [])

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={saveSettings}
    >
      <h3 className="text-lg font-medium mb-4">{t("common:webAutomation.title")}</h3>
      
      <Form.Item
        name="enableWebAutomation"
        label={t("common:webAutomation.enableWebAutomation.label")}
        help={t("common:webAutomation.enableWebAutomation.help")}
      >
        <Switch />
      </Form.Item>

      <Divider />

      <h4 className="text-md font-medium mb-3">{t("common:webAutomation.opencli.title")}</h4>
      <Form.Item
        name="enableOpenCLI"
        label={t("common:webAutomation.opencli.enable.label")}
        help={t("common:webAutomation.opencli.enable.help")}
      >
        <Switch />
      </Form.Item>
      <p className="text-sm text-gray-500 mb-4">
        {t("common:webAutomation.opencli.note")} <a href="https://github.com/jackwener/opencli/releases" target="_blank" rel="noopener noreferrer">{t("common:webAutomation.opencli.githubReleases")}</a>.
      </p>

      <Divider />

      <h4 className="text-md font-medium mb-3">{t("common:webAutomation.pageAgent.title")}</h4>
      <Form.Item
        name="enablePageAgent"
        label={t("common:webAutomation.pageAgent.enable.label")}
        help={t("common:webAutomation.pageAgent.enable.help")}
      >
        <Switch />
      </Form.Item>

      <Collapse
        ghost
        className="border-none bg-transparent"
        items={[
          {
            key: "1",
            label: t("common:webAutomation.pageAgent.configuration.title"),
            children: (
              <React.Fragment>
                <Form.Item
                  name="pageAgentModel"
                  label={t("common:webAutomation.pageAgent.configuration.model.label")}
                  help={t("common:webAutomation.pageAgent.configuration.model.help")}
                >
                  <Input placeholder={t("common:webAutomation.pageAgent.configuration.model.placeholder")} />
                </Form.Item>
                <Form.Item
                  name="pageAgentBaseURL"
                  label={t("common:webAutomation.pageAgent.configuration.baseURL.label")}
                  help={t("common:webAutomation.pageAgent.configuration.baseURL.help")}
                >
                  <Input placeholder={t("common:webAutomation.pageAgent.configuration.baseURL.placeholder")} />
                </Form.Item>
                <Form.Item
                  name="pageAgentApiKey"
                  label={t("common:webAutomation.pageAgent.configuration.apiKey.label")}
                  help={t("common:webAutomation.pageAgent.configuration.apiKey.help")}
                >
                  <Input.Password placeholder={t("common:webAutomation.pageAgent.configuration.apiKey.placeholder")} />
                </Form.Item>
              </React.Fragment>
            )
          }
        ]}
      />
    </Form>
  )
}
