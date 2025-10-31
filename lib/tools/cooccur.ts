import { GallicagramClient } from "../gallicagram-client"
import type { Resolution } from "../types"

const client = new GallicagramClient()

export async function cooccurTool(params: {
  mot1: string
  mot2: string
  from?: number
  to?: number
  resolution?: Resolution
}) {
  const data = await client.cooccur({
    mot1: params.mot1,
    mot2: params.mot2,
    from: params.from,
    to: params.to,
    resolution: params.resolution || "mois",
  })

  return {
    mot1: params.mot1,
    mot2: params.mot2,
    corpus: "lemonde",
    period: [params.from, params.to],
    resolution: params.resolution || "mois",
    data,
  }
}

export const cooccurToolDefinition = {
  name: "cooccur",
  description:
    "Count articles containing both specified words in Le Monde archives. Useful for tracking how two concepts appear together over time. Only works with Le Monde corpus.",
  inputSchema: {
    type: "object",
    properties: {
      mot1: {
        type: "string",
        description: 'First word (can use + to combine variants, e.g., "crise+crises")',
      },
      mot2: {
        type: "string",
        description: "Second word (can use + to combine variants)",
      },
      from: {
        type: "number",
        description: "Start year (1944-2023)",
      },
      to: {
        type: "number",
        description: "End year (1944-2023)",
      },
      resolution: {
        type: "string",
        enum: ["jour", "mois", "annee"],
        description: "Time resolution (default: mois)",
      },
    },
    required: ["mot1", "mot2"],
  },
}
