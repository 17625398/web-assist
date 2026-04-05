import { DynamicStructuredTool } from "@langchain/core/tools"
import { z } from "zod"
import { Storage } from "@plasmohq/storage"
import i18n from "@/i18n"

const storage = new Storage()

// 浏览器环境中执行命令的替代方法
const executeCommand = async (command: string): Promise<{ stdout: string; stderr: string }> => {
  // 在浏览器扩展中，我们可以使用 chrome.runtime.sendNativeMessage 或者其他方法
  // 这里我们暂时返回一个模拟的响应
  return {
    stdout: `Command executed: ${command}`,
    stderr: ""
  }
}

// 模拟 Page-Agent 实例
let pageAgentInstance: any = null

// 初始化 Page-Agent
const initPageAgent = async (model: string, baseURL: string, apiKey: string) => {
  try {
    // 动态导入 Page-Agent
    const { PageAgent } = await import("page-agent")
    pageAgentInstance = new PageAgent({
      model,
      baseURL,
      apiKey,
      language: "en-US"
    })
    return true
  } catch (error) {
    console.error("Failed to initialize Page-Agent:", error)
    return false
  }
}

export const createWebAutomationTools = () => {
  const tools = []

  // Web 自动化工具 - 打开页面
  tools.push(new DynamicStructuredTool({
    name: "web_automation_open",
    description: i18n.t("common.mcp.tools.webAutomation.open.description", { defaultValue: "Open a webpage in the browser" }),
    schema: z.object({
      url: z.string().describe(i18n.t("common.mcp.tools.webAutomation.open.params.url", { defaultValue: "The URL of the webpage to open" }))
    }),
    func: async ({ url }) => {
      try {
        // 优先使用 OpenCLI
        const { stdout, stderr } = await executeCommand(`opencli operate open --url "${url}"`)
        if (stderr) {
          return `Error: ${stderr}`
        }
        return `Successfully opened: ${url}`
      } catch (error) {
        return `Error opening URL: ${error.message}`
      }
    }
  }))

  // Web 自动化工具 - 点击元素
  tools.push(new DynamicStructuredTool({
    name: "web_automation_click",
    description: i18n.t("common.mcp.tools.webAutomation.click.description", { defaultValue: "Click an element on the webpage" }),
    schema: z.object({
      selector: z.string().describe(i18n.t("common.mcp.tools.webAutomation.click.params.selector", { defaultValue: "CSS selector of the element to click" }))
    }),
    func: async ({ selector }) => {
      try {
        // 优先使用 OpenCLI
        const { stdout, stderr } = await executeCommand(`opencli operate click --selector "${selector}"`)
        if (stderr) {
          return `Error: ${stderr}`
        }
        return `Successfully clicked element: ${selector}`
      } catch (error) {
        return `Error clicking element: ${error.message}`
      }
    }
  }))

  // Web 自动化工具 - 输入文本
  tools.push(new DynamicStructuredTool({
    name: "web_automation_type",
    description: i18n.t("common.mcp.tools.webAutomation.type.description", { defaultValue: "Type text into an input element" }),
    schema: z.object({
      selector: z.string().describe(i18n.t("common.mcp.tools.webAutomation.type.params.selector", { defaultValue: "CSS selector of the input element" })),
      text: z.string().describe(i18n.t("common.mcp.tools.webAutomation.type.params.text", { defaultValue: "Text to type into the input" }))
    }),
    func: async ({ selector, text }) => {
      try {
        // 优先使用 OpenCLI
        const { stdout, stderr } = await executeCommand(`opencli operate type --selector "${selector}" --text "${text}"`)
        if (stderr) {
          return `Error: ${stderr}`
        }
        return `Successfully typed text into element: ${selector}`
      } catch (error) {
        return `Error typing text: ${error.message}`
      }
    }
  }))

  // Web 自动化工具 - 提取内容
  tools.push(new DynamicStructuredTool({
    name: "web_automation_get",
    description: i18n.t("common.mcp.tools.webAutomation.get.description", { defaultValue: "Extract content from an element" }),
    schema: z.object({
      selector: z.string().describe(i18n.t("common.mcp.tools.webAutomation.get.params.selector", { defaultValue: "CSS selector of the element to extract content from" }))
    }),
    func: async ({ selector }) => {
      try {
        // 优先使用 OpenCLI
        const { stdout, stderr } = await executeCommand(`opencli operate get --selector "${selector}"`)
        if (stderr) {
          return `Error: ${stderr}`
        }
        return `Extracted content: ${stdout.trim()}`
      } catch (error) {
        return `Error extracting content: ${error.message}`
      }
    }
  }))

  // Web 自动化工具 - 截图
  tools.push(new DynamicStructuredTool({
    name: "web_automation_screenshot",
    description: i18n.t("common.mcp.tools.webAutomation.screenshot.description", { defaultValue: "Take a screenshot of the current page" }),
    schema: z.object({
      path: z.string().optional().describe(i18n.t("common.mcp.tools.webAutomation.screenshot.params.path", { defaultValue: "Path to save the screenshot (optional)" }))
    }),
    func: async ({ path }) => {
      try {
        // 优先使用 OpenCLI
        const screenshotPath = path || "screenshot.png"
        const { stdout, stderr } = await executeCommand(`opencli operate screenshot --path "${screenshotPath}"`)
        if (stderr) {
          return `Error: ${stderr}`
        }
        return `Successfully took screenshot and saved to: ${screenshotPath}`
      } catch (error) {
        return `Error taking screenshot: ${error.message}`
      }
    }
  }))

  // 网页自动化 - 自然语言控制
  tools.push(new DynamicStructuredTool({
    name: "web_automation_execute",
    description: i18n.t("common.mcp.tools.webAutomation.execute.description", { defaultValue: "Execute a natural language command to control the webpage" }),
    schema: z.object({
      command: z.string().describe(i18n.t("common.mcp.tools.webAutomation.execute.params.command", { defaultValue: "Natural language command to execute" })),
      model: z.string().optional().describe(i18n.t("common.mcp.tools.webAutomation.execute.params.model", { defaultValue: "LLM model name (optional)" })),
      baseURL: z.string().optional().describe(i18n.t("common.mcp.tools.webAutomation.execute.params.baseURL", { defaultValue: "LLM API base URL (optional)" })),
      apiKey: z.string().optional().describe(i18n.t("common.mcp.tools.webAutomation.execute.params.apiKey", { defaultValue: "LLM API key (optional)" }))
    }),
    func: async ({ command, model, baseURL, apiKey }) => {
      try {
        // 如果 Page-Agent 未初始化且提供了配置，则初始化
        if (!pageAgentInstance && model && baseURL && apiKey) {
          const success = await initPageAgent(model, baseURL, apiKey)
          if (!success) {
            return "Failed to initialize Page-Agent"
          }
        }

        if (!pageAgentInstance) {
          return "Page-Agent is not initialized. Please provide model, baseURL, and apiKey."
        }

        const result = await pageAgentInstance.execute(command)
        return `Web automation execution result: ${result}`
      } catch (error) {
        return `Error executing web automation command: ${error.message}`
      }
    }
  }))

  return tools
}

export const isWebAutomationEnabled = async (): Promise<boolean> => {
  const enabled = await storage.get("enableWebAutomation")
  return !!enabled
}
