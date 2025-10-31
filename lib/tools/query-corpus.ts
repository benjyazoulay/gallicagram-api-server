import { GallicagramClient } from "../gallicagram-client"
import { selectBestCorpus, detectLanguage } from "../utils/corpus-selector"
import { selectBestResolution } from "../utils/resolution-selector"
import { normalizeFrequencies, calculateReliabilityScore } from "../utils/normalizer"
import type { QueryParams } from "../types"

const client = new GallicagramClient()

export async function queryCorpusTool(params: QueryParams) {
  // 1. Smart corpus selection
  const corpus =
    params.corpus ||
    selectBestCorpus({
      period: [params.from, params.to],
      language: detectLanguage(params.mot),
    })

  // 2. Resolution selection
  const resolution =
    params.resolution ||
    selectBestResolution({
      corpus,
      period: [params.from, params.to],
    })

  // 3. API call
  const rawData = await client.query({
    mot: params.mot,
    corpus,
    from: params.from,
    to: params.to,
  })

  // 4. Normalization (frequencies are calculated from the 'total' column returned by API)
  const normalized = normalizeFrequencies(rawData)

  // 5. Return enriched data
  return {
    mot: params.mot,
    corpus,
    resolution,
    period: [params.from, params.to],
    data: normalized,
    metadata: {
      totalResults: normalized.length,
      reliability: calculateReliabilityScore(corpus, params.from, params.to),
    },
  }
}

export const queryCorpusToolDefinition = {
  name: "query_corpus",
  description:
    "Search for word or phrase occurrences in French historical corpora (Gallica press 1789-1950, Le Monde 1944-2023, Gallica books 1600-1940). Returns normalized frequencies over time. Automatically selects the best corpus based on period and language.",
  inputSchema: {
    type: "object",
    properties: {
      mot: {
        type: "string",
        description: 'Word or phrase to search for (e.g., "révolution", "droits de l\'homme")',
      },
      corpus: {
        type: "string",
        enum: [
          "lemonde",
          "presse",
          "livres",
          "ddb",
          "american_stories",
          "paris",
          "moniteur",
          "journal_des_debats",
          "la_presse",
          "constitutionnel",
          "figaro",
          "temps",
          "petit_journal",
          "petit_parisien",
          "huma",
          "subtitles",
          "subtitles_en",
          "rap",
        ],
        description: "Corpus to search in. If not specified, automatically selected based on period and language.",
      },
      from: {
        type: "number",
        description: "Start year (e.g., 1789)",
      },
      to: {
        type: "number",
        description: "End year (e.g., 1950)",
      },
      resolution: {
        type: "string",
        enum: ["jour", "mois", "annee"],
        description: "Time resolution. If not specified, automatically selected based on corpus.",
      },
    },
    required: ["mot"],
  },
}
