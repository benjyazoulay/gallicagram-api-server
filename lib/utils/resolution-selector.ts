import type { Corpus, Resolution } from "../types"
import { getCorpusInfo } from "./corpus-selector"

export function selectBestResolution(context: {
  corpus: Corpus
  period?: [number?, number?]
}): Resolution {
  const { corpus, period } = context

  const info = getCorpusInfo(corpus)
  const available = info.resolution

  // If period < 1 year and daily resolution available → jour
  if (period && available === "jour") {
    const [from, to] = period
    if (to && from && to - from < 1) {
      return "jour"
    }
  }

  return available
}
