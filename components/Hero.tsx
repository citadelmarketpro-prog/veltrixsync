"use client";

import { useRef, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";

/* ─────────────────────────────────────────────────────────────────
   Animated particles — lime-green brand palette (#B0D45A)
──────────────────────────────────────────────────────────────────── */
function ParticlesBackground() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const rafRef     = useRef<number | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isDark = resolvedTheme === "dark";

    /* ── colours — lime-green #B0D45A = rgb(176, 212, 90) ── */
    const dotColor   = isDark ? "rgba(176,212,90,0.50)"  : "rgba(3,63,45,0.16)";
    const lineBase   = isDark ? "176,212,90"              : "3,63,45";
    const lineMaxA   = isDark ? 0.20                      : 0.07;

    const COUNT = 160;
    const DIST  = 160;

    const fit = () => {
      const parent = canvas.parentElement;
      canvas.width  = parent ? parent.offsetWidth  : window.innerWidth;
      canvas.height = parent ? parent.offsetHeight : window.innerHeight;
    };
    fit();

    type P = { x: number; y: number; vx: number; vy: number; r: number };
    const pts: P[] = Array.from({ length: COUNT }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.36,
      vy: (Math.random() - 0.5) * 0.36,
      r:  Math.random() * 1.7 + 0.6,
    }));

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < COUNT; i++) {
        const p = pts[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        /* dot */
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = dotColor;
        ctx.fill();

        /* connecting lines */
        for (let j = i + 1; j < COUNT; j++) {
          const q  = pts[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < DIST) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${lineBase},${lineMaxA * (1 - d / DIST)})`;
            ctx.lineWidth   = 0.65;
            ctx.stroke();
          }
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    tick();

    window.addEventListener("resize", fit);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", fit);
    };
  }, [mounted, resolvedTheme]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

/* ─────────────────────────────────────────────────────────────────
   Hero
──────────────────────────────────────────────────────────────────── */
export default function Hero() {
  return (
    <>
      {/* ════════════════════════════════════════════════════════
          HERO SECTION
      ════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-white dark:bg-[#0b1c11] min-h-[calc(100vh-80px)] flex flex-col justify-between">

        {/* ── Particle canvas ── */}
        <ParticlesBackground />

        {/* ── Radial glow orb — sits behind the content ── */}
        <div
          className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            width: "780px",
            height: "480px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center, rgba(176,212,90,0.07) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* ── Lime top-edge gradient ── */}
        <div
          className="absolute inset-x-0 top-0 pointer-events-none"
          style={{
            height: "180px",
            background: "linear-gradient(to bottom, rgba(176,212,90,0.10) 0%, transparent 100%)",
          }}
        />

        {/* ── Hero content ── */}
        <div className="relative z-10 flex flex-col items-center text-center px-5 pt-6 sm:pt-10 lg:pt-[88px]">

          {/* Integrates-with badge */}
          <div className="mb-3 sm:mb-6 lg:mb-10 w-full flex justify-center px-0">
            <div className="hero-badge inline-flex items-center gap-2 px-3 py-1.5 sm:px-5 sm:h-[50px] rounded-full text-[10px] sm:text-[13px] font-medium text-[#001011] dark:text-[#f0f0f0] whitespace-nowrap overflow-hidden">
              <TrendUpIcon />
              <span className="truncate">Integrates with: E-trade, WEBULL, THINK OR SWIM, SCHWAB</span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="font-extrabold leading-[1.06] tracking-tight text-[#001011] dark:text-white max-w-[860px] text-[22px] sm:text-[44px] lg:text-[72px]">
            Copy Futures, Options &{" "}
            <span className="block sm:inline">Contracts with Precision</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-2 sm:mt-5 lg:mt-6 max-w-200 text-[13px] sm:text-[15px] lg:text-[17px] leading-[1.65] text-[#666666] dark:text-[#8fa896]">
            We empower you to mirror real-time stock and options trades from top-performing traders. Whether you&apos;re following tickers, contracts, or strategic options moves, our platform brings precision, flexibility, and transparency—straight to your fingertips
          </p>

          {/* CTA buttons */}
          <div className="mt-4 sm:mt-8 lg:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4 w-full max-w-[340px] sm:max-w-[560px] mx-auto">
            <Link
              href="/sign-up"
              className="w-full inline-flex items-center justify-center h-11 sm:h-[52px] px-8 text-[14px] sm:text-[15px] font-bold transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#C1E963", color: "#001011" }}
            >
              Start Copying Now
            </Link>
            <Link
              href="/sign-up"
              className="w-full inline-flex items-center justify-center h-11 sm:h-[52px] border border-[#c8d8c0] dark:border-[#2a4a34] px-8 text-[14px] sm:text-[15px] font-medium text-[#001011] hover:opacity-70 transition-opacity"
              style={{ backgroundColor: "#f9fdef" }}
            >
              View expert traders
            </Link>
          </div>
        </div>

        {/* ── Video / trader network visual ── */}
        <div className="relative z-10 w-full flex flex-col items-center mt-4 sm:mt-8 lg:mt-10 px-5 lg:px-0">
          <div className="w-full max-w-75 sm:max-w-100 lg:max-w-125 mx-auto">
            <video
              src="/images/banner-video-light.mp4"
              autoPlay muted loop playsInline
              className="w-full dark:hidden"
            />
            <video
              src="/images/banner-video-dark.mp4"
              autoPlay muted loop playsInline
              className="w-full hidden dark:block"
            />
          </div>

          {/* Globally Regulated badge */}
          <div className="flex items-center justify-center gap-3 py-4 sm:py-5">
            <GloballyRegulatedIcon />
            <span className="text-[22px] sm:text-[24px] lg:text-[28px] font-bold text-[#001011] dark:text-white">
              Globally Regulated
            </span>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          STATS BAR
      ════════════════════════════════════════════════════════ */}
      <div className="w-full border-y-2 border-[#e8ead8] dark:border-[#1e3827]">
        <div className="max-w-[1440px] mx-auto grid grid-cols-3 divide-x-2 divide-[#e8ead8] dark:divide-[#1e3827]">
          <StatItem value="118+" label="Active Traders" />
          <StatItem value="10M+" label="Total Volume" />
          <StatItem value="1M+"  label="Users" />
        </div>
      </div>
    </>
  );
}

/* ── Sub-components ─────────────────────────────────────────── */

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-6 sm:py-12 lg:py-20">
      <span className="font-extrabold text-[28px] sm:text-[48px] lg:text-[72px] leading-none text-[#033F2D] dark:text-[#B0D45A]">
        {value}
      </span>
      <span className="mt-2 sm:mt-3 text-[11px] sm:text-[13px] lg:text-[17px] text-[#666666] dark:text-[#8fa896]">
        {label}
      </span>
    </div>
  );
}

/* ── Icons ──────────────────────────────────────────────────── */

function TrendUpIcon() {
  return (
    <svg
      width="16" height="16" viewBox="0 0 16 16"
      fill="none" stroke="#219204" strokeWidth="1.44"
      strokeLinecap="round" strokeLinejoin="round"
      className="shrink-0"
    >
      <polyline points="1,11 5,7 9,9 15,3" />
      <polyline points="11,3 15,3 15,7" />
    </svg>
  );
}

function GloballyRegulatedIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12">
      <circle cx="14" cy="14" r="11" stroke="#B0D45A" strokeWidth="1.8" />
      <ellipse cx="14" cy="14" rx="5.5" ry="11" stroke="#B0D45A" strokeWidth="1.4" />
      <line x1="3"  y1="10" x2="25" y2="10" stroke="#B0D45A" strokeWidth="1.4" />
      <line x1="3"  y1="18" x2="25" y2="18" stroke="#B0D45A" strokeWidth="1.4" />
      <circle cx="20" cy="20" r="5" fill="#B0D45A" />
      <path d="M17.5 20l1.5 1.5 3-3" stroke="#001011" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
