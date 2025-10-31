import { GallicagramClient } from "../gallicagram-client"

const client = new GallicagramClient()

export async function queryArticleTool(params: {
  mot: string
  from?: number
  to?: number
}) {
  const data = await client.queryArticle({
    mot: params.mot,
    from: params.from,
    to: params.to,
  })

  return {
    mot: params.mot,
    corpus: "lemonde",
    period: [params.from, params.to],
    data,
  }
}

export const queryArticleToolDefinition = {
  name: "query_article",
  description:
    "Count articles containing a word in Le Monde archives (rather than counting word occurrences). Useful for robustness testing or comparing with other article-based corpora. Only works with Le Monde corpus.",
  inputSchema: {
    type: "object",
    properties: {
      mot: {
        type: "string",
        description: "Word to search for",
      },
      from: {
        type: "number",
        description: "Start year (1944-2023)",
      },
      to: {
        type: "number",
        description: "End year (1944-2023)",
      },
    },
    required: ["mot"],
  },
}
