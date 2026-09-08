"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const SLIDES = [
  {
    title: "What's the time? It's time to wear tech",
    subtitle:
      "Smart watches can run apps and play back all sorts of digital media, like radio streamed to Bluetooth headphones.",
    cta1: "Buy Now - $120",
    cta2: "Shop Deals >",
    frontBg: "bg-[#d4c5ff]", // Light Purple
    midBg: "bg-[#7be4d6]", // Turquoise
    backBg: "bg-[#9ce5ff]", // Light Blue
  },
  {
    title: "Level up your audio experience today",
    subtitle:
      "Discover our new range of noise-cancelling headphones. Immerse yourself in pure, uninterrupted sound.",
    cta1: "Shop Audio",
    cta2: "View Specs >",
    frontBg: "bg-[#c8e6c9]", // Soft Green
    midBg: "bg-[#ffe082]", // Soft Amber
    backBg: "bg-[#ffccbc]", // Soft Orange
  },
  {
    title: "Your home, smarter and more connected",
    subtitle:
      "Automate your daily routines with our latest smart home hubs and temperature control systems.",
    cta1: "Explore Smart Home",
    cta2: "Learn More >",
    frontBg: "bg-[#ffecb3]", // Soft Yellow
    midBg: "bg-[#f48fb1]", // Soft Pink
    backBg: "bg-[#ce93d8]", // Soft Purple
  },
];

export const HeroBanner = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((prev) => (prev + 1) % SLIDES.length),
      6000,
    );
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[index];

  return (
    <div className="relative w-full pt-10 md:pt-12">
      {/* --- LAYER 1 (Paling Belakang) --- */}
      <div
        className={`absolute left-10 right-10 top-0 h-24 rounded-t-[2.5rem] transition-colors duration-1000 ease-in-out md:left-20 md:right-20 ${slide.backBg}`}
      />

      {/* --- LAYER 2 (Tengah) --- */}
      <div
        className={`absolute left-5 right-5 top-4 h-24 rounded-t-[2.5rem] transition-colors duration-1000 ease-in-out md:left-10 md:right-10 md:top-6 ${slide.midBg}`}
      />

      {/* --- LAYER 3 (Paling Depan / Konten Utama) --- */}
      <div
        className={`relative z-10 overflow-hidden rounded-[2rem] px-8 py-16 transition-colors duration-1000 ease-in-out sm:px-16 md:rounded-[3rem] md:py-24 ${slide.frontBg}`}
      >
        <div className="relative z-20 flex flex-col items-center justify-between gap-16 lg:flex-row">
          {/* Sisi Kiri: Teks & Tombol */}
          <div key={index} className="fade-in w-full max-w-xl">
            <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-[4rem]">
              {slide.title}
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-slate-800/80 md:text-lg">
              {slide.subtitle}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link
                href="/shop"
                className="inline-flex h-14 items-center justify-center rounded-full bg-slate-900 px-8 text-sm font-semibold text-white transition-transform hover:scale-105 hover:bg-slate-800"
              >
                {slide.cta1}
              </Link>
              <Link
                href="/shop"
                className="text-sm font-semibold text-slate-900 transition-colors hover:text-slate-600 hover:underline"
              >
                {slide.cta2}
              </Link>
            </div>
          </div>

          {/* Sisi Kanan: Pure CSS Smartwatch (Tanpa Gambar!) */}
          <div className="relative hidden w-full max-w-sm flex-col items-center justify-center lg:flex">
            {/* Tali Jam Atas */}
            <div className="absolute -top-16 z-0 h-32 w-40 rounded-t-3xl bg-[#2a2a2a] shadow-inner" />

            {/* Tali Jam Bawah */}
            <div className="absolute -bottom-16 z-0 h-32 w-40 rounded-b-3xl bg-[#2a2a2a] shadow-inner" />

            {/* Body Smartwatch */}
            <div className="relative z-10 flex h-72 w-60 flex-col items-center justify-center rounded-[2.5rem] border-[8px] border-[#e2e2e2] bg-[#111] shadow-2xl">
              {/* Tombol Samping (Crown) */}
              <div className="absolute -right-3 top-20 h-10 w-2 rounded-r-md bg-[#d1d1d1]" />
              <div className="absolute -right-2.5 top-36 h-16 w-1.5 rounded-r-md bg-[#e2e2e2]" />

              {/* Layar Interface */}
              <div className="flex h-[88%] w-[88%] flex-col justify-center rounded-3xl bg-black p-6 text-white shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]">
                <div className="flex items-center justify-between text-xs font-medium text-slate-400">
                  <span>Mon 06</span>
                  <div className="flex gap-1">
                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                    <span className="h-2 w-2 rounded-full bg-red-500" />
                    <span className="h-2 w-2 rounded-full bg-amber-500" />
                  </div>
                </div>

                {/* Waktu Digital */}
                <div className="mt-2 text-[5.5rem] font-medium leading-[0.85] tracking-tighter">
                  12
                  <br />
                  06
                </div>

                <div className="mt-2 text-sm font-medium text-slate-400">
                  PM
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Indikator Slider Custom */}
        <div className="absolute bottom-8 left-8 flex gap-2 sm:left-16">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2.5 rounded-full transition-all duration-500 ease-out ${
                i === index
                  ? "w-10 bg-slate-900"
                  : "w-2.5 bg-slate-900/20 hover:bg-slate-900/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
