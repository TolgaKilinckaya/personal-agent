import Chat from "../../components/Chat";
import KnowledgeEditor from "../../components/KnowledgeEditor";

export default function AgentPage() {
  return (
    <div>
      <section
        className="hero-bg relative min-h-[52vh] w-full"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      >
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 flex min-h-[52vh] items-center justify-center px-6 pt-20">
          <div className="text-center text-white">
            <p className="mb-3 text-sm font-semibold tracking-[0.25em] text-white/80">
              AI AGENT
            </p>
            <h1 className="text-5xl font-extrabold tracking-tight drop-shadow md:text-6xl">
              Chatbot
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-white/80">
              Sorularını sor—ajan sadece senin eklediğin dokümanlardan cevap
              verir. Bilmediği yerde “bilmiyorum” der.
            </p>
          </div>
        </div>
        <div className="wave-divider" />
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div className="rounded border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold tracking-tight text-slate-800">
                Bilgi tabanı
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                CV, bio, proje notları vb. içerikleri buraya yapıştır.
              </p>
              <div className="mt-4">
                <KnowledgeEditor />
              </div>
              <div className="mt-3 text-xs text-slate-400">
                Not: Bu demo sürümde dokümanlar yerelde `data/knowledge.json`
                dosyasına kaydedilir.
              </div>
            </div>

            <div className="rounded border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold tracking-tight text-slate-800">
                Sohbet
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Örn: “Tolga’nın en güçlü becerileri neler?” veya “Hangi
                projelerde çalıştı?”
              </p>
              <div className="mt-4">
                <Chat />
              </div>
            </div>
          </div>

          <footer className="mt-12 border-t border-slate-200 pt-6 text-center text-xs text-slate-500">
            Powered by RAG (Retrieval-Augmented Generation)
          </footer>
        </div>
      </section>
    </div>
  );
}

