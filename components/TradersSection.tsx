"use client";

import { useRef } from "react";
import { TrendingUp } from "lucide-react";

const traders = [
  { name: "Ahkari Ekans Bot", role: "Crypto Expert",           profit: "24.96%", copiers: "556",   risk: "Balanced Risk", color: "#16a34a", initials: "AE" },
  { name: "Ropmi",            role: "Strategist",               profit: "1,234%", copiers: "3,446", risk: "High Risk",     color: "#d87060", initials: "RO" },
  { name: "Suphy James",      role: "Multi-strategist",         profit: "101%",   copiers: "2,345", risk: "Low Risk",      color: "#3a6080", initials: "SJ" },
  { name: "Jokie",            role: "All rounder strategist",   profit: "43%",    copiers: "5,677", risk: "Balanced Risk", color: "#8a5040", initials: "JO" },
  { name: "LexTrader",        role: "Options Specialist",       profit: "312%",   copiers: "1,890", risk: "Low Risk",      color: "#4a7030", initials: "LT" },
  { name: "CryptoWulf",       role: "Crypto Analyst",           profit: "89%",    copiers: "982",   risk: "Moderate Risk", color: "#703060", initials: "CW" },
  { name: "MarketMaven",      role: "Equity Trader",            profit: "178%",   copiers: "4,231", risk: "Low Risk",      color: "#305060", initials: "MM" },
];

function riskBadgeClass(risk: string) {
  if (risk === "High Risk")     return "bg-[#fee2e2] text-[#dc2626] dark:bg-[#2a0808] dark:text-[#f87171]";
  if (risk === "Moderate Risk") return "bg-[#fef3c7] text-[#d97706] dark:bg-[#2a1f08] dark:text-[#fbbf24]";
  if (risk === "Low Risk" || risk === "Balanced Risk" || risk === "Safe")
                                return "bg-[#dcfce7] text-[#16a34a] dark:bg-[#082a12] dark:text-[#4ade80]";
  return "bg-[#f0f0ec] text-[#555555] dark:bg-[#1a2a1e] dark:text-[#8fa896]";
}

export default function TradersSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <section id="traders" className="w-full bg-white dark:bg-[#0b1c11]">

      {/* ── Header — centered ── */}
      <div className="max-w-[1440px] mx-auto text-center px-6 pt-14 pb-12 sm:pt-16 sm:pb-14 lg:pt-20 lg:pb-16">
        <h2 className="text-[36px] sm:text-[48px] lg:text-[56px] font-extrabold text-[#001011] dark:text-white leading-tight">
          Copy from the best traders
        </h2>
        <p className="mt-4 text-[15px] sm:text-[16px] lg:text-[17px] leading-[1.7] text-[#666666] dark:text-[#8fa896] max-w-[560px] mx-auto">
          Our top-performing traders have consistently delivered exceptional
          results. Choose from a diverse range of trading strategies and risk profiles.
        </p>
      </div>

      {/* ── Carousel ── */}
      <div className="border-t border-[#e8ead8] dark:border-[#1e3827] pt-8 pb-8 lg:pt-12 lg:pb-12">
        <div className="relative max-w-[1440px] mx-auto">
          {/* Scroll area */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-6 lg:px-[72px] pb-1"
          >
            {traders.map((trader, i) => (
              <TraderCard key={i} trader={trader} />
            ))}
          </div>

          {/* Left arrow */}
          <button
            onClick={() => scroll(-1)}
            className="hidden lg:flex absolute left-10 top-1/2 -translate-y-1/2 w-8 h-8 items-center justify-center bg-white dark:bg-[#132b1a] border border-[#e5e5e5] dark:border-[#1e3827] shadow text-[#555555] dark:text-[#8fa896] hover:text-[#001011] dark:hover:text-white transition-colors z-10"
          >
            <ChevronLeftIcon />
          </button>

          {/* Right arrow */}
          <button
            onClick={() => scroll(1)}
            className="hidden lg:flex absolute right-10 top-1/2 -translate-y-1/2 w-8 h-8 items-center justify-center bg-white dark:bg-[#132b1a] border border-[#e5e5e5] dark:border-[#1e3827] shadow text-[#555555] dark:text-[#8fa896] hover:text-[#001011] dark:hover:text-white transition-colors z-10"
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>

      {/* ── View all button ── */}
      <div className="pb-10 lg:pb-14 flex justify-center px-6">
        <button className="inline-flex items-center gap-2 h-12 px-8 text-[14px] font-bold transition-opacity hover:opacity-80 border border-[#d8ead8] text-[#001011] dark:border-[#2a4a34] dark:text-white">
          View all expert traders
          <ArrowRightIcon />
        </button>
      </div>

    </section>
  );
}

/* ── Trader Card — styled like Rising Stars ───────────────────────── */

type Trader = (typeof traders)[number];

function TraderCard({ trader }: { trader: Trader }) {
  return (
    <div className="min-w-[300px] max-w-[300px] bg-white dark:bg-[#0e1e14] border border-[#e5e5e5] dark:border-[#1e3827] flex flex-col shrink-0 overflow-hidden">

      {/* Avatar + name + role */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3">
        <div className="w-[52px] h-[52px] rounded-full bg-[#f0f0ec] dark:bg-[#1a2a1e] flex items-center justify-center shrink-0">
          <div
            className="w-[38px] h-[38px] rounded-full flex items-center justify-center text-[11px] font-bold text-white"
            style={{ backgroundColor: trader.color }}
          >
            {trader.initials}
          </div>
        </div>
        <div className="min-w-0">
          <p className="text-[15px] font-bold text-[#001011] dark:text-white leading-tight truncate">
            {trader.name}
          </p>
          <p className="text-[12px] text-[#888888] dark:text-[#4a6655] leading-tight mt-0.5 truncate">
            {trader.role}
          </p>
        </div>
      </div>

      {/* Stats inset box */}
      <div className="mx-4 mb-3 bg-[#f5f5ef] dark:bg-[#0b1a10] px-4 py-3 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-[26px] font-bold text-[#001011] dark:text-white leading-none">
              {trader.profit}
            </span>
            <TrendingUp size={18} color="#22c55e" />
          </div>
          <span className="text-[12px] text-[#888888] dark:text-[#4a6655] mt-1 block">
            Profit (1M)
          </span>
        </div>
        <div className="text-right">
          <div className="flex items-center justify-end gap-1.5">
            <span className="text-[26px] font-bold text-[#001011] dark:text-white leading-none">
              {trader.copiers}
            </span>
            <TrendingUp size={18} color="#22c55e" />
          </div>
          <span className="text-[12px] text-[#888888] dark:text-[#4a6655] mt-1 block">
            Copiers
          </span>
        </div>
      </div>

      {/* Risk level */}
      <div className="flex items-center justify-between px-4 mb-3">
        <span className="text-[13px] font-medium text-[#001011] dark:text-white">
          Risk level:
        </span>
        <span className={`text-[12px] font-semibold px-3 py-1 rounded-full ${riskBadgeClass(trader.risk)}`}>
          {trader.risk}
        </span>
      </div>

      {/* Copy trader button */}
      <div className="px-4 pb-4">
        <button className="w-full h-10 border border-[#e5e5e5] dark:border-[#1e3827] text-[13px] font-bold text-[#001011] dark:text-white hover:bg-[#f8f8f5] dark:hover:bg-[#132b1a] transition-colors">
          Copy trader
        </button>
      </div>

    </div>
  );
}

/* ── Icons ─────────────────────────────────────────────────────────── */

function ChevronLeftIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="10,3 5,8 10,13" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6,3 11,8 6,13" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
