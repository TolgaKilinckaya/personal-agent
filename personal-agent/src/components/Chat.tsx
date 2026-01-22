"use client";

import { FormEvent, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const nextMessages: Message[] = [
      ...messages,
      { role: "user", content: trimmed }
    ];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/rag/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: nextMessages
        })
      });

      const data = await res.json();
      if (data.answer) {
        setMessages([
          ...nextMessages,
          { role: "assistant", content: data.answer as string }
        ]);
      } else if (data.error) {
        setMessages([
          ...nextMessages,
          {
            role: "assistant",
            content:
              "There was an error answering your question. Please try again."
          }
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content:
            "Something went wrong connecting to the AI backend. Check the server logs."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex h-[480px] flex-col rounded border border-slate-200 bg-white">
      <div className="flex-1 space-y-3 overflow-y-auto p-3 text-sm">
        {messages.length === 0 && (
            <p className="text-slate-500">
            Start by asking something like{" "}
              <span className="font-medium text-slate-800">
              &quot;What kind of projects has Tolga worked on?&quot;
            </span>{" "}
            after you add your personal documents above.
          </p>
        )}
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-3 py-2 ${
                m.role === "user"
                  ? "bg-[#f6b219] text-slate-950"
                  : "bg-slate-100 text-slate-800"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <p className="text-xs italic text-slate-500">Thinking…</p>
        )}
      </div>
      <form
        onSubmit={onSubmit}
        className="border-t border-slate-200 bg-white p-3"
      >
        <div className="flex gap-2">
          <input
            className="flex-1 rounded border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 focus:border-[#f6b219] focus:ring-2 focus:ring-[#f6b219]/40"
            placeholder="Ask a question about yourself…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="rounded bg-[#f6b219] px-4 py-2 text-sm font-semibold text-slate-950 shadow disabled:cursor-not-allowed disabled:opacity-60"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

