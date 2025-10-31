import type { McpMessage, McpTool } from "./types"
import { queryCorpusTool, queryCorpusToolDefinition } from "./tools/query-corpus"
import { containTool, containToolDefinition } from "./tools/contain"
import { jokerTool, jokerToolDefinition } from "./tools/joker"
import { associatedTool, associatedToolDefinition } from "./tools/associated"
import { associatedArticleTool, associatedArticleToolDefinition } from "./tools/associated-article"
import { cooccurTool, cooccurToolDefinition } from "./tools/cooccur"
import { queryArticleTool, queryArticleToolDefinition } from "./tools/query-article"
import { queryPerseeTool, queryPerseeToolDefinition } from "./tools/query-persee"

export class McpServer {
  private tools: McpTool[] = [
    queryCorpusToolDefinition,
    containToolDefinition,
    jokerToolDefinition,
    associatedToolDefinition,
    associatedArticleToolDefinition,
    cooccurToolDefinition,
    queryArticleToolDefinition,
    queryPerseeToolDefinition,
  ]

  private handlers: Map<string, (params: any) => Promise<any>> = new Map([
    ["query_corpus", queryCorpusTool],
    ["contain", containTool],
    ["joker", jokerTool],
    ["associated", associatedTool],
    ["associated_article", associatedArticleTool],
    ["cooccur", cooccurTool],
    ["query_article", queryArticleTool],
    ["query_persee", queryPerseeTool],
  ])

  private onMessage?: (message: McpMessage) => void
  private connected = false

  async connect(options: {
    onMessage: (message: McpMessage) => void
    onError?: (error: Error) => void
    onClose?: () => void
  }) {
    this.onMessage = options.onMessage
    this.connected = true

    // Send initialization message
    this.sendMessage({
      jsonrpc: "2.0",
      method: "initialized",
      params: {
        protocolVersion: "2024-11-05",
        capabilities: {
          tools: {},
        },
        serverInfo: {
          name: "gallicagram-mcp",
          version: "1.0.0",
        },
      },
    })
  }

  disconnect() {
    this.connected = false
  }

  private sendMessage(message: McpMessage) {
    if (this.onMessage && this.connected) {
      this.onMessage(message)
    }
  }

  async handleRequest(request: McpMessage): Promise<McpMessage> {
    try {
      switch (request.method) {
        case "initialize":
          return {
            jsonrpc: "2.0",
            id: request.id,
            result: {
              protocolVersion: "2024-11-05",
              capabilities: {
                tools: {},
              },
              serverInfo: {
                name: "gallicagram-mcp",
                version: "1.0.0",
              },
            },
          }

        case "tools/list":
          return {
            jsonrpc: "2.0",
            id: request.id,
            result: {
              tools: this.tools,
            },
          }

        case "tools/call":
          const { name, arguments: args } = request.params
          const handler = this.handlers.get(name)

          if (!handler) {
            throw new Error(`Unknown tool: ${name}`)
          }

          const result = await handler(args)

          return {
            jsonrpc: "2.0",
            id: request.id,
            result: {
              content: [
                {
                  type: "text",
                  text: JSON.stringify(result, null, 2),
                },
              ],
            },
          }

        default:
          throw new Error(`Unknown method: ${request.method}`)
      }
    } catch (error) {
      return {
        jsonrpc: "2.0",
        id: request.id,
        error: {
          code: -32603,
          message: error instanceof Error ? error.message : "Internal error",
          data: error instanceof Error ? error.stack : undefined,
        },
      }
    }
  }
}
