import { GallicagramClient } from "../gallicagram-client"
import { selectBestCorpus } from "../utils/corpus-selector"
import type { Corpus } from "../types"

const client = new GallicagramClient()

export async function jokerTool(params: {
  mot: string
  corpus?: Corpus
  from?: number
  to?: number
  n_joker?: number
  after?: boolean
  length?: number
}) {
  const corpus =
    params.corpus ||
    selectBestCorpus({
      period: [params.from, params.to],
    })

  const data = await client.joker({
    mot: params.mot,
    corpus,
    from: params.from,
    to: params.to,
    n_joker: params.n_joker || 200,
    after: params.after !== false,
    length: params.length || 2,
  })

  return {
    mot: params.mot,
    corpus,
    period: [params.from, params.to],
    after: params.after !== false,
    length: params.length || 2,
    data,
  }
}

export const jokerToolDefinition = {
  name: "joker",
  description:
    'Find what words most commonly follow or accompany a given word (e.g., "camarade *" → "Staline", "Khrouchtchev"). Inspired by Google Ngram Viewer\'s wildcard feature.',
  inputSchema: {
    type: "object",
    properties: {
      mot: {
        type: "string",
        description: "Word to search for",
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
        description: 'Number of results to return (default: 200, use "all" for all results)',
      },
      after: {
        type: "boolean",
        description: "If true, find what follows the word. If false, find what precedes it (default: true)",
      },
      length: {
        type: "number",
        description: "Length of n-grams to search (2-4 depending on corpus, default: 2)",
      },
    },
    required: ["mot"],
  },
}
