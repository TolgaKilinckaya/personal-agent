import { NextRequest, NextResponse } from "next/server";
import { embedText } from "../../../lib/embeddings";
import { loadKnowledgeBase, saveKnowledgeBase } from "../../../lib/knowledge";

export const runtime = "nodejs";

export async function GET() {
  const kb = await loadKnowledgeBase();
  return NextResponse.json({
    documentCount: kb.chunks.length,
    characters: kb.chunks.reduce((acc, c) => acc + c.text.length, 0)
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text } = body as { text: string };

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Missing text" }, { status: 400 });
    }

    const chunks = splitIntoChunks(text, 800);

    const embeddings = await Promise.all(
      chunks.map(async (chunk) => ({
        id: `chunk-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        text: chunk,
        embedding: await embedText(chunk)
      }))
    );

    const kb = await loadKnowledgeBase();
    kb.chunks.push(...embeddings);
    await saveKnowledgeBase(kb);

    return NextResponse.json({ addedChunks: embeddings.length });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to update knowledge base" },
      { status: 500 }
    );
  }
}

function splitIntoChunks(text: string, maxTokensApprox: number): string[] {
  const sentences = text.split(/(?<=[.!?])\s+/);
  const chunks: string[] = [];
  let current = "";

  for (const sentence of sentences) {
    if ((current + " " + sentence).length > maxTokensApprox && current) {
      chunks.push(current.trim());
      current = sentence;
    } else {
      current += " " + sentence;
    }
  }

  if (current.trim()) {
    chunks.push(current.trim());
  }

  return chunks;
}

