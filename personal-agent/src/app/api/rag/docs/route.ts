import { NextRequest, NextResponse } from "next/server";
import { deleteDocument, loadKnowledgeBase } from "../../../../lib/knowledge";

export const runtime = "nodejs";

export async function GET() {
  const kb = await loadKnowledgeBase();
  return NextResponse.json({ documents: kb.documents });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  const result = await deleteDocument(id);
  return NextResponse.json({ deletedDocId: id, deletedChunks: result.deletedChunks });
}

