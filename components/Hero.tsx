import Image from "next/image";

export default function Hero() {
  return (
    <>
      {/* ════════════════════════════════════════════════════════
          HERO SECTION — fits 100vh on mobile
      ════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-white dark:bg-[#0b1c11] min-h-[calc(100vh-80px)] flex flex-col justify-between">

        {/* ── Dot-matrix texture ── */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/images/hero-bg.png"
            alt=""
            fill
            className="object-cover object-center dark:hidden"
            style={{ opacity: 0.4 }}
            priority
          />
          <Image
            src="/images/hero-bg.png"
            alt=""
            fill
            className="object-cover object-center hidden dark:block"
            style={{ mixBlendMode: "screen", opacity: 0.13 }}
            priority={false}
          />
        </div>

        {/* ── Light mode subtle top gradient ── */}
        <div
          className="absolute inset-x-0 top-0 pointer-events-none dark:hidden"
          style={{
            height: "160px",
            background: "linear-gradient(to bottom, rgba(193,233,99,0.18) 0%, transparent 100%)",
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

          {/* Headline — extra bold, compact on mobile */}
          <h1 className="font-extrabold leading-[1.06] tracking-tight text-[#001011] dark:text-white max-w-[860px] text-[28px] sm:text-[48px] lg:text-[76px]">
            Copy Futures, Options &{" "}
            <span className="block sm:inline">Contracts with Precision</span>
          </h1>

          {/* Subtitle — tighter on mobile */}
          <p className="mt-2 sm:mt-5 lg:mt-6 max-w-200 text-[13px] sm:text-[15px] lg:text-[17px] leading-[1.6] text-[#666666] dark:text-[#8fa896]">
            
            We empower you to mirror real-time stock and options trades from top-performing traders. Whether you&apos;re following tickers, contracts, or strategic options moves, our platform brings precision, flexibility, and transparency—straight to your fingertips
          </p>

          {/* CTA buttons */}
          <div className="mt-5 sm:mt-8 lg:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6 w-full sm:w-auto">
            <button
              className="w-full sm:w-auto inline-flex items-center justify-center h-12 sm:h-[52px] px-8 text-[14px] sm:text-[15px] font-bold transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#C1E963", color: "#001011" }}
            >
              Start Copying Now
            </button>
            <button
              className="w-full sm:w-auto inline-flex items-center justify-center h-12 sm:h-[52px] border border-[#c8d8c0] dark:border-[#2a4a34] px-8 text-[14px] sm:text-[15px] font-medium text-[#001011] hover:opacity-70 transition-opacity"
              style={{ backgroundColor: "#f9fdef" }}
            >
              View expert traders
            </button>
          </div>
        </div>

        {/* ── Video / trader network visual ── */}
        <div className="relative z-10 w-full flex flex-col items-center mt-4 sm:mt-8 lg:mt-10 px-5 lg:px-0">
          <div className="w-full max-w-75 sm:max-w-100 lg:max-w-125 mx-auto">
            {/* Light mode video */}
            <video
              src="/images/banner-video-light.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full dark:hidden"
            />
            {/* Dark mode video */}
            <video
              src="/images/banner-video-dark.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full hidden dark:block"
            />
          </div>

          {/* ── Globally Regulated badge ── */}
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

function FloatingCard({
  name,
  role,
  online,
}: {
  name: string;
  role: string;
  online?: boolean;
}) {
  /* Hero.svg: 134×40px, rx=20, bg #F8F9F6, border 1.5px #FDFDFC */
  return (
    <div
      className="dark:bg-[#132b1a] dark:border-[#1e3827]"
      style={{
        width: "134px",
        height: "40px",
        borderRadius: "20px",
        backgroundColor: "#F8F9F6",
        border: "1.5px solid #FDFDFC",
        display: "flex",
        alignItems: "center",
        paddingLeft: "8px",
        paddingRight: "10px",
        gap: "7px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      }}
    >
      {/* Avatar — bg #F0F1F4 (Hero.svg) */}
      <div
        className="shrink-0 dark:bg-[#1e3827]"
        style={{
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          backgroundColor: "#F0F1F4",
        }}
      />

      {/* Name + role */}
      <div className="flex-1 min-w-0">
        <p
          className="dark:text-white"
          style={{
            fontSize: "9px",
            fontWeight: 700,
            color: "#001011",
            lineHeight: 1.3,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {name}
        </p>
        <p
          className="dark:text-[#8fa896]"
          style={{
            fontSize: "8px",
            color: "#666666",
            lineHeight: 1.3,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {role}
        </p>
      </div>

      {/* Online dot — #00A656 (Hero.svg ellipse) */}
      {online && (
        <div
          className="shrink-0"
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: "#00A656",
          }}
        />
      )}
    </div>
  );
}

/* ── Icons ──────────────────────────────────────────────────── */

/* Trend-up icon — Hero.svg lines 96–97, stroke #219204 */
function TrendUpIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="#219204"
      strokeWidth="1.44"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <polyline points="1,11 5,7 9,9 15,3" />
      <polyline points="11,3 15,3 15,7" />
    </svg>
  );
}

/* Globe with checkmark for "Globally Regulated" */
function GloballyRegulatedIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12">
      <circle cx="14" cy="14" r="11" stroke="#B0D45A" strokeWidth="1.8" />
      <ellipse cx="14" cy="14" rx="5.5" ry="11" stroke="#B0D45A" strokeWidth="1.4" />
      <line x1="3" y1="10" x2="25" y2="10" stroke="#B0D45A" strokeWidth="1.4" />
      <line x1="3" y1="18" x2="25" y2="18" stroke="#B0D45A" strokeWidth="1.4" />
      <circle cx="20" cy="20" r="5" fill="#B0D45A" />
      <path d="M17.5 20l1.5 1.5 3-3" stroke="#001011" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

