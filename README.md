# Gallicagram MCP Server

A Model Context Protocol (MCP) server for querying French historical text corpora through the [Gallicagram API](https://shiny.ens-paris-saclay.fr/app/gallicagram).

## Features

- 🚀 **Edge Functions** - Fast, globally distributed responses
- 📚 **8 Tools** - Complete access to Gallicagram's API routes
- 🤖 **Smart Selection** - Automatic corpus and resolution selection
- 📊 **Normalized Data** - Frequencies calculated on-the-fly
- 🌍 **Multi-language** - French, English, and German corpora

## Available Tools

### query_corpus
Search for word or phrase occurrences with automatic corpus selection based on period and language.

### contain
Find n-grams containing both specified words. Useful for studying stereotypes and associations.

### joker
Discover what words most commonly follow or precede a given word (wildcard search).

### associated
Explore semantic environment and find words most frequently associated with a term.

### associated_article
Article-level word associations (Le Monde only).

### cooccur
Count articles containing both specified words over time (Le Monde only).

### query_article
Count articles containing a word rather than word occurrences (Le Monde only).

### query_persee
Search in Persée academic journal corpus with optional journal filtering.

## Supported Corpora

- **Le Monde** (1944-2023) - 1.5B words, daily resolution
- **Presse Gallica** (1789-1950) - 57B words, monthly resolution
- **Livres Gallica** (1600-1940) - 16B words, annual resolution
- **DDB** (1780-1950) - German press, 39B words
- **American Stories** (1798-1963) - 20B words
- **Persée** (1789-2023) - Academic journals, 1B words
- Plus 11 individual French newspapers with daily resolution

## Setup

### 1. Deploy to Vercel

Click the button below or push to GitHub and connect to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/gallicagram-mcp)

### 2. Configure Claude Desktop

Add to your Claude Desktop configuration file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

\`\`\`json
{
  "mcpServers": {
    "gallicagram": {
      "url": "https://your-app.vercel.app/api/sse"
    }
  }
}
\`\`\`

### 3. Restart Claude Desktop

The Gallicagram tools will now be available in Claude!

## Usage Examples

**Search for a word:**
\`\`\`
Use query_corpus to find occurrences of "révolution" in French press from 1789 to 1799
\`\`\`

**Explore associations:**
\`\`\`
Use associated to find words associated with "changement climatique" in Le Monde from 2000 to 2023
\`\`\`

**Wildcard search:**
\`\`\`
Use joker to find what commonly follows "camarade" in Le Monde
\`\`\`

## Architecture

- **Next.js 16** with App Router
- **Edge Runtime** for low latency
- **Server-Sent Events (SSE)** for MCP protocol
- **No local storage** - All data fetched from Gallicagram API
- **Dynamic normalization** - Frequencies calculated from API totals

## API Documentation

Full Gallicagram API documentation: https://shiny.ens-paris-saclay.fr/guni/

## Credits

Built on the excellent [Gallicagram](https://shiny.ens-paris-saclay.fr/app/gallicagram) project by Benoît de Courson and team.

## License

MIT
