import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Copy Trading",
  description:
    "Discover how Veltrixsync copy trading works. Follow expert traders, mirror their positions in real time, and grow your portfolio without years of experience.",
  openGraph: {
    title: "Copy Trading | Veltrixsync",
    description:
      "Follow expert traders and mirror their positions in real time. Grow your portfolio without years of experience.",
    url: "https://veltrixsync.com/copy-trading",
  },
  twitter: {
    title: "Copy Trading | Veltrixsync",
    description:
      "Follow expert traders and mirror their positions in real time. Grow your portfolio without years of experience.",
  },
};

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReadyToInvest from "@/components/ReadyToInvest";

const FEATURES = [
  {
    title: "Follow Expert Traders",
    body: "Browse verified Leaders ranked by performance, risk score, and trading style. Follow anyone whose strategy aligns with your goals.",
  },
  {
    title: "Auto-Copy in Real Time",
    body: "Every trade a Leader makes is instantly mirrored in your account, proportional to your investment — no manual intervention needed.",
  },
  {
    title: "Full Control",
    body: "Set stop-loss limits, adjust copy amounts, and pause or stop copying at any time. You stay in control of your capital.",
  },
  {
    title: "Transparent Performance",
    body: "Access full historical stats, drawdown data, win rates, and portfolio breakdowns for every Leader before you commit.",
  },
  {
    title: "Diversify Across Leaders",
    body: "Copy multiple Leaders simultaneously and spread risk across different instruments, markets, and trading styles.",
  },
  {
    title: "No Trading Experience Needed",
    body: "Copy trading lets anyone access the financial markets by leveraging the expertise of experienced, proven traders.",
  },
];

const HOW_IT_WORKS = [
  { num: "01", title: "Create Your Account", body: "Sign up in minutes, complete verification, and fund your account to get started." },
  { num: "02", title: "Choose a Leader to Copy", body: "Filter Leaders by returns, risk level, assets traded, and more — then click Copy." },
  { num: "03", title: "Sit Back & Grow", body: "Your portfolio mirrors the Leader's trades automatically. Track performance in real time." },
];

export default function CopyTradingPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-white dark:bg-[#061410]">
        <div className="absolute inset-0 pointer-events-none">
          <Image src="/images/hero-bg.png" alt="" fill className="object-cover dark:hidden" style={{ opacity: 0.4 }} priority />
          <Image src="/images/hero-bg.png" alt="" fill className="object-cover hidden dark:block" style={{ mixBlendMode: "screen", opacity: 0.13 }} />
        </div>
        <div className="relative z-10 flex flex-col items-center text-center px-6 pt-20 lg:pt-[120px] pb-20 lg:pb-[120px]">
          <h1 className="font-bold leading-[1.08] text-[#001011] dark:text-white text-[42px] sm:text-[58px] lg:text-[76px] max-w-4xl">
            Copy the World&apos;s Best
            <br />
            <span className="text-[#B0D45A]">Traders</span>
          </h1>
          <p className="mt-6 max-w-xl text-[14px] lg:text-[15px] leading-[1.8] text-[#444444] dark:text-[#8fa896]">
            VeltrixSync&apos;s copy trading lets you automatically replicate the moves of expert
            Leaders — so you invest smarter without needing to trade yourself.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/sign-up" className="inline-flex items-center gap-2 h-[50px] px-10 rounded-full text-[14px] font-bold hover:opacity-90 transition-opacity" style={{ backgroundColor: "#B0D45A", color: "#001011" }}>
              Start copying
              <Arrow />
            </Link>
            <Link href="/sign-up" className="inline-flex items-center gap-2 h-[50px] px-8 rounded-full text-[14px] font-semibold border border-[#d0d0d0] dark:border-[#2a4030] text-[#001011] dark:text-white hover:opacity-80 transition-opacity">
              Browse Leaders
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="w-full bg-[#f7f7f2] dark:bg-[#071612] border-y border-[#e5e5e5] dark:border-[#1e3827]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-[72px] py-16 lg:py-24">
          <h2 className="text-center text-[28px] lg:text-[40px] font-bold text-[#001011] dark:text-white mb-14">
            How Copy Trading Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((s) => (
              <div key={s.num} className="relative rounded-2xl border border-[#e5e5e5] dark:border-[#1e3827] bg-white dark:bg-[#0a1a10] p-8 flex flex-col gap-4 overflow-hidden">
                <span className="absolute top-4 right-5 text-[64px] font-black leading-none text-[#f0f0ea] dark:text-[#1a2e20] select-none pointer-events-none">{s.num}</span>
                <div className="w-10 h-10 rounded-full border border-[#B0D45A] bg-[#B0D45A]/15 flex items-center justify-center">
                  <span className="text-[#B0D45A] text-[13px] font-bold">{s.num}</span>
                </div>
                <h3 className="text-[15px] font-bold text-[#001011] dark:text-white">{s.title}</h3>
                <p className="text-[13px] leading-[1.75] text-[#555555] dark:text-[#8fa896]">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="w-full bg-white dark:bg-[#0b1c11]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-[72px] py-16 lg:py-24">
          <h2 className="text-[28px] lg:text-[40px] font-bold text-[#001011] dark:text-white mb-12">
            Everything you need to copy with confidence
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y divide-x-0 sm:divide-x divide-[#e5e5e5] dark:divide-[#1e3827] border border-[#e5e5e5] dark:border-[#1e3827] rounded-2xl overflow-hidden">
            {FEATURES.map((f, i) => (
              <div key={i} className={`p-7 lg:p-8 flex flex-col gap-3 bg-white dark:bg-[#0b1c11] ${i < 3 ? "sm:border-b border-[#e5e5e5] dark:border-[#1e3827]" : ""}`}>
                <div className="w-8 h-8 flex items-center justify-center">
                  <CheckCircle />
                </div>
                <h3 className="text-[15px] font-bold text-[#001011] dark:text-white">{f.title}</h3>
                <p className="text-[13px] leading-[1.75] text-[#555555] dark:text-[#8fa896]">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ReadyToInvest />
      <Footer />
    </>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="2" y1="7" x2="12" y2="7" /><polyline points="8,3 12,7 8,11" />
    </svg>
  );
}
function CheckCircle() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="13" stroke="#B0D45A" strokeWidth="1.5" />
      <polyline points="8,14 12,18 20,10" stroke="#B0D45A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
