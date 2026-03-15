const items = [
  {
    title: "Stocks & ETFs",
    description:
      "Full-share orders or fractional allocations, instantaneous entry/exit mirroring, price-based T/P and S/L.",
  },
  {
    title: "Single-Leg Options (Calls & Puts)",
    description:
      "Replicate trade by trade: ticker, strike, expiry, premium, quantity, and timestamp.",
  },
  {
    title: "Multi-Leg Options Strategies",
    description:
      "Copy complex structures as a single unit: verticals, iron condors, butterflies, calendars, ratio spreads, etc. We preserve leg ratios and leg timing to reduce legging risk.",
  },
];

export default function WhatYouCanCopy() {
  return (
    <section className="w-full bg-white dark:bg-[#0b1c11]">
      <div className="max-w-[1440px] mx-auto">

        {/* ── Header — centered ── */}
        <div className="text-center px-6 pt-14 pb-12 sm:pt-16 sm:pb-14 lg:pt-20 lg:pb-16 border-t border-[#e8ead8] dark:border-[#1e3827]">
          <h2 className="text-[36px] sm:text-[48px] lg:text-[56px] font-extrabold text-[#033F2D] dark:text-white leading-tight">
            What you can copy
          </h2>
        </div>

        {/* ── Three cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-6 lg:px-[72px] pb-14 lg:pb-20">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center px-8 py-12 lg:py-16 bg-[#eaeadf] dark:bg-[#0d1f14]"
            >
              {/* Icon placeholder — replace src with your SVG file */}
              <div className="mb-8 w-12 h-12">
                <img src="" alt="" className="w-full h-full object-contain" />
              </div>

              <h3 className="text-[18px] sm:text-[20px] lg:text-[22px] font-extrabold text-[#033F2D] dark:text-white leading-snug mb-4">
                {item.title}
              </h3>
              <p className="text-[14px] lg:text-[15px] leading-[1.75] text-[#445544] dark:text-[#8fa896]">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
