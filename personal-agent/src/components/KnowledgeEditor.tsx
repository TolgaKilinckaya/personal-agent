"use client";

import { FormEvent, useEffect, useState } from "react";

export default function KnowledgeEditor() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [stats, setStats] = useState<{ documentCount: number; characters: number } | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    void refreshStats();
  }, []);

  async function refreshStats() {
    try {
      const res = await fetch("/api/rag/stats");
      if (!res.ok) return;
      const data = (await res.json()) as {
        documentCount: number;
        characters: number;
      };
      setStats(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    setIsSaving(true);
    setStatus(null);
    try {
      const res = await fetch("/api/rag/ingest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "Pasted note", text: trimmed })
      });

      const data = await res.json();
      if (!res.ok) {
        setStatus(
          data?.error ??
            "Failed to add knowledge. Check that the backend is running."
        );
      } else {
        setStatus(
          `Added ${data.addedChunks ?? "some"} chunks to your knowledge base.`
        );
        setText("");
        await refreshStats();
      }
    } catch (err) {
      console.error(err);
      setStatus("Unexpected error while saving knowledge.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-3">
      <form onSubmit={onSubmit} className="space-y-2">
        <textarea
          className="h-32 w-full resize-none rounded border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#f6b219] focus:ring-2 focus:ring-[#f6b219]/40"
          placeholder="Paste your CV, bio, or notes about your background, skills, and projects..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex items-center justify-between gap-3 text-xs text-slate-500">
          <span>
            {text.length} characters{" "}
            {text.length > 0 && "will be added when you click Save."}
          </span>
          <button
            type="submit"
            disabled={isSaving || !text.trim()}
            className="rounded bg-[#f6b219] px-3 py-1.5 text-xs font-semibold text-slate-950 shadow disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "Saving..." : "Save to knowledge base"}
          </button>
        </div>
      </form>
      {stats && (
        <p className="text-xs text-slate-500">
          Knowledge base:{" "}
          <span className="font-medium text-slate-300">
            {stats.documentCount} chunks
          </span>{" "}
          totaling{" "}
          <span className="font-medium text-slate-300">
            {stats.characters} characters
          </span>
          .
        </p>
      )}
      {status && <p className="text-xs text-slate-400">{status}</p>}
    </div>
  );
}

