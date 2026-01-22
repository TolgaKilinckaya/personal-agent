import { NextRequest, NextResponse } from "next/server";
import { embedText } from "../../../../lib/embeddings";
import { loadKnowledgeBase, saveKnowledgeBase } from "../../../../lib/knowledge";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, text } = body as { title?: string; text: string };

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Missing text" }, { status: 400 });
    }

    const docId = `doc-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const docTitle = (title && String(title).trim()) || "Untitled document";

    const chunks = splitIntoChunks(text, 900);
    const embeddedChunks = await Promise.all(
      chunks.map(async (chunk) => ({
        id: `chunk-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        docId,
        text: chunk,
        embedding: await embedText(chunk)
      }))
    );

    const kb = await loadKnowledgeBase();
    kb.documents.push({ id: docId, title: docTitle, createdAt: new Date().toISOString() });
    kb.chunks.push(...embeddedChunks);
    await saveKnowledgeBase(kb);

    return NextResponse.json({ docId, addedChunks: embeddedChunks.length });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to ingest document" },
      { status: 500 }
    );
  }
}

function splitIntoChunks(text: string, maxChars: number): string[] {
  const sentences = text.split(/(?<=[.!?])\s+/);
  const chunks: string[] = [];
  let current = "";

  for (const sentence of sentences) {
    const next = (current ? current + " " : "") + sentence;
    if (next.length > maxChars && current) {
      chunks.push(current.trim());
      current = sentence;
    } else {
      current = next;
    }
  }

  if (current.trim()) chunks.push(current.trim());
  return chunks;
}

