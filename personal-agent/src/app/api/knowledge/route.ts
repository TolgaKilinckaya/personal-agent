import { NextRequest, NextResponse } from "next/server";
import { embedText } from "../../../lib/embeddings";
import { loadKnowledgeBase, saveKnowledgeBase } from "../../../lib/knowledge";

// Eğer KnowledgeChunk tipi export ediliyorsa bunu açabilirsin:
// import type { KnowledgeChunk } from "../../../lib/knowledge";

export const runtime = "nodejs";

export async function GET() {
  const kb = await loadKnowledgeBase();
  return NextResponse.json({
    documentCount: kb.chunks.length,
    characters: kb.chunks.reduce((acc, c) => acc + c.text.length, 0),
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, docId } = body as { text?: string; docId?: string };

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Missing text" }, { status: 400 });
    }

    // docId zorunlu: yoksa default ver
    const resolvedDocId = (docId && typeof docId === "string" && docId.trim())
      ? docId.trim()
      : "default";

    const chunks = splitIntoChunks(text, 800);

    const embeddings = await Promise.all(
      chunks.map(async (chunk) => ({
        docId: resolvedDocId, // ✅ FIX: KnowledgeChunk için gerekli
        id: `chunk-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        text: chunk,
        embedding: await embedText(chunk),
      }))
    );

    const kb = await loadKnowledgeBase();

    // kb.chunks KnowledgeChunk[] bekliyor; embeddings artık uyumlu
    kb.chunks.push(...embeddings);

    await saveKnowledgeBase(kb);

    return NextResponse.json({
      addedChunks: embeddings.length,
      docId: resolvedDocId,
    });
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
