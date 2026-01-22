import Link from "next/link";

export default function Nav() {
  return (
    <nav className="flex items-center gap-6 text-sm font-semibold tracking-wide text-white/90">
      <Link className="hover:text-white" href="/">
        ANA SAYFA
      </Link>
      <Link className="hover:text-white" href="/agent">
        AI AJAN
      </Link>
      <a className="hover:text-white" href="/#hakkimda">
        HAKKIMDA
      </a>
      <a className="hover:text-white" href="/#beceriler">
        BECERİLER &amp; BİLGİ
      </a>
      <a className="hover:text-white" href="/#iletisim">
        İLETİŞİM
      </a>
    </nav>
  );
}

