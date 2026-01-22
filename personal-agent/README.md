## Personal RAG Agent – tolgakilinckaya.com

This is a simple RAG-powered personal website for Tolga Kilinckaya.

It lets you:
- Paste documents about yourself into a small knowledge base
- Ask a chatbot questions that are answered **only** from those documents

### 1. Install and run locally

From `E:\PersonalAgent\personal-agent`:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000` in your browser.

### 2. Configure OpenAI

Create a `.env.local` file in the project root with:

```bash
OPENAI_API_KEY=your_api_key_here
```

Without this key the UI will still work, but the RAG quality will be very poor (it falls back to a cheap local embedding).

### 3. Deploy and connect your domain

The easiest path is:
- Push this folder to a GitHub repo.
- Deploy it to Vercel as a Next.js app.
- In Vercel project settings, add an environment variable `OPENAI_API_KEY`.
- In Vercel → Domains, add `tolgakilinckaya.com` and follow the steps to update your DNS at your domain registrar (set the A/ALIAS or CNAME as Vercel instructs).

Once DNS propagates, your personal AI agent will be live on `https://tolgakilinckaya.com`.

