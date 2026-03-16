"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReadyToInvest from "@/components/ReadyToInvest";

const NAV_SECTIONS = [
  { id: "introduction",         label: "Introduction" },
  { id: "eligibility",          label: "1. Eligibility & Registration" },
  { id: "leader-program",       label: "2. Leader Program" },
  { id: "investor-obligations", label: "3. Investor Obligations" },
  { id: "fees-payments",        label: "4. Fees & Payments" },
  { id: "risk-disclosure",      label: "5. Risk Disclosure" },
  { id: "ip-content",           label: "6. Intellectual Property" },
  { id: "termination",          label: "7. Termination" },
  { id: "governing-law",        label: "8. Governing Law" },
];

export default function TermsPage() {
  const [activeId, setActiveId] = useState("introduction");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id); },
        { rootMargin: "-10% 0px -75% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
    setMobileNavOpen(false);
  };

  return (
    <>
      <Navbar />
      <div className="w-full bg-white dark:bg-[#0b1c11]">

        {/* Mobile nav */}
        <div className="lg:hidden sticky top-[80px] z-30 bg-white dark:bg-[#0b1c11] border-b border-[#e5e5e5] dark:border-[#1e3827]">
          <button
            onClick={() => setMobileNavOpen((o) => !o)}
            className="w-full flex items-center justify-between px-6 py-3.5 text-[13px] text-[#001011] dark:text-white"
          >
            <span className="font-medium truncate pr-2">
              {NAV_SECTIONS.find((s) => s.id === activeId)?.label}
            </span>
            <ChevronDown open={mobileNavOpen} />
          </button>
          {mobileNavOpen && (
            <div className="border-t border-[#e5e5e5] dark:border-[#1e3827] bg-white dark:bg-[#0b1c11]">
              {NAV_SECTIONS.map(({ id, label }) => (
                <a key={id} href={`#${id}`} onClick={(e) => handleNavClick(e, id)}
                  className={`block px-6 py-3 text-[13px] border-b border-[#e5e5e5] dark:border-[#1e3827] last:border-b-0 transition-colors ${activeId === id ? "bg-[#f2f2ec] dark:bg-[#132b1a] text-[#001011] dark:text-white" : "text-[#555555] dark:text-[#8fa896]"}`}>
                  {label}
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="max-w-[1440px] mx-auto px-6 lg:px-[72px] py-10 lg:py-16">
          <div className="flex gap-8 lg:gap-14 items-start">

            {/* Sidebar */}
            <aside className="hidden lg:block w-[230px] shrink-0 sticky top-[88px]">
              <div className="border border-[#e5e5e5] dark:border-[#1e3827] rounded-lg overflow-hidden">
                {NAV_SECTIONS.map(({ id, label }) => (
                  <a key={id} href={`#${id}`} onClick={(e) => handleNavClick(e, id)}
                    className={`block px-4 py-3.5 text-[13px] leading-snug border-b border-[#e5e5e5] dark:border-[#1e3827] last:border-b-0 transition-colors ${activeId === id ? "bg-[#f2f2ec] dark:bg-[#132b1a] text-[#001011] dark:text-white" : "bg-white dark:bg-[#0b1c11] text-[#555555] dark:text-[#8fa896] hover:bg-[#fafaf8] dark:hover:bg-[#0e1e14] hover:text-[#001011] dark:hover:text-white"}`}>
                    {label}
                  </a>
                ))}
              </div>
            </aside>

            {/* Content */}
            <main className="flex-1 min-w-0 flex flex-col gap-16 pb-4">

              <section id="introduction" className="flex flex-col gap-5 scroll-mt-[136px] lg:scroll-mt-28">
                <SectionHeading>Terms of Service</SectionHeading>
                <Body>Last updated: March 2026</Body>
                <Body>
                  These Terms of Service (&quot;Terms&quot;) govern your access to and use of VeltrixSync&apos;s
                  platform, website, mobile applications, and services (collectively, the
                  &quot;Service&quot;). By registering an account or using the Service, you agree to be
                  bound by these Terms. If you do not agree, do not use the Service.
                </Body>
                <Body>
                  VeltrixSync is a social copy-trading platform that connects Investors with Leaders.
                  Investors may choose to copy the trading activity of Leaders they follow. Leaders
                  share their trading strategies and earn commissions when Investors copy them.
                </Body>
                <Body>
                  These Terms apply to all users of the Service, including Investors, Leaders,
                  Affiliates, and visitors. Additional policies referenced herein (Privacy Policy,
                  Risk Disclaimer, etc.) form part of these Terms and are incorporated by reference.
                </Body>
              </section>

              <section id="eligibility" className="flex flex-col gap-5 scroll-mt-[136px] lg:scroll-mt-28">
                <SectionHeading>1. Eligibility &amp; Registration</SectionHeading>
                <Body>
                  To use the Service, you must be at least 18 years old (or the age of legal
                  majority in your jurisdiction, if higher) and have the legal capacity to enter
                  into a binding agreement. By registering, you represent and warrant that:
                </Body>
                <ul className="flex flex-col gap-3 pl-5 list-disc">
                  {[
                    "You meet the minimum age requirement in your jurisdiction.",
                    "You are not located in a jurisdiction where use of the Service is prohibited.",
                    "All registration information you provide is accurate, current, and complete.",
                    "You will keep your account credentials secure and not share them with any third party.",
                    "You are solely responsible for all activity conducted through your account.",
                  ].map((item, i) => <BulletItem key={i}>{item}</BulletItem>)}
                </ul>
                <Body>
                  VeltrixSync reserves the right to refuse registration or suspend any account at
                  its sole discretion, including where it suspects fraudulent, abusive, or
                  non-compliant activity.
                </Body>
              </section>

              <section id="leader-program" className="flex flex-col gap-5 scroll-mt-[136px] lg:scroll-mt-28">
                <SectionHeading>2. Leader Program</SectionHeading>
                <Body>
                  The Leader Program allows verified traders (&quot;Leaders&quot;) to share their trading
                  activity on the platform. Leaders acknowledge and agree that:
                </Body>
                <ul className="flex flex-col gap-3 pl-5 list-disc">
                  {[
                    "Their trading activity is visible to other users and may be copied.",
                    "They must trade in accordance with applicable laws and VeltrixSync's community guidelines.",
                    "They may earn commissions when Investors copy their trades, subject to VeltrixSync's commission structure.",
                    "They must not engage in market manipulation, misleading conduct, or any strategy designed to inflate apparent performance.",
                    "VeltrixSync reserves the right to remove a Leader from the program if they breach these Terms.",
                  ].map((item, i) => <BulletItem key={i}>{item}</BulletItem>)}
                </ul>
              </section>

              <section id="investor-obligations" className="flex flex-col gap-5 scroll-mt-[136px] lg:scroll-mt-28">
                <SectionHeading>3. Investor Obligations</SectionHeading>
                <Body>
                  As an Investor on VeltrixSync, you are responsible for your own investment
                  decisions, including the decision to copy a Leader. By using copy-trading features,
                  you acknowledge that:
                </Body>
                <ul className="flex flex-col gap-3 pl-5 list-disc">
                  {[
                    "Copying a Leader does not guarantee profitable outcomes.",
                    "Past performance of any Leader is not an indication of future results.",
                    "You must set appropriate risk parameters and stop-loss levels for your account.",
                    "VeltrixSync is not liable for losses arising from your decision to copy any Leader.",
                    "You should seek independent financial advice before investing.",
                  ].map((item, i) => <BulletItem key={i}>{item}</BulletItem>)}
                </ul>
              </section>

              <section id="fees-payments" className="flex flex-col gap-5 scroll-mt-[136px] lg:scroll-mt-28">
                <SectionHeading>4. Fees &amp; Payments</SectionHeading>
                <Body>
                  VeltrixSync may charge fees for certain services as described on its website.
                  All applicable fees will be disclosed prior to your agreement. By using paid
                  features, you authorise VeltrixSync to charge the applicable fees to your
                  designated payment method.
                </Body>
                <Body>
                  Leader commissions are calculated and distributed in accordance with the
                  commission structure published on the platform. VeltrixSync reserves the right
                  to modify its fee structure with reasonable notice to users.
                </Body>
              </section>

              <section id="risk-disclosure" className="flex flex-col gap-5 scroll-mt-[136px] lg:scroll-mt-28">
                <SectionHeading>5. Risk Disclosure</SectionHeading>
                <WarningBox>
                  Trading financial instruments involves a high level of risk. You may lose all
                  or part of your invested capital. Copy-trading involves additional risks as
                  detailed in our Risk Disclaimer. You should only invest money you can afford to
                  lose.
                </WarningBox>
                <Body>
                  VeltrixSync does not provide investment advice. Nothing on the platform
                  constitutes a solicitation, recommendation, or endorsement to buy or sell any
                  financial instrument. Please refer to our full Risk Disclaimer for further
                  details.
                </Body>
              </section>

              <section id="ip-content" className="flex flex-col gap-5 scroll-mt-[136px] lg:scroll-mt-28">
                <SectionHeading>6. Intellectual Property</SectionHeading>
                <Body>
                  All content, trademarks, software, and materials on the VeltrixSync platform
                  are owned by or licensed to VeltrixSync and are protected by applicable
                  intellectual property laws. You may not reproduce, distribute, or create
                  derivative works without our express written consent.
                </Body>
                <Body>
                  User-generated content (such as posts, comments, and trade notes) remains the
                  property of the respective user, but by posting it you grant VeltrixSync a
                  non-exclusive, royalty-free licence to use, display, and distribute such content
                  in connection with the Service.
                </Body>
              </section>

              <section id="termination" className="flex flex-col gap-5 scroll-mt-[136px] lg:scroll-mt-28">
                <SectionHeading>7. Termination</SectionHeading>
                <Body>
                  You may close your account at any time by contacting support. VeltrixSync may
                  suspend or terminate your account immediately and without notice if you violate
                  these Terms or if required by applicable law or regulation.
                </Body>
                <Body>
                  Upon termination, your right to access the Service ceases. Provisions that by
                  their nature should survive termination (including risk disclosure, intellectual
                  property, and governing law clauses) shall continue to apply.
                </Body>
              </section>

              <section id="governing-law" className="flex flex-col gap-5 scroll-mt-[136px] lg:scroll-mt-28">
                <SectionHeading>8. Governing Law</SectionHeading>
                <Body>
                  These Terms are governed by the laws of Cyprus. Any disputes arising out of or
                  relating to these Terms or the Service shall be subject to the exclusive
                  jurisdiction of the courts of Cyprus, unless otherwise required by mandatory
                  consumer protection laws in your country of residence.
                </Body>
                <Body>
                  For questions about these Terms, please contact us at{" "}
                  <a href="mailto:support@veltrixsync.com" className="text-[#B0D45A] hover:underline underline-offset-2">
                    support@veltrixsync.com
                  </a>.
                </Body>
              </section>

            </main>
          </div>
        </div>
      </div>
      <ReadyToInvest />
      <Footer />
    </>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-[28px] lg:text-[34px] font-bold text-[#001011] dark:text-white leading-tight">{children}</h2>
      <hr className="border-t border-[#e5e5e5] dark:border-[#1e3827]" />
    </div>
  );
}
function Body({ children }: { children: React.ReactNode }) {
  return <p className="text-[14px] leading-[1.8] text-[#444444] dark:text-[#8fa896]">{children}</p>;
}
function BulletItem({ children }: { children: React.ReactNode }) {
  return <li className="text-[14px] leading-[1.8] text-[#444444] dark:text-[#8fa896] marker:text-[#444444] dark:marker:text-[#8fa896]">{children}</li>;
}
function WarningBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 rounded-xl border border-[#f0c060] dark:border-[#4a3a10] bg-[#fffbeb] dark:bg-[#1e1a08] p-4">
      <span className="shrink-0 text-[18px] leading-none mt-0.5">⚠️</span>
      <p className="text-[13px] leading-[1.75] text-[#7a5a00] dark:text-[#c8b060]">{children}</p>
    </div>
  );
}
function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
      <polyline points="3,6 8,11 13,6" />
    </svg>
  );
}
