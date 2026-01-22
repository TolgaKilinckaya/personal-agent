import { NextRequest, NextResponse } from "next/server";
import { cosineSimilarity, embedText } from "../../../../lib/embeddings";
import { getKnowledgeBase } from "../../../../lib/knowledge";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, history } = body as {
      message: string;
      history: { role: "user" | "assistant"; content: string }[];
    };

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Missing message" }, { status: 400 });
    }

    const kb = await getKnowledgeBase();
    if (kb.chunks.length === 0) {
      return NextResponse.json(
        {
          answer:
            "I don't have any personal documents yet. Please add some information about yourself first."
        },
        { status: 200 }
      );
    }

    const queryEmbedding = await embedText(message);

    const scored = kb.chunks
      .map((chunk) => ({
        chunk,
        score: cosineSimilarity(queryEmbedding, chunk.embedding)
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .filter((item) => item.score > 0.2);

    const context = scored.map((s) => s.chunk.text).join("\n\n---\n\n");

    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (!openaiApiKey) {
      return NextResponse.json(
        {
          answer:
            "The AI backend is not configured yet (missing OPENAI_API_KEY). Add it to `.env.local` and redeploy."
        },
        { status: 200 }
      );
    }

    const { OpenAI } = await import("openai");
    const client = new OpenAI({ apiKey: openaiApiKey });

    const systemPrompt = `
You are a personal AI agent for Tolga Kilinckaya.
You must answer strictly based on the provided personal documents.
If the answer is not clearly supported by the documents, say you don't know.
Keep answers concise but helpful.
`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        ...(Array.isArray(history) ? history : []),
        {
          role: "system",
          content: `Here are Tolga's personal documents:\n\n${context}`
        },
        { role: "user", content: message }
      ],
      temperature: 0.3
    });

    const answer = completion.choices[0]?.message?.content ?? "";

    return NextResponse.json({
      answer,
      sources: scored.map((s) => ({ chunkId: s.chunk.id, docId: s.chunk.docId, score: s.score }))
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Unexpected error in chat endpoint" },
      { status: 500 }
    );
  }
}

