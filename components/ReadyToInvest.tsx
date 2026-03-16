import Link from "next/link";

const steps = [
  {
    title: "Create Your Account.",
    description: "Join now to unlock options-focused copy trading.",
    icon: "/icons/man.svg",
  },
  {
    title: "Find Your Match",
    description:
      "Explore leaders known for success in options—contracts, spreads, tickers—you name it.",
    icon: "/icons/crown.svg",
  },
  {
    title: "Copy and grow",
    description:
      "Replicate trades, refine strategies, and learn—all while staying in control.",
    icon: "/icons/chart.svg",
  },
];

export default function ReadyToInvest() {
  return (
    <section className="w-full bg-white dark:bg-[#0b1c11]">
      <div className="max-w-[1440px] mx-auto">

        {/* ── Centered heading ── */}
        <div className="text-center px-6 pt-14 pb-12 sm:pt-16 sm:pb-14 lg:pt-20 lg:pb-16 border-t border-[#e8ead8] dark:border-[#1e3827]">
          <h2 className="text-[26px] sm:text-[38px] lg:text-[52px] font-extrabold text-[#033F2D] dark:text-white leading-tight">
            Ready to Invest Smarter?
          </h2>
        </div>

        {/* ── 3 step cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-6 lg:px-[72px]">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center px-8 py-12 lg:py-16 bg-[#eaeadf] dark:bg-[#0d1f14]"
            >
              <div className="mb-8 w-12 h-12">
                <img src={step.icon} alt="" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-[18px] sm:text-[20px] lg:text-[22px] font-extrabold text-[#033F2D] dark:text-white leading-snug mb-4">
                {step.title}
              </h3>
              <p className="text-[14px] lg:text-[15px] leading-[1.75] text-[#445544] dark:text-[#8fa896]">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* ── CTA button ── */}
        <div className="flex justify-center px-6 pt-12 pb-14 lg:pt-14 lg:pb-20">
          <Link
            href="/sign-up"
            className="inline-flex items-center gap-2 h-12 px-8 text-[14px] font-bold text-[#001011] transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#C1E963" }}
          >
            Get started now →
          </Link>
        </div>

      </div>
    </section>
  );
}
