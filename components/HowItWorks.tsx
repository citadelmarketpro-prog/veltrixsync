/* ── Card 1: Choose Your Expert Trader ─────────────────────────── */
function Card1() {
  return (
    <div className="w-full rounded-xl overflow-hidden bg-[#f0f0ec] dark:bg-[#0d1f14] border border-[#e5e5e0] dark:border-[#1e3827] flex flex-col items-center justify-center gap-2.5 px-4 py-4">
      {/* James bot — top center */}
      <div className="w-full max-w-[200px] bg-white dark:bg-[#132b1a] rounded-xl border border-[#e8e8e3] dark:border-[#1e3827] flex items-center gap-2.5 px-3 py-2.5 shadow-sm">
        <div className="w-8 h-8 rounded-full bg-[#e4e4df] dark:bg-[#1a2e1e] flex items-center justify-center text-[16px] shrink-0">🤖</div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-bold text-[#001011] dark:text-white leading-none">James bot</p>
          <p className="text-[9.5px] text-[#888888] dark:text-[#5a7a64] leading-none mt-0.5">Crypto Expert</p>
        </div>
        <TrendArrow />
      </div>
      {/* Romy lane + Speki — bottom row */}
      <div className="flex gap-2 w-full max-w-[200px]">
        <div className="flex-1 bg-white dark:bg-[#132b1a] rounded-xl border border-[#e8e8e3] dark:border-[#1e3827] flex items-center gap-1.5 px-2.5 py-2 shadow-sm">
          <div className="w-[22px] h-[22px] rounded-full bg-[#c07858] flex items-center justify-center text-[7px] font-bold text-white shrink-0">RL</div>
          <div className="min-w-0">
            <p className="text-[9.5px] font-bold text-[#001011] dark:text-white leading-none truncate">Romy lane</p>
            <p className="text-[8px] text-[#888888] dark:text-[#5a7a64] leading-none mt-0.5">Strategist</p>
          </div>
          <TrendArrow />
        </div>
        <div className="flex-1 bg-white dark:bg-[#132b1a] rounded-xl border border-[#e8e8e3] dark:border-[#1e3827] flex items-center gap-1.5 px-2.5 py-2 shadow-sm">
          <div className="w-[22px] h-[22px] rounded-full bg-[#5a9fd4] flex items-center justify-center text-[7px] font-bold text-white shrink-0">SK</div>
          <div className="min-w-0">
            <p className="text-[9.5px] font-bold text-[#001011] dark:text-white leading-none">Speki</p>
            <p className="text-[8px] text-[#888888] dark:text-[#5a7a64] leading-none mt-0.5">Value investor</p>
          </div>
          <TrendArrow />
        </div>
      </div>
    </div>
  );
}

/* ── Card 2: Set Your Investment Level ──────────────────────────── */
function Card2() {
  return (
    <div className="w-full rounded-xl overflow-hidden bg-[#f0f0ec] dark:bg-[#0d1f14] border border-[#e5e5e0] dark:border-[#1e3827] px-4 py-4 flex flex-col justify-center gap-3">
      {/* High risk row */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold text-[#001011] dark:text-white">High risk</span>
          <span className="text-[10px] text-[#888888] dark:text-[#5a7a64]">100</span>
        </div>
        <div className="relative h-[6px] bg-[#e0e0da] dark:bg-[#1a2e1e] rounded-full overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-[42%] bg-[#B0D45A] rounded-full" />
        </div>
      </div>

      {/* Cursor hint */}
      <div className="flex items-center gap-1.5">
        <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
          <path d="M1 1l5 13 2.5-4.5L13 7.5 1 1z" fill="#001011" className="dark:fill-white"/>
        </svg>
        <span className="text-[9px] font-medium text-[#888888] dark:text-[#5a7a64] border border-[#d8d8d2] dark:border-[#2a4a34] px-2 py-0.5 rounded-sm bg-white dark:bg-[#132b1a]">Allocate</span>
      </div>

      {/* Low risk row */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold text-[#001011] dark:text-white">Low risk</span>
          <span className="text-[10px] text-[#888888] dark:text-[#5a7a64]">100</span>
        </div>
        <div className="relative h-[6px] bg-[#e0e0da] dark:bg-[#1a2e1e] rounded-full overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-[56%] bg-[#B0D45A] rounded-full" />
        </div>
      </div>
    </div>
  );
}

/* ── Card 3: Copy Trades Automatically ──────────────────────────── */
function Card3() {
  return (
    <div className="w-full rounded-xl overflow-hidden bg-[#f0f0ec] dark:bg-[#0d1f14] border border-[#e5e5e0] dark:border-[#1e3827] px-4 py-4 flex flex-col gap-2.5">
      {/* Profit + Copiers */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-1">
            <span className="text-[18px] font-bold text-[#001011] dark:text-white leading-none">24.96%</span>
            <TrendArrow />
          </div>
          <span className="text-[9px] text-[#888888] dark:text-[#5a7a64] mt-0.5 block">Profit (1M)</span>
        </div>
        <div className="text-right">
          <div className="flex items-center justify-end gap-1">
            <span className="text-[18px] font-bold text-[#001011] dark:text-white leading-none">556</span>
            <TrendArrow />
          </div>
          <span className="text-[9px] text-[#888888] dark:text-[#5a7a64] mt-0.5 block">Copiers</span>
        </div>
      </div>
      {/* Risk level */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-medium text-[#001011] dark:text-white">Risk level:</span>
        <span className="text-[9px] font-semibold px-2.5 py-1 rounded-full bg-[#fee2e2] text-[#dc2626] dark:bg-[#2a1010] dark:text-[#f87171]">Balanced Risk</span>
      </div>
      {/* Copy trader button */}
      <button className="w-full h-8 border border-[#e0e0da] dark:border-[#2a4a34] bg-white dark:bg-[#132b1a] text-[10px] font-bold text-[#001011] dark:text-white rounded-sm">
        Copy trader
      </button>
    </div>
  );
}

/* ── Card 4: Track & Adjust Your Portfolio ───────────────────────── */
function Card4() {
  return (
    <div className="w-full rounded-xl overflow-hidden bg-[#f0f0ec] dark:bg-[#0d1f14] border border-[#e5e5e0] dark:border-[#1e3827] px-4 py-4 flex flex-col gap-2.5">
      {/* Top stats row — faded */}
      <div className="flex items-start justify-between opacity-50">
        <div>
          <p className="text-[13px] font-bold text-[#001011] dark:text-white leading-none">120</p>
          <p className="text-[8.5px] text-[#888888] dark:text-[#5a7a64] mt-0.5">Available balance</p>
        </div>
        <div className="text-right">
          <p className="text-[13px] font-bold text-[#001011] dark:text-white leading-none">0.00</p>
          <p className="text-[8.5px] text-[#888888] dark:text-[#5a7a64] mt-0.5">Margin balance</p>
        </div>
      </div>
      {/* Inner white card */}
      <div className="bg-white dark:bg-[#132b1a] rounded-lg border border-[#e5e5e0] dark:border-[#1e3827] px-3 py-2.5 flex items-center justify-between">
        <div>
          <p className="text-[15px] font-bold text-[#001011] dark:text-white leading-none">120.00</p>
          <p className="text-[8.5px] text-[#888888] dark:text-[#5a7a64] mt-0.5">Total equity (USDT)</p>
        </div>
        {/* Donut chart */}
        <svg width="36" height="36" viewBox="0 0 36 36">
          {/* Full gray track */}
          <circle cx="18" cy="18" r="14" fill="none" stroke="#e0e0da" strokeWidth="6" className="dark:stroke-[#1a2e1e]" />
          {/* Lime segment ~90% */}
          <circle
            cx="18" cy="18" r="14"
            fill="none"
            stroke="#B0D45A"
            strokeWidth="6"
            strokeDasharray="79.2 8.8"
            strokeLinecap="round"
            transform="rotate(-90 18 18)"
          />
        </svg>
      </div>
    </div>
  );
}

/* ── Shared tiny trend-up arrow ─────────────────────────────────── */
function TrendArrow() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" className="shrink-0">
      <polyline points="1,10 4.5,4 8,6.5 11,1" stroke="#22c55e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="8,1 11,1 11,4" stroke="#22c55e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Main section ───────────────────────────────────────────────── */
const steps = [
  {
    illustration: <Card1 />,
    title: "Create Your Account",
    description: "Browse a curated list of top traders with verified performance metrics.",
  },
  {
    illustration: <Card2 />,
    title: "Set Your Investment Amount",
    description: "Choose how much you want to invest and set your risk management preferences.",
  },
  {
    illustration: <Card3 />,
    title: "Choose Strategy",
    description: "Every trade your expert makes is mirrored in your account, in real time.",
  },
  {
    illustration: <Card4 />,
    title: "Track & Grow Your Profits",
    description: "Monitor your investments in real-time and watch your portfolio grow automatically.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full bg-white dark:bg-[#0b1c11]">
      <div className="max-w-[1440px] mx-auto">

        {/* ── Header — centered ── */}
        <div className="text-center px-6 pt-14 pb-12 sm:pt-16 sm:pb-14 lg:pt-20 lg:pb-16">
          <h2 className="text-[26px] sm:text-[38px] lg:text-[52px] font-extrabold text-[#001011] dark:text-white leading-tight">
            How it works
          </h2>
          <p className="mt-4 text-[15px] sm:text-[16px] lg:text-[17px] leading-[1.7] text-[#666666] dark:text-[#8fa896] max-w-[580px] mx-auto">
            Getting started with copy trading is simple. Follow these four easy steps
            to begin your investment journey today.
          </p>
        </div>

        {/* ── Cards row ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-[#e8ead8] dark:border-[#1e3827]">
          {steps.map((step, i) => (
            <div
              key={i}
              className={[
                "px-6 lg:px-8 pt-8 pb-10 flex flex-col gap-6",
                /* right border on all but last per row */
                i < 3 ? "lg:border-r border-[#e8ead8] dark:border-[#1e3827]" : "",
                /* bottom border on first two in 2-col layout */
                i < 2 ? "sm:border-b lg:border-b-0 border-[#e8ead8] dark:border-[#1e3827]" : "",
                /* right border in 2-col layout on odd columns */
                i % 2 === 0 ? "sm:border-r lg:border-r-0 border-[#e8ead8] dark:border-[#1e3827]" : "",
                /* bottom border on mobile for all but last */
                i < steps.length - 1 ? "border-b sm:border-b-0 border-[#e8ead8] dark:border-[#1e3827]" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {step.illustration}
              <div className="flex flex-col gap-2">
                <h3 className="text-[18px] sm:text-[20px] font-extrabold text-[#033F2D] dark:text-[#B0D45A] leading-snug">
                  {step.title}
                </h3>
                <p className="text-[14px] leading-[1.65] text-[#666666] dark:text-[#8fa896]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
