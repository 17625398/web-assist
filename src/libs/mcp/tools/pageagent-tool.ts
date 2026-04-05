import { DynamicStructuredTool } from "@langchain/core/tools"
import { z } from "zod"
import { Storage } from "@plasmohq/storage"
import i18n from "@/i18n"

const storage = new Storage()

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

export const createPageAgentTools = () => {
  const tools = []

  // Page-Agent 初始化工具
  tools.push(new DynamicStructuredTool({
    name: "pageagent_init",
    description: i18n.t("common.mcp.tools.pageagent.init.description", { defaultValue: "Initialize Page-Agent with LLM configuration" }),
    schema: z.object({
      model: z.string().describe(i18n.t("common.mcp.tools.pageagent.init.params.model", { defaultValue: "LLM model name" })),
      baseURL: z.string().describe(i18n.t("common.mcp.tools.pageagent.init.params.baseURL", { defaultValue: "LLM API base URL" })),
      apiKey: z.string().describe(i18n.t("common.mcp.tools.pageagent.init.params.apiKey", { defaultValue: "LLM API key" }))
    }),
    func: async ({ model, baseURL, apiKey }) => {
      try {
        const success = await initPageAgent(model, baseURL, apiKey)
        if (success) {
          return "Page-Agent initialized successfully"
        } else {
          return "Failed to initialize Page-Agent"
        }
      } catch (error) {
        return `Error initializing Page-Agent: ${error.message}`
      }
    }
  }))

  // Page-Agent 执行工具
  tools.push(new DynamicStructuredTool({
    name: "pageagent_execute",
    description: i18n.t("common.mcp.tools.pageagent.execute.description", { defaultValue: "Execute a natural language command to control the webpage" }),
    schema: z.object({
      command: z.string().describe(i18n.t("common.mcp.tools.pageagent.execute.params.command", { defaultValue: "Natural language command to execute" }))
    }),
    func: async ({ command }) => {
      try {
        if (!pageAgentInstance) {
          return "Page-Agent is not initialized. Please call pageagent_init first."
        }
        const result = await pageAgentInstance.execute(command)
        return `Page-Agent execution result: ${result}`
      } catch (error) {
        return `Error executing Page-Agent command: ${error.message}`
      }
    }
  }))

  return tools
}

export const isPageAgentEnabled = async (): Promise<boolean> => {
  const enabled = await storage.get("enablePageAgent")
  return !!enabled
}
