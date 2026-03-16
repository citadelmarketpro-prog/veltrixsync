const stats = [
  {
    title: "Social",
    description: "More than 35 million users globally",
    icon: "/icons/people.svg",
  },
  {
    title: "Reliable",
    description: "A leader in the fintech space since 2007",
    icon: "/icons/security-user.svg",
  },
  {
    title: "Secured",
    description: "Utilising best security practices for client money and assets safety",
    icon: "/icons/lock-guard.png",
  },
  {
    title: "Global",
    description: "Providing services around the world",
    icon: "/icons/global.svg",
  },
];

const logos = [
  { src: "/images/institutes/institution-1.png", alt: "J.P.Morgan" },
  { src: "/images/institutes/institution-2.png", alt: "UBP" },
  { src: "/images/institutes/institution-3.png", alt: "Deutsche Bank" },
  { src: "/images/institutes/institution-4.png", alt: "Coutts" },
  { src: "/images/institutes/institution-5.png", alt: "J. Safra Sarasin" },
];

export default function TrustSection() {
  return (
    <section className="w-full bg-white dark:bg-[#0b1c11]">
      <div className="max-w-[1440px] mx-auto">

        {/* ── Centered heading ── */}
        <div className="text-center px-6 pt-14 pb-10 sm:pt-16 sm:pb-12 lg:pt-20 lg:pb-14 border-t border-[#e8ead8] dark:border-[#1e3827]">
          <h2 className="text-[36px] sm:text-[48px] lg:text-[56px] font-extrabold text-[#0a0a0a] dark:text-white leading-tight">
            Your funds are held in top-tier institutions
          </h2>
        </div>

        {/* ── Bank logos row ── */}
        <div className="flex items-center justify-center flex-wrap gap-8 lg:gap-16 px-6 lg:px-[72px] pb-14 lg:pb-16">
          {logos.map((logo) => (
            <img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              className="h-8 sm:h-9 lg:h-10 w-auto object-contain"
            />
          ))}
        </div>

        {/* ── 4 stat cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-6 lg:px-[72px] pb-14 lg:pb-20">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center gap-4 px-6 py-10 border border-[#e8ead8] dark:border-[#1e3827]"
            >
              <div className="w-12 h-12">
                <img src={stat.icon} alt={stat.title} className="w-full h-full object-contain" />
              </div>
              <p className="text-[15px] lg:text-[16px] font-extrabold text-[#0a0a0a] dark:text-white">
                {stat.title}
              </p>
              <p className="text-[13px] lg:text-[14px] leading-[1.7] text-[#888888] dark:text-[#8fa896]">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
