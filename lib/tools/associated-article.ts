import { GallicagramClient } from "../gallicagram-client"

const client = new GallicagramClient()

export async function associatedArticleTool(params: {
  mot: string
  from?: number
  to?: number
  n_joker?: number
  stopwords?: number
}) {
  const data = await client.associatedArticle({
    mot: params.mot,
    from: params.from,
    to: params.to,
    n_joker: params.n_joker || 200,
    stopwords: params.stopwords || 0,
  })

  return {
    mot: params.mot,
    corpus: "lemonde",
    period: [params.from, params.to],
    stopwords: params.stopwords || 0,
    data,
  }
}

export const associatedArticleToolDefinition = {
  name: "associated_article",
  description:
    "Find words most associated with a given word at the article level in Le Monde archives. Explores semantic environment across entire articles rather than just n-grams. Only works with Le Monde corpus.",
  inputSchema: {
    type: "object",
    properties: {
      mot: {
        type: "string",
        description: "Single word to analyze (phrases not supported)",
      },
      from: {
        type: "number",
        description: "Start year (1944-2023)",
      },
      to: {
        type: "number",
        description: "End year (1944-2023)",
      },
      n_joker: {
        type: "number",
        description: "Number of results to return (default: 200)",
      },
      stopwords: {
        type: "number",
        description: "Number of most frequent words to ignore (0-1000, default: 0)",
      },
    },
    required: ["mot"],
  },
}
