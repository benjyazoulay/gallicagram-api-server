import type { Corpus, Language } from "../types"

export function detectLanguage(mot: string): Language {
  // Simple heuristic: check for common French characters
  if (/[àâäéèêëïîôùûüÿæœç]/i.test(mot)) {
    return "fr"
  }

  // Check for German characters
  if (/[äöüß]/i.test(mot)) {
    return "de"
  }

  // Default to French for now
  return "fr"
}

export function selectBestCorpus(context: {
  period?: [number?, number?]
  language?: Language
  type?: "presse" | "livres"
}): Corpus {
  const { period, language = "fr", type } = context

  // Language-based selection
  if (language === "en") return "american_stories"
  if (language === "de") return "ddb"

  // Default French corpus
  if (!period) return "presse"

  const [from, to] = period
  const mid = ((from || 1789) + (to || 2023)) / 2

  // Book corpus if requested
  if (type === "livres") return "livres"

  // Press corpus selection based on period
  if (mid < 1944) return "presse" // 1789-1950

  if (mid >= 1944 && mid <= 2023) {
    // Prefer Le Monde for post-1944 periods
    if (from && from >= 1944) return "lemonde"
    return "presse" // Keep presse for consistency across 1944 boundary
  }

  return "presse"
}

export function getCorpusInfo(corpus: Corpus) {
  const corpusData: Record<
    Corpus,
    {
      period: [number, number]
      resolution: "jour" | "mois" | "annee"
      maxGram: number
      language: Language
    }
  > = {
    lemonde: { period: [1944, 2023], resolution: "jour", maxGram: 4, language: "fr" },
    presse: { period: [1789, 1950], resolution: "mois", maxGram: 3, language: "fr" },
    livres: { period: [1600, 1940], resolution: "annee", maxGram: 5, language: "fr" },
    ddb: { period: [1780, 1950], resolution: "mois", maxGram: 2, language: "de" },
    american_stories: { period: [1798, 1963], resolution: "annee", maxGram: 3, language: "en" },
    paris: { period: [1777, 1827], resolution: "jour", maxGram: 2, language: "fr" },
    moniteur: { period: [1789, 1869], resolution: "jour", maxGram: 2, language: "fr" },
    journal_des_debats: { period: [1789, 1944], resolution: "jour", maxGram: 1, language: "fr" },
    la_presse: { period: [1836, 1869], resolution: "jour", maxGram: 2, language: "fr" },
    constitutionnel: { period: [1821, 1913], resolution: "jour", maxGram: 2, language: "fr" },
    figaro: { period: [1854, 1952], resolution: "jour", maxGram: 2, language: "fr" },
    temps: { period: [1861, 1942], resolution: "jour", maxGram: 2, language: "fr" },
    petit_journal: { period: [1863, 1942], resolution: "jour", maxGram: 2, language: "fr" },
    petit_parisien: { period: [1876, 1944], resolution: "jour", maxGram: 2, language: "fr" },
    huma: { period: [1904, 1952], resolution: "jour", maxGram: 2, language: "fr" },
    subtitles: { period: [1935, 2020], resolution: "annee", maxGram: 3, language: "fr" },
    subtitles_en: { period: [1930, 2020], resolution: "annee", maxGram: 3, language: "en" },
    rap: { period: [1989, 2024], resolution: "annee", maxGram: 5, language: "fr" },
  }

  return corpusData[corpus]
}
