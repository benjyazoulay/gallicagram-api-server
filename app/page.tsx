import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20 p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Code className="h-4 w-4" />
            MCP Server
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Gallicagram MCP Server</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Model Context Protocol server for querying French historical text corpora through the Gallicagram API
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
            <CardDescription>Add this server to your Claude Desktop configuration</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`{
  "mcpServers": {
    "gallicagram": {
      "url": "${typeof window !== "undefined" ? window.location.origin : "https://gallicagram-api-server.vercel.app"}/api/sse"
    }
  }
}`}</code>
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Available Tools</CardTitle>
            <CardDescription>8 tools for exploring French historical corpora</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">query_corpus</h3>
              <p className="text-sm text-muted-foreground">
                Search for word occurrences with automatic corpus and resolution selection
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">contain</h3>
              <p className="text-sm text-muted-foreground">Find n-grams containing both specified words</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">joker</h3>
              <p className="text-sm text-muted-foreground">
                Discover what words commonly follow or precede a given word
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">associated</h3>
              <p className="text-sm text-muted-foreground">Explore semantic environment and word associations</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">associated_article</h3>
              <p className="text-sm text-muted-foreground">Article-level associations (Le Monde only)</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">cooccur</h3>
              <p className="text-sm text-muted-foreground">Count articles containing both words (Le Monde only)</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">query_article</h3>
              <p className="text-sm text-muted-foreground">Count articles containing a word (Le Monde only)</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">query_persee</h3>
              <p className="text-sm text-muted-foreground">Search in Persée academic journal corpus</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Supported Corpora</CardTitle>
            <CardDescription>Multiple historical text collections</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>
                <strong>Le Monde</strong> (1944-2023) - Daily resolution, 1.5B words
              </li>
              <li>
                <strong>Presse Gallica</strong> (1789-1950) - Monthly resolution, 57B words
              </li>
              <li>
                <strong>Livres Gallica</strong> (1600-1940) - Annual resolution, 16B words
              </li>
              <li>
                <strong>DDB</strong> (1780-1950) - German press, 39B words
              </li>
              <li>
                <strong>American Stories</strong> (1798-1963) - 20B words
              </li>
              <li>
                <strong>Persée</strong> (1789-2023) - Academic journals, 1B words
              </li>
              <li>+ 11 individual French newspapers with daily resolution</li>
            </ul>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          <p>
            Powered by{" "}
            <a
              href="https://shiny.ens-paris-saclay.fr/app/gallicagram"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Gallicagram
            </a>{" "}
            • Built with Next.js and Vercel Edge Functions
          </p>
        </div>
      </div>
    </main>
  )
}
