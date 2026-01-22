import { NextResponse } from "next/server";
import { loadKnowledgeBase } from "../../../../lib/knowledge";

export const runtime = "nodejs";

export async function GET() {
  const kb = await loadKnowledgeBase();
  return NextResponse.json({
    documentCount: kb.chunks.length,
    characters: kb.chunks.reduce((acc, c) => acc + c.text.length, 0)
  });
}

