import "./globals.css";
import type { ReactNode } from "react";
import Nav from "../components/Nav";

export const metadata = {
  title: "Tolga Kilinckaya – Personal AI Agent",
  description:
    "A personal RAG-powered AI that answers questions about Tolga Kilinckaya based on curated documents."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <header className="absolute left-0 right-0 top-0 z-20">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
            <div className="text-2xl font-extrabold tracking-tight text-white drop-shadow">
              Tolga Kılınçkaya
            </div>
            <Nav />
          </div>
        </header>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}

