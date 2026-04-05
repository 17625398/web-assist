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

export const createOpenCLITools = () => {
  const tools = []

  // OpenCLI 浏览器自动化工具 - 打开页面
  tools.push(new DynamicStructuredTool({
    name: "opencli_open",
    description: i18n.t("common.mcp.tools.opencli.open.description", { defaultValue: "Open a webpage in the browser" }),
    schema: z.object({
      url: z.string().describe(i18n.t("common.mcp.tools.opencli.open.params.url", { defaultValue: "The URL of the webpage to open" }))
    }),
    func: async ({ url }) => {
      try {
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

  // OpenCLI 浏览器自动化工具 - 点击元素
  tools.push(new DynamicStructuredTool({
    name: "opencli_click",
    description: i18n.t("common.mcp.tools.opencli.click.description", { defaultValue: "Click an element on the webpage" }),
    schema: z.object({
      selector: z.string().describe(i18n.t("common.mcp.tools.opencli.click.params.selector", { defaultValue: "CSS selector of the element to click" }))
    }),
    func: async ({ selector }) => {
      try {
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

  // OpenCLI 浏览器自动化工具 - 输入文本
  tools.push(new DynamicStructuredTool({
    name: "opencli_type",
    description: i18n.t("common.mcp.tools.opencli.type.description", { defaultValue: "Type text into an input element" }),
    schema: z.object({
      selector: z.string().describe(i18n.t("common.mcp.tools.opencli.type.params.selector", { defaultValue: "CSS selector of the input element" })),
      text: z.string().describe(i18n.t("common.mcp.tools.opencli.type.params.text", { defaultValue: "Text to type into the input" }))
    }),
    func: async ({ selector, text }) => {
      try {
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

  // OpenCLI 浏览器自动化工具 - 提取内容
  tools.push(new DynamicStructuredTool({
    name: "opencli_get",
    description: i18n.t("common.mcp.tools.opencli.get.description", { defaultValue: "Extract content from an element" }),
    schema: z.object({
      selector: z.string().describe(i18n.t("common.mcp.tools.opencli.get.params.selector", { defaultValue: "CSS selector of the element to extract content from" }))
    }),
    func: async ({ selector }) => {
      try {
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

  // OpenCLI 浏览器自动化工具 - 截图
  tools.push(new DynamicStructuredTool({
    name: "opencli_screenshot",
    description: i18n.t("common.mcp.tools.opencli.screenshot.description", { defaultValue: "Take a screenshot of the current page" }),
    schema: z.object({
      path: z.string().optional().describe(i18n.t("common.mcp.tools.opencli.screenshot.params.path", { defaultValue: "Path to save the screenshot (optional)" }))
    }),
    func: async ({ path }) => {
      try {
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

  return tools
}

export const isOpenCLIEnabled = async (): Promise<boolean> => {
  const enabled = await storage.get("enableOpenCLI")
  return !!enabled
}
