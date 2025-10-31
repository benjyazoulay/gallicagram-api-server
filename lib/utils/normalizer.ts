import type { QueryResult, NormalizedResult } from "../types"

export function normalizeFrequencies(rawData: QueryResult[]): NormalizedResult[] {
  return rawData.map((row) => {
    const total = row.total || 1

    return {
      ...row,
      frequency: row.n / total,
      relativeFrequency: (row.n / total) * 1_000_000, // Per million
    }
  })
}

export function calculateReliabilityScore(corpus: string, from?: number, to?: number): "high" | "medium" | "low" {
  // Simple heuristic based on corpus and period
  if (corpus === "lemonde") return "high"

  if (corpus === "presse" || corpus === "livres") {
    // OCR quality degrades for older periods
    const avgYear = ((from || 1789) + (to || 1950)) / 2
    if (avgYear < 1850) return "low"
    if (avgYear < 1900) return "medium"
    return "high"
  }

  return "medium"
}
