import { GallicagramClient } from "../gallicagram-client"
import { selectBestCorpus } from "../utils/corpus-selector"
import type { Corpus } from "../types"

const client = new GallicagramClient()

export async function associatedTool(params: {
  mot: string
  corpus?: Corpus
  from?: number
  to?: number
  n_joker?: number
  length?: number
  stopwords?: number
}) {
  const corpus =
    params.corpus ||
    selectBestCorpus({
      period: [params.from, params.to],
    })

  const data = await client.associated({
    mot: params.mot,
    corpus,
    from: params.from,
    to: params.to,
    n_joker: params.n_joker || 200,
    length: params.length || 3,
    stopwords: params.stopwords || 0,
  })

  return {
    mot: params.mot,
    corpus,
    period: [params.from, params.to],
    length: params.length || 3,
    stopwords: params.stopwords || 0,
    data,
  }
}

export const associatedToolDefinition = {
  name: "associated",
  description:
    'Find words most frequently associated with a given word in its semantic neighborhood. Generalizes the joker mode to explore semantic environment (e.g., "climatique" → "réchauffement", "crise", "changement").',
  inputSchema: {
    type: "object",
    properties: {
      mot: {
        type: "string",
        description: "Word or phrase to analyze",
      },
      corpus: {
        type: "string",
        enum: ["lemonde", "presse", "livres"],
        description: "Corpus to search in",
      },
      from: {
        type: "number",
        description: "Start year",
      },
      to: {
        type: "number",
        description: "End year",
      },
      n_joker: {
        type: "number",
        description: "Number of results to return (default: 200)",
      },
      length: {
        type: "number",
        description: "Neighborhood size (max 3 for Gallica, 4 for Le Monde, default: 3)",
      },
      stopwords: {
        type: "number",
        description: "Number of most frequent words to ignore (0-1000, default: 0)",
      },
    },
    required: ["mot"],
  },
}
