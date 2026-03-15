const features = [
  {
    title: "Transparent Options Copying",
    description:
      "See exactly what you're mirroring—ticker, strategy, side (call/put), strike, expiry, entry/exit premium, size, and timestamps—plus a clear history of each leader's performance and drawdowns. No hidden fees, no black-box trades.",
  },
  {
    title: "Advanced Tools for Contracts",
    description:
      "Dial in risk before you copy: per-trade caps, %-of-equity allocation, max contracts, slippage guard (max premium), chain filters (min OI/volume, max bid-ask spread), and auto-hedge toggles for volatile names.",
  },
  {
    title: "Innovative Execution for Multi-Legs",
    description:
      "Copy simple contracts or complex structures as a unit: verticals, calendars, iron condors, butterflies. We sync legs, preserve ratios, and apply best-effort routing to help reduce mis-fills and legging risk when leaders trade.",
  },
  {
    title: "Trader-Centric Support",
    description:
      "Human help when it matters—real people on chat, phone, and email for account linking, order settings, and contract-specific questions (assignments, exercise, expirations).",
  },
  {
    title: "Learn While You Copy",
    description:
      "Leaders can attach notes, rationale, and risk context (IV, Greeks, catalysts) to each trade. Use strategy tags (breakout, earnings, theta, trend) and post-trade debriefs to sharpen your own playbook while you mirror.",
  },
  {
    title: "Unique Options Features",
    description:
      "AutoGuard™: optional auto-TP/SL by premium, % move, or delta.",
  },
];

export default function WhyChoose() {
  return (
    <section className="w-full bg-[#f9f8f5] dark:bg-[#0b1c11]">
      <div className="max-w-[1440px] mx-auto">

        {/* ── Header — centered ── */}
        <div className="text-center px-6 pt-14 pb-12 sm:pt-16 sm:pb-14 lg:pt-20 lg:pb-16">
          <h2 className="text-[36px] sm:text-[48px] lg:text-[56px] font-extrabold text-[#001011] dark:text-white leading-tight">
            Why choose SignalSync
          </h2>
          <p className="mt-4 text-[15px] sm:text-[16px] lg:text-[17px] leading-[1.7] text-[#666666] dark:text-[#8fa896] max-w-[540px] mx-auto">
            We provide the most advanced copy trading platform with enterprise-grade
            security and lightning-fast execution.
          </p>
        </div>

        {/* ── Features grid 3×2 ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-[#e8ead8] dark:border-[#1e3827]">
          {features.map((f, i) => {
            const isLastInLgRow  = (i % 3) === 2;
            const isFirstLgRow   = i < 3;
            const isLastInSmRow  = (i % 2) === 1;
            const isFirstSmRow   = i < 2;

            return (
              <div
                key={i}
                className={[
                  "flex flex-col items-start text-left px-8 lg:px-12 py-10 lg:py-14",
                  /* mobile bottom border (all but last) */
                  i < features.length - 1 ? "border-b border-[#e8ead8] dark:border-[#1e3827]" : "",
                  /* sm: right border on left col, remove bottom on last row */
                  !isLastInSmRow ? "sm:border-r border-[#e8ead8] dark:border-[#1e3827]" : "sm:border-r-0",
                  isFirstSmRow ? "sm:border-b border-[#e8ead8] dark:border-[#1e3827]" : "",
                  /* lg: right border except last col, bottom border for first row */
                  !isLastInLgRow ? "lg:border-r border-[#e8ead8] dark:border-[#1e3827]" : "lg:border-r-0",
                  isFirstLgRow ? "lg:border-b border-[#e8ead8] dark:border-[#1e3827]" : "lg:border-b-0",
                ].filter(Boolean).join(" ")}
              >
                {/* Icon placeholder — replace src with your SVG file */}
                <div className="mb-6 w-16 h-16">
                  <img src="" alt="" className="w-full h-full object-contain" />
                </div>

                <h3 className="text-[18px] sm:text-[20px] lg:text-[22px] font-extrabold text-[#001011] dark:text-white leading-snug mb-3">
                  {f.title}
                </h3>
                <p className="text-[14px] lg:text-[15px] leading-[1.75] text-[#666666] dark:text-[#8fa896]">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
