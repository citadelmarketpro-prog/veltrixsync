"use client";

import { useState } from "react";
import Link from "next/link";

const navGroups = [
  {
    label: "LEGALS",
    links: [
      { label: "Terms Of Service", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Cookies Policy", href: "#" },
      { label: "Risk Disclaimer", href: "#" },
      { label: "Conflict of Interest Policy", href: "#" },
      { label: "Declaration of Consent", href: "#" },
      { label: "End-User License Agreement", href: "#" },
    ],
  },
  {
    label: "FEATURES",
    links: [
      { label: "AutoGuard™", href: "#" },
      { label: "Copy Trading", href: "#" },
      { label: "Smart Portfolio", href: "#" },
    ],
  },
  {
    label: "RESOURCES",
    links: [
      { label: "Affiliate Guide", href: "#" },
      { label: "Leader Guide", href: "#" },
      { label: "User Guide", href: "#" },
      { label: "Blog", href: "#" },
    ],
  },
  {
    label: "ABOUT US",
    links: [
      { label: "Company", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
    ],
  },
  {
    label: "PARTNERSHIPS",
    links: [
      { label: "Leader", href: "#" },
      { label: "Affiliate", href: "#" },
      { label: "Broker", href: "#" },
    ],
  },
  {
    label: "CONTACT",
    links: [
      { label: "support@signalsync.com", href: "mailto:support@signalsync.com" },
      { label: "+1 (929) 512-0241", href: "tel:+19295120241" },
    ],
  },
];

export default function Footer() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <footer className="w-full bg-white dark:bg-[#0b1c11] border-t border-[#e8ead8] dark:border-[#1e3827]">
      <div className="max-w-[1440px] mx-auto">

        {/* ── Main row: brand left | accordion right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr]">

          {/* ── Brand column ── */}
          <div className="px-6 lg:px-[72px] py-12 lg:py-16 lg:border-r border-[#e8ead8] dark:border-[#1e3827] flex flex-col gap-5">
            <Link href="/" className="inline-flex items-baseline">
              <span className="font-extrabold text-[24px] text-[#0a0a0a] dark:text-white leading-none">
                Signal
              </span>
              <span className="font-extrabold text-[24px] text-[#B0D45A] leading-none">
                sync
              </span>
            </Link>

            <p className="text-[14px] text-[#444444] dark:text-[#8fa896]">
              Copytrade with Signalsync
            </p>

            <div className="flex gap-3">
              <AppStoreBadge />
              <GooglePlayBadge />
            </div>
          </div>

          {/* ── Accordion nav column ── */}
          <div className="flex flex-col">
            {navGroups.map((group, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={i} className="border-t border-[#e8ead8] dark:border-[#1e3827]">
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex items-center justify-between px-6 lg:px-12 py-5 text-left"
                  >
                    <span className="text-[12px] font-bold tracking-[0.12em] text-[#0a0a0a] dark:text-white">
                      {group.label}
                    </span>
                    <span
                      className={[
                        "w-7 h-7 flex items-center justify-center border border-[#c8ccc0] dark:border-[#2a4a34] text-[#0a0a0a] dark:text-white text-[18px] font-light leading-none transition-transform duration-200",
                        isOpen ? "rotate-45" : "",
                      ].join(" ")}
                    >
                      +
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 lg:px-12 pb-5 flex flex-col gap-3">
                      {group.links.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          className="text-[13px] text-[#666666] dark:text-[#8fa896] hover:text-[#0a0a0a] dark:hover:text-white transition-colors"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            {/* bottom border after last item */}
            <div className="border-t border-[#e8ead8] dark:border-[#1e3827]" />
          </div>
        </div>

        {/* ── Disclaimer ── */}
        <div className="px-6 lg:px-[72px] pt-10 pb-6 border-t border-[#e8ead8] dark:border-[#1e3827]">
          <p className="text-[11px] font-bold text-[#333333] dark:text-[#c0d4c8] mb-4">
            Disclaimer
          </p>
          <p className="text-[11px] leading-[1.85] text-[#888888] dark:text-[#5a7060] mb-4">
            SignalSync (Europe) Ltd., a Financial Services Company authorised and regulated by the Cyprus Securities Exchange Commission (CySEC) under the license # 108/10. Registered in Cyprus under Company No. HE 200595. Registered Office: 4 Profiti Ilia Str., Kanika Business Centre, 7th floor, Germasogeia, 4046, Limassol, Cyprus. SignalSync (UK) Ltd, a Financial Services Company authorised and regulated by the Financial Conduct Authority (FCA) under the license FRN 583263. Registered Office: 24th floor, One Canada Square, Canary Wharf, London E14 5AB. SignalSync (USA) Ltd, a financial company authorised and regulated by SEC, CRD 298461. eToro AUS Capital Limited is authorised by the Australian Securities and Investments Commission (ASIC) to provide financial services under Australian Financial Services License 491139. Registered Office: Level 3, 60 Castlereagh Street, Sydney NSW 2000, Australia. SignalSync (ME) Limited, is licensed and regulated by the Abu Dhabi Global Market (&ldquo;ADGM&rdquo;)&apos;s Financial Services Regulatory Authority (&ldquo;FSRA&rdquo;) as an Authorised Person to conduct the Regulated Activities of (a) Dealing in Investments as Principal (Matched), (b) Arranging Deals in Investments, (c) Providing Custody, (d) Arranging Custody and (e) Managing Assets (under Financial Services Permission Number 220073) under the Financial Services and Market Regulations 2015 (&ldquo;FSMR&rdquo;). Its registered office and its principal place of business is at Office 207 and 208, 15th Floor Floor, Al Sarab Tower, ADGM Square, Al Maryah Island, Abu Dhabi, United Arab Emirates (&ldquo;UAE&rdquo;). Clients who are tax residents of Finland may be subject to Finnish income taxes on income (profits) and assets in accordance with applicable Finnish tax laws.
          </p>
          <p className="text-[11px] leading-[1.85] text-[#888888] dark:text-[#5a7060]">
            Past performance is not an indication of future results. You should seek advice from an independent and suitably licensed financial advisor and ensure that you have the risk appetite, relevant experience and knowledge before you decide to trade. Under no circumstances shall SignalSync have any liability to any person or entity for any direct, indirect, special, consequential or incidental damages whatsoever. Stock and options investments are risky and do not benefit from the protections available to clients receiving MiFID regulated investment services for dispute resolution. Trading with SignalSync by following and/or copying or replicating the trades of other traders involves a high level of risks, even when following and/or copying or replicating the top-performing traders. Such risks includes the risk that you may be following/copying the trading decisions of possibly inexperienced/unprofessional traders, or traders whose ultimate purpose or intention, or financial status may differ from yours. Past performance of a SignalSync Community Member is not a reliable indicator of his future performance. Content on SignalSync&apos;s social trading platform is generated by members of its community and does not contain advice or recommendations by or on behalf of SignalSync- Your Social Investment Network.
          </p>
        </div>

        {/* ── Copyright ── */}
        <div className="px-6 lg:px-[72px] py-5 border-t border-[#e8ead8] dark:border-[#1e3827]">
          <p className="text-[12px] text-[#888888] dark:text-[#5a7060]">
            Copyright &copy; 2006-2026 SignalSync - Your Social Investment Network, All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}

/* ── App Store badge ─────────────────────────────────────────────── */
function AppStoreBadge() {
  return (
    <div className="inline-flex items-center gap-2 h-10 px-3 bg-[#0a0a0a] cursor-pointer hover:opacity-80 transition-opacity">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
      <div className="flex flex-col">
        <span className="text-[8px] text-[#aaaaaa] leading-none">Download on the</span>
        <span className="text-[11px] font-semibold text-white leading-tight">App Store</span>
      </div>
    </div>
  );
}

/* ── Google Play badge ───────────────────────────────────────────── */
function GooglePlayBadge() {
  return (
    <div className="inline-flex items-center gap-2 h-10 px-3 bg-[#0a0a0a] cursor-pointer hover:opacity-80 transition-opacity">
      <svg width="13" height="15" viewBox="0 0 13 15" fill="none">
        <path d="M0.5 1.07a1 1 0 0 1 1.5-.87l10 7a1 1 0 0 1 0 1.6l-10 7a1 1 0 0 1-1.5-.87V1.07z" fill="#EA4335" />
        <path d="M0.5 1.07L7.2 7.5 0.5 13.93V1.07z" fill="#FBBC04" />
        <path d="M7.2 7.5l4.8 3.37L0.5 13.93 7.2 7.5z" fill="#34A853" />
        <path d="M0.5 1.07l10 6.43-4.8 3.37L0.5 1.07z" fill="#4285F4" />
      </svg>
      <div className="flex flex-col">
        <span className="text-[8px] text-[#aaaaaa] leading-none">GET IT ON</span>
        <span className="text-[11px] font-semibold text-white leading-tight">Google Play</span>
      </div>
    </div>
  );
}
