import { promises as fs } from "fs";
import path from "path";
import type { Embedding } from "./embeddings";

export interface KnowledgeChunk {
  id: string;
  docId: string;
  text: string;
  embedding: Embedding;
}

export interface KnowledgeDocument {
  id: string;
  title: string;
  createdAt: string;
}

export interface KnowledgeBase {
  documents: KnowledgeDocument[];
  chunks: KnowledgeChunk[];
}

const DATA_DIR = path.join(process.cwd(), "data");
const KB_PATH = path.join(DATA_DIR, "knowledge.json");

export async function loadKnowledgeBase(): Promise<KnowledgeBase> {
  try {
    const raw = await fs.readFile(KB_PATH, "utf8");
    const parsed = JSON.parse(raw) as Partial<KnowledgeBase>;
    return {
      documents: parsed.documents ?? [],
      chunks: parsed.chunks ?? []
    };
  } catch {
    return { documents: [], chunks: [] };
  }
}

export async function saveKnowledgeBase(kb: KnowledgeBase): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(KB_PATH, JSON.stringify(kb, null, 2), "utf8");
}

export async function getKnowledgeBase(): Promise<KnowledgeBase> {
  return loadKnowledgeBase();
}

export async function resetKnowledgeBase(): Promise<void> {
  await saveKnowledgeBase({ documents: [], chunks: [] });
}

export async function deleteDocument(docId: string): Promise<{ deletedChunks: number }> {
  const kb = await loadKnowledgeBase();
  const before = kb.chunks.length;
  kb.documents = kb.documents.filter((d) => d.id !== docId);
  kb.chunks = kb.chunks.filter((c) => c.docId !== docId);
  await saveKnowledgeBase(kb);
  return { deletedChunks: before - kb.chunks.length };
}

