"use client";

import { useState } from "react";
import { FadeUp, Stagger, StaggerItem } from "@/components/ScrollReveal";

const faqs = [
  {
    question: "Do I need trading experience?",
    answer:
      "No, copy trading is designed for all experience levels. You simply select a trader to follow and VeltrixSync automatically mirrors their trades in your account—no prior market knowledge required.",
  },
  {
    question: "Can I stop copying anytime?",
    answer:
      "Yes. You can pause or stop copying any trader instantly from your dashboard. Any open positions can be kept, modified, or closed at your own discretion.",
  },
  {
    question: "Is my money safe?",
    answer:
      "Your funds always remain in your own linked brokerage account. VeltrixSync never holds or has direct access to your capital—we only execute trade signals on your behalf.",
  },
  {
    question: "What is the minimum investment?",
    answer:
      "You can start with as little as $100, though we recommend $500+ for better diversification across multiple traders and strategies.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) =>
    setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className="w-full bg-[#f5f5f0] dark:bg-[#0b1c11]">
      <div className="max-w-[1440px] mx-auto">

        {/* ── Centered header ── */}
        <FadeUp className="text-center px-6 pt-14 pb-12 sm:pt-16 sm:pb-14 lg:pt-20 lg:pb-16 border-t border-[#e8ead8] dark:border-[#1e3827]">
          <h2 className="text-[26px] sm:text-[38px] lg:text-[52px] font-extrabold text-[#0a0a0a] dark:text-white leading-tight mb-4">
            Your Questions, answered
          </h2>
          <p className="text-[14px] sm:text-[15px] lg:text-[16px] text-[#888888] dark:text-[#8fa896] leading-[1.7] max-w-[480px] mx-auto">
            Got questions about how copy trading works? We&apos;ve compiled answers to
            the most frequently asked questions.
          </p>
        </FadeUp>

        {/* ── FAQ accordion grid ── */}
        <Stagger className="px-6 lg:px-[72px] pb-14 lg:pb-20 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <StaggerItem
                key={i}
                className={[
                  "overflow-hidden transition-colors duration-200",
                  isOpen
                    ? "bg-[#1a3828] dark:bg-[#1a3828]"
                    : "bg-[#eaeadf] dark:bg-[#0d1f14]",
                ].join(" ")}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-6 text-left"
                >
                  <span
                    className={[
                      "text-[15px] sm:text-[16px] font-semibold leading-snug",
                      isOpen
                        ? "text-white"
                        : "text-[#033F2D] dark:text-[#d0e8d8]",
                    ].join(" ")}
                  >
                    {faq.question}
                  </span>
                  <span
                    className={[
                      "shrink-0 text-[22px] font-light leading-none transition-transform duration-200",
                      isOpen
                        ? "text-white rotate-45"
                        : "text-[#033F2D] dark:text-[#8fa896]",
                    ].join(" ")}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6">
                    <p className="text-[14px] leading-[1.75] text-[#c8dcd2]">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </StaggerItem>
            );
          })}
        </Stagger>

      </div>
    </section>
  );
}
