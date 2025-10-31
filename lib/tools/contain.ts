import { GallicagramClient } from "../gallicagram-client"
import { selectBestCorpus } from "../utils/corpus-selector"
import { normalizeFrequencies } from "../utils/normalizer"
import type { Corpus } from "../types"

const client = new GallicagramClient()

export async function containTool(params: {
  mot1: string
  mot2: string
  corpus?: Corpus
  from?: number
  to?: number
  count?: boolean
}) {
  const corpus =
    params.corpus ||
    selectBestCorpus({
      period: [params.from, params.to],
    })

  const rawData = await client.contain({
    mot1: params.mot1,
    mot2: params.mot2,
    corpus,
    from: params.from,
    to: params.to,
    count: params.count,
  })

  const normalized = params.count !== false ? normalizeFrequencies(rawData) : rawData

  return {
    mot1: params.mot1,
    mot2: params.mot2,
    corpus,
    period: [params.from, params.to],
    data: normalized,
  }
}

export const containToolDefinition = {
  name: "contain",
  description:
    'Find n-grams containing both specified words. Useful for studying stereotypes and word associations (e.g., which phrases contain both "femme" and "travail").',
  inputSchema: {
    type: "object",
    properties: {
      mot1: {
        type: "string",
        description: "First word to search for",
      },
      mot2: {
        type: "string",
        description: "Second word to search for",
      },
      corpus: {
        type: "string",
        enum: ["lemonde", "presse", "livres"],
        description: "Corpus to search in (default: presse)",
      },
      from: {
        type: "number",
        description: "Start year",
      },
      to: {
        type: "number",
        description: "End year",
      },
      count: {
        type: "boolean",
        description: "If false, returns actual n-grams instead of counts (default: true)",
      },
    },
    required: ["mot1", "mot2"],
  },
}
