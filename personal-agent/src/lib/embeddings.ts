export type Embedding = number[];

export async function embedText(text: string): Promise<Embedding> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    // Fallback: deterministic pseudo-embedding so the app can run without a key,
    // but answers will be very poor. This is mainly for local UI testing.
    return cheapHashEmbedding(text, 256);
  }

  const { OpenAI } = await import("openai");
  const client = new OpenAI({ apiKey });

  const response = await client.embeddings.create({
    model: "text-embedding-3-small",
    input: text
  });

  const vector = response.data[0]?.embedding;
  if (!vector) throw new Error("No embedding returned from OpenAI");
  return vector;
}

export function cosineSimilarity(a: Embedding, b: Embedding): number {
  if (a.length !== b.length) {
    const min = Math.min(a.length, b.length);
    a = a.slice(0, min);
    b = b.slice(0, min);
  }

  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  if (!normA || !normB) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

function cheapHashEmbedding(text: string, dim: number): Embedding {
  const vec = new Array(dim).fill(0);
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    const idx = code % dim;
    vec[idx] += 1;
  }
  const norm = Math.sqrt(vec.reduce((s, v) => s + v * v, 0)) || 1;
  return vec.map((v) => v / norm);
}

