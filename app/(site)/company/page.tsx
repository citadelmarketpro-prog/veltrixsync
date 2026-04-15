import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Company",
  description:
    "Learn about Veltrixsync — our mission to make expert-level investing accessible to everyone, our story, values, and the team behind the platform.",
  openGraph: {
    title: "Company | Veltrixsync",
    description:
      "Learn about Veltrixsync — our mission to make expert-level investing accessible to everyone, our story, values, and the team behind the platform.",
    url: "https://veltrixsync.com/company",
  },
  twitter: {
    title: "Company | Veltrixsync",
    description:
      "Learn about Veltrixsync — our mission to make expert-level investing accessible to everyone.",
  },
};

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReadyToInvest from "@/components/ReadyToInvest";

const STATS = [
  { value: "7+",   label: "Years in operation" },
  { value: "118+", label: "Expert Leaders" },
  { value: "10M+", label: "Trades copied" },
  { value: "1M+",  label: "Registered users" },
];

const VALUES = [
  { title: "Transparency",  body: "We believe every investor deserves full visibility into the strategies they follow. Our platform surfaces every trade, stat, and risk metric openly." },
  { title: "Trust",         body: "We are licensed and regulated in multiple jurisdictions. Compliance and security are at the heart of everything we build." },
  { title: "Innovation",    body: "From AutoGuard™ to Smart Portfolio, we constantly invest in tools that give our users a genuine edge in the markets." },
  { title: "Community",     body: "VeltrixSync is built on the idea that the crowd, when properly curated, is smarter than any single investor. We foster a global community of collaborative trading." },
];

export default function CompanyPage() {
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
            About
            <br />
            <span className="text-[#B0D45A]">VeltrixSync</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[14px] lg:text-[15px] leading-[1.8] text-[#444444] dark:text-[#8fa896]">
            VeltrixSync is a leading social copy-trading platform built to make professional
            investing accessible to everyone — regardless of experience or background.
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="w-full bg-[#f7f7f2] dark:bg-[#071612] border-y border-[#e5e5e5] dark:border-[#1e3827]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-[72px] py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 divide-x-0 lg:divide-x divide-[#e5e5e5] dark:divide-[#1e3827]">
            {STATS.map((s) => (
              <div key={s.value} className="flex flex-col items-center gap-1 lg:px-8 text-center">
                <span className="text-[36px] lg:text-[44px] font-black text-[#001011] dark:text-white leading-none">{s.value}</span>
                <span className="text-[12px] text-[#666666] dark:text-[#8fa896]">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="w-full bg-white dark:bg-[#0b1c11]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-[72px] py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
            <h2 className="text-[32px] lg:text-[44px] font-bold leading-[1.1] text-[#001011] dark:text-white">
              Our Mission
            </h2>
            <div className="flex flex-col gap-5">
              <p className="text-[14px] lg:text-[15px] leading-[1.8] text-[#444444] dark:text-[#8fa896]">
                Founded with the vision of democratising access to the financial markets,
                VeltrixSync has grown into one of the world&apos;s most trusted social trading
                platforms. We developed our copy-trading technology from the ground up, so we
                know everything about building and optimising social trading networks.
              </p>
              <p className="text-[14px] lg:text-[15px] leading-[1.8] text-[#444444] dark:text-[#8fa896]">
                Our mission is simple: give every person on the planet the ability to invest
                alongside the best traders in the world, with full transparency and appropriate
                risk controls in place.
              </p>
              <p className="text-[14px] lg:text-[15px] leading-[1.8] text-[#444444] dark:text-[#8fa896]">
                We are authorised and regulated in Cyprus, the United Kingdom, the United States,
                Australia, and the UAE — and we continue to expand our regulatory footprint to
                serve more users globally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="w-full bg-[#f7f7f2] dark:bg-[#071612] border-y border-[#e5e5e5] dark:border-[#1e3827]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-[72px] py-16 lg:py-24">
          <h2 className="text-[28px] lg:text-[40px] font-bold text-[#001011] dark:text-white mb-12">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 divide-y divide-[#e5e5e5] dark:divide-[#1e3827] border border-[#e5e5e5] dark:border-[#1e3827] rounded-2xl overflow-hidden">
            {VALUES.map((v, i) => (
              <div key={i} className={`p-8 lg:p-10 flex flex-col gap-3 bg-white dark:bg-[#0a1a10] ${i % 2 === 0 ? "sm:border-r border-[#e5e5e5] dark:border-[#1e3827]" : ""}`}>
                <h3 className="text-[16px] font-bold text-[#B0D45A]">{v.title}</h3>
                <p className="text-[13px] leading-[1.75] text-[#555555] dark:text-[#8fa896]">{v.body}</p>
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
