import type { QueryResult, Corpus } from "./types"

const API_BASE = "https://shiny.ens-paris-saclay.fr/guni"

export class GallicagramClient {
  private async fetchCSV(url: string): Promise<QueryResult[]> {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`)
    }

    const text = await response.text()
    const lines = text.trim().split("\n")

    if (lines.length < 2) {
      return []
    }

    const headers = lines[0].split(",")
    const results: QueryResult[] = []

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",")
      const row: any = {}

      headers.forEach((header, index) => {
        const value = values[index]
        if (header === "gram") {
          row[header] = value
        } else {
          row[header] = value ? Number.parseInt(value, 10) : undefined
        }
      })

      results.push(row as QueryResult)
    }

    return results
  }

  async query(params: {
    mot: string
    corpus?: Corpus
    from?: number
    to?: number
  }): Promise<QueryResult[]> {
    const url = new URL(`${API_BASE}/query`)
    url.searchParams.set("mot", params.mot)
    if (params.corpus) url.searchParams.set("corpus", params.corpus)
    if (params.from) url.searchParams.set("from", params.from.toString())
    if (params.to) url.searchParams.set("to", params.to.toString())

    return this.fetchCSV(url.toString())
  }

  async contain(params: {
    mot1: string
    mot2: string
    corpus?: Corpus
    from?: number
    to?: number
    count?: boolean
  }): Promise<QueryResult[]> {
    const url = new URL(`${API_BASE}/contain`)
    url.searchParams.set("mot1", params.mot1)
    url.searchParams.set("mot2", params.mot2)
    if (params.corpus) url.searchParams.set("corpus", params.corpus)
    if (params.from) url.searchParams.set("from", params.from.toString())
    if (params.to) url.searchParams.set("to", params.to.toString())
    if (params.count !== undefined) url.searchParams.set("count", params.count.toString())

    return this.fetchCSV(url.toString())
  }

  async joker(params: {
    mot: string
    corpus?: Corpus
    from?: number
    to?: number
    n_joker?: number | "all"
    after?: boolean
    length?: number
  }): Promise<QueryResult[]> {
    const url = new URL(`${API_BASE}/joker`)
    url.searchParams.set("mot", params.mot)
    if (params.corpus) url.searchParams.set("corpus", params.corpus)
    if (params.from) url.searchParams.set("from", params.from.toString())
    if (params.to) url.searchParams.set("to", params.to.toString())
    if (params.n_joker) url.searchParams.set("n_joker", params.n_joker.toString())
    if (params.after !== undefined) url.searchParams.set("after", params.after.toString())
    if (params.length) url.searchParams.set("length", params.length.toString())

    return this.fetchCSV(url.toString())
  }

  async associated(params: {
    mot: string
    corpus?: Corpus
    from?: number
    to?: number
    n_joker?: number
    length?: number
    stopwords?: number
  }): Promise<QueryResult[]> {
    const url = new URL(`${API_BASE}/associated`)
    url.searchParams.set("mot", params.mot)
    if (params.corpus) url.searchParams.set("corpus", params.corpus)
    if (params.from) url.searchParams.set("from", params.from.toString())
    if (params.to) url.searchParams.set("to", params.to.toString())
    if (params.n_joker) url.searchParams.set("n_joker", params.n_joker.toString())
    if (params.length) url.searchParams.set("length", params.length.toString())
    if (params.stopwords !== undefined) url.searchParams.set("stopwords", params.stopwords.toString())

    return this.fetchCSV(url.toString())
  }

  async associatedArticle(params: {
    mot: string
    from?: number
    to?: number
    n_joker?: number
    stopwords?: number
  }): Promise<QueryResult[]> {
    const url = new URL(`${API_BASE}/associated_article`)
    url.searchParams.set("mot", params.mot)
    if (params.from) url.searchParams.set("from", params.from.toString())
    if (params.to) url.searchParams.set("to", params.to.toString())
    if (params.n_joker) url.searchParams.set("n_joker", params.n_joker.toString())
    if (params.stopwords !== undefined) url.searchParams.set("stopwords", params.stopwords.toString())

    return this.fetchCSV(url.toString())
  }

  async cooccur(params: {
    mot1: string
    mot2: string
    from?: number
    to?: number
    resolution?: "jour" | "mois" | "annee"
  }): Promise<QueryResult[]> {
    const url = new URL(`${API_BASE}/cooccur`)
    url.searchParams.set("mot1", params.mot1)
    url.searchParams.set("mot2", params.mot2)
    if (params.from) url.searchParams.set("from", params.from.toString())
    if (params.to) url.searchParams.set("to", params.to.toString())
    if (params.resolution) url.searchParams.set("resolution", params.resolution)

    return this.fetchCSV(url.toString())
  }

  async queryArticle(params: {
    mot: string
    from?: number
    to?: number
  }): Promise<QueryResult[]> {
    const url = new URL(`${API_BASE}/query_article`)
    url.searchParams.set("mot", params.mot)
    if (params.from) url.searchParams.set("from", params.from.toString())
    if (params.to) url.searchParams.set("to", params.to.toString())

    return this.fetchCSV(url.toString())
  }

  async queryPersee(params: {
    mot: string
    from?: number
    to?: number
    by_revue?: boolean
    revue?: string
  }): Promise<QueryResult[]> {
    const url = new URL(`${API_BASE}/query_persee`)
    url.searchParams.set("mot", params.mot)
    if (params.from) url.searchParams.set("from", params.from.toString())
    if (params.to) url.searchParams.set("to", params.to.toString())
    if (params.by_revue !== undefined) url.searchParams.set("by_revue", params.by_revue.toString())
    if (params.revue) url.searchParams.set("revue", params.revue)

    return this.fetchCSV(url.toString())
  }
}
