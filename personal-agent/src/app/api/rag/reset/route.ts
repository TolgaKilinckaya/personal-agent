import { NextResponse } from "next/server";
import { resetKnowledgeBase } from "../../../../lib/knowledge";

export const runtime = "nodejs";

export async function POST() {
  await resetKnowledgeBase();
  return NextResponse.json({ ok: true });
}

