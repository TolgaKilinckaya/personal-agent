import HeroTitle from "../components/HeroTitle";

export default function HomePage() {
  return (
    <div>
      <section
        className="hero-bg relative min-h-[80vh] w-full"
        style={{
          backgroundImage: "url('/hero.jpg')"
        }}
      >
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 flex min-h-[72vh] items-center justify-center px-6 pt-20">
          <div className="text-center text-white">
            <p className="mb-3 text-sm font-semibold tracking-[0.25em] text-white/80">
              HOŞGELDİN
            </p>
            <HeroTitle />
            <div className="mt-6 flex items-center justify-center gap-3">
              <a
                className="inline-flex h-10 w-10 items-center justify-center rounded bg-white/95 text-slate-900 shadow hover:bg-white"
                href="#"
                aria-label="Twitter"
              >
                T
              </a>
              <a
                className="inline-flex h-10 w-10 items-center justify-center rounded bg-white/95 text-slate-900 shadow hover:bg-white"
                href="#"
                aria-label="Instagram"
              >
                I
              </a>
              <a
                className="inline-flex h-10 w-10 items-center justify-center rounded bg-white/95 text-slate-900 shadow hover:bg-white"
                href="#"
                aria-label="LinkedIn"
              >
                in
              </a>
            </div>
            <div className="mt-8">
              <a
                href="/agent"
                className="inline-flex items-center justify-center rounded bg-[#f6b219] px-5 py-2.5 text-sm font-bold text-slate-900 shadow hover:bg-[#ffbf3a]"
              >
                AI AJANI AÇ
              </a>
            </div>
          </div>
        </div>
        <div className="wave-divider" />
      </section>

      <section id="hakkimda" className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2 md:items-start">
          <div className="flex justify-center md:justify-start">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/profile.jpg"
              alt="Tolga Kılınçkaya"
              className="h-80 w-80 rounded object-cover ring-2 ring-white shadow-lg"
            />
          </div>
          <div>
            <span className="inline-block rounded bg-[#f6b219] px-3 py-1 text-xs font-bold text-white">
              MERHABA
            </span>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-800">
              Ben <span className="font-extrabold">Tolga Kılınçkaya</span>
            </h2>
            <p className="mt-2 text-lg text-slate-600">
              Öğrenci, Araştırmacı ve Meraklı Mühendis Adayı
            </p>
            <div className="mt-8 space-y-4 leading-7 text-slate-500">
              <p>
                Buraya kendinle ilgili kısa bir bio ekleyebilirsin (CV’den,
                projelerinden, ilgi alanlarından).
              </p>
              <p>
                AI ajanını ziyaretçiler için açmak istersen,{" "}
                <a className="font-semibold text-slate-800 underline" href="/agent">
                  /agent
                </a>{" "}
                sayfasına yönlendirebilirsin.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="beceriler" className="bg-white">
        <div className="mx-auto max-w-6xl px-6 pb-20">
          <h3 className="text-center text-5xl font-light tracking-tight text-slate-800">
            Beceriler &amp; Bilgi
          </h3>
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            <div className="space-y-5">
              {[
                ["Python", "85", "#ef4444"],
                ["C/C++", "78", "#3b82f6"],
                ["Algoritma ve Veri Yapıları", "65", "#f59e0b"],
                ["Makine Öğrenmesi", "55", "#ec4899"],
                ["Veri Bilimi", "70", "#f97316"],
                ["HTML/CSS/JS", "50", "#1e40af"],
                ["Yazarlık", "80", "#22c55e"]
              ].map(([label, pct, color]) => (
                <div key={label}>
                  <div className="mb-2 flex items-baseline justify-between">
                    <span className="font-semibold text-slate-800">{label}</span>
                    <span className="text-sm text-slate-400">{pct}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200">
                    <div
                      className="h-2"
                      style={{ width: `${pct}%`, backgroundColor: color }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-4 text-sm text-slate-600">
              <div className="grid grid-cols-3 gap-3">
                <div className="font-bold text-slate-800">YAŞ</div>
                <div className="col-span-2 text-slate-500">—</div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="font-bold text-slate-800">E-MAIL</div>
                <div className="col-span-2 text-slate-500">—</div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="font-bold text-slate-800">EĞİTİM</div>
                <div className="col-span-2 text-slate-500">—</div>
              </div>
              <p className="mt-6 text-slate-500">
                Burayı gerçek bilgilerle dolduracağım—istersen CV’nden otomatik
                çekmek için de bağlayabiliriz.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="iletisim" className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h3 className="text-center text-3xl font-semibold tracking-tight text-slate-800">
            İletişim
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
            Buraya bir iletişim formu veya sosyal linkler ekleyebiliriz.
          </p>
        </div>
      </section>
    </div>
  );
}

