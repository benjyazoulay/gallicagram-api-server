import { GallicagramClient } from "../gallicagram-client"

const client = new GallicagramClient()

export async function queryPerseeTool(params: {
  mot: string
  from?: number
  to?: number
  by_revue?: boolean
  revue?: string
}) {
  const data = await client.queryPersee({
    mot: params.mot,
    from: params.from,
    to: params.to,
    by_revue: params.by_revue,
    revue: params.revue,
  })

  return {
    mot: params.mot,
    corpus: "persee",
    period: [params.from, params.to],
    by_revue: params.by_revue,
    revue: params.revue,
    data,
  }
}

export const queryPerseeToolDefinition = {
  name: "query_persee",
  description:
    "Search in Persée academic journal corpus (1789-2023). Can search across all journals or filter by specific journals. Useful for tracking academic concepts and their diffusion across disciplines.",
  inputSchema: {
    type: "object",
    properties: {
      mot: {
        type: "string",
        description: "Word or phrase to search (max 2 words)",
      },
      from: {
        type: "number",
        description: "Start year (1789-2023)",
      },
      to: {
        type: "number",
        description: "End year (1789-2023)",
      },
      by_revue: {
        type: "boolean",
        description: "If true, break down results by journal (default: false)",
      },
      revue: {
        type: "string",
        description:
          'Journal codes separated by + (e.g., "arss+ahess+rfs" for ARSS, Annales, and RFS). See Gallicagram documentation for available codes.',
      },
    },
    required: ["mot"],
  },
}
