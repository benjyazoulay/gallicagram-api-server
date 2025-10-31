import { McpServer } from "@/lib/mcp-server"

export const runtime = "edge"

export async function GET(request: Request) {
  const mcpServer = new McpServer()

  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      try {
        await mcpServer.connect({
          onMessage: (message) => {
            const data = `data: ${JSON.stringify(message)}\n\n`
            controller.enqueue(encoder.encode(data))
          },
          onError: (error) => {
            console.error("[v0] MCP Server error:", error)
            controller.error(error)
          },
          onClose: () => {
            controller.close()
          },
        })
      } catch (error) {
        console.error("[v0] Failed to start MCP server:", error)
        controller.error(error)
      }
    },
    cancel() {
      mcpServer.disconnect()
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  })
}
