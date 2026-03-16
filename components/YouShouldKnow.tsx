export default function YouShouldKnow() {
  return (
    <section className="w-full bg-[#f5f5f0] dark:bg-[#0d1a10]">
      <div className="max-w-[1440px] mx-auto">

        {/* ── Full-width heading — centered, same size as How it works ── */}
        <div className="text-center px-6 pt-14 pb-12 sm:pt-16 sm:pb-14 lg:pt-20 lg:pb-16">
          <h2 className="text-[26px] sm:text-[38px] lg:text-[52px] font-extrabold text-[#001011] dark:text-white leading-tight">
            You should know...
          </h2>
        </div>

        {/* ── Two-column cards ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-b border-[#e0e0d8] dark:border-[#1e3827]">

          {/* Left — Problem */}
          <div className="px-6 lg:px-[72px] py-12 lg:py-16 flex flex-col gap-6
            border-b lg:border-b-0 lg:border-r border-[#e0e0d8] dark:border-[#1e3827]">
            <h3 className="text-[20px] sm:text-[22px] lg:text-[24px] font-extrabold text-[#001011] dark:text-white leading-snug">
              Studying the market takes time
            </h3>
            <p className="text-[14px] sm:text-[15px] text-[#666666] dark:text-[#8fa896] leading-[1.75]">
              Building and maintaining a trading strategy is hard. Options require
              timing, strategy, and discipline. Only 11–26% of manual investors
              succeed on their own. With VeltrixSync, you can replicate successful
              trades from seasoned options traders to tilt the odds in your favor.
            </p>
          </div>

          {/* Right — Solution */}
          <div className="px-6 lg:px-[72px] py-12 lg:py-16 flex flex-col gap-6">
            <h3 className="text-[20px] sm:text-[22px] lg:text-[24px] font-extrabold text-[#001011] dark:text-white leading-snug">
              Beat the odds with Copy Trading
            </h3>
            <p className="text-[14px] sm:text-[15px] text-[#666666] dark:text-[#8fa896] leading-[1.75]">
              Proven Success Rate. Over 73% of investors generate profits by copying
              top leaders—especially in dynamic options markets.
            </p>
            <div>
              <button
                className="inline-flex items-center justify-center h-[48px] px-8 text-[14px] font-bold text-[#001011] transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#C1E963" }}
              >
                Start copy trading
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
