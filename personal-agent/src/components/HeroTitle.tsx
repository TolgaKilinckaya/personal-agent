"use client";

import { useEffect, useState } from "react";

const WORDS = ["Tolga", "Azimliyim", "Meraklıyım", "Çalışkanım"];

type Phase = "typing" | "pause" | "deleting";

export default function HeroTitle() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    const currentWord = WORDS[index];

    if (phase === "typing") {
      if (displayed.length === currentWord.length) {
        const timeout = setTimeout(() => setPhase("pause"), 900);
        return () => clearTimeout(timeout);
      }
      const timeout = setTimeout(() => {
        setDisplayed(currentWord.slice(0, displayed.length + 1));
      }, 120);
      return () => clearTimeout(timeout);
    }

    if (phase === "pause") {
      const timeout = setTimeout(() => setPhase("deleting"), 700);
      return () => clearTimeout(timeout);
    }

    // deleting
    if (displayed.length === 0) {
      setPhase("typing");
      setIndex((prev) => (prev + 1) % WORDS.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayed(displayed.slice(0, -1));
    }, 80);
    return () => clearTimeout(timeout);
  }, [displayed, index, phase]);

  return (
    <h1 className="text-5xl font-extrabold tracking-tight drop-shadow md:text-6xl">
      <span>Ben, </span>
      <span className="inline-block align-baseline">
        {displayed}
        <span className="ml-1 inline-block h-7 w-[2px] translate-y-[2px] bg-white align-middle animate-pulse" />
      </span>
    </h1>
  );
}

