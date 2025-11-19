"use client";

import { useEffect, useState } from "react";

export default function StickyCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow((window.scrollY || 0) > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToOrder = () => {
    const el = document.getElementById("order");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className={`fixed inset-x-0 bottom-6 z-40 transition-all duration-700 ease-out ${show ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-8"}`}>
      <div className="container flex justify-center">
        <button
          onClick={scrollToOrder}
          className="group relative overflow-hidden rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] px-8 py-4 font-semibold text-white shadow-lg shadow-[var(--accent)]/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[var(--accent)]/40 active:scale-95"
        >
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          <span className="relative flex items-center gap-2 text-base md:text-lg">
            <span className="animate-pulse">⚡</span>
            اطلب الآن قبل انتهاء العرض
            <span className="animate-pulse">⚡</span>
          </span>
        </button>
      </div>
    </div>
  );
}

