export type Corpus =
  | "lemonde"
  | "presse"
  | "livres"
  | "ddb"
  | "american_stories"
  | "paris"
  | "moniteur"
  | "journal_des_debats"
  | "la_presse"
  | "constitutionnel"
  | "figaro"
  | "temps"
  | "petit_journal"
  | "petit_parisien"
  | "huma"
  | "subtitles"
  | "subtitles_en"
  | "rap"

export type Resolution = "jour" | "mois" | "annee"

export type Language = "fr" | "en" | "de"

export interface QueryParams {
  mot: string
  corpus?: Corpus
  from?: number
  to?: number
  resolution?: Resolution
}

export interface QueryResult {
  n: number
  gram: string
  annee: number
  mois?: number
  jour?: number
  total?: number
}

export interface NormalizedResult extends QueryResult {
  frequency: number
  relativeFrequency: number
}

export interface CorpusInfo {
  code: Corpus
  period: [number, number]
  resolution: Resolution
  maxGram: number
  language: Language
  volume: string
}

export interface McpMessage {
  jsonrpc: "2.0"
  id?: string | number
  method?: string
  params?: any
  result?: any
  error?: {
    code: number
    message: string
    data?: any
  }
}

export interface McpTool {
  name: string
  description: string
  inputSchema: {
    type: "object"
    properties: Record<string, any>
    required?: string[]
  }
}
