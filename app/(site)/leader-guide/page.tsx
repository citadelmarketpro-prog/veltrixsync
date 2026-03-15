"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReadyToInvest from "@/components/ReadyToInvest";

const NAV_SECTIONS = [
  { id: "leaders-program",         label: "Introduction to Leaders Program" },
  { id: "creating-account",        label: "Creating a Leader account" },
  { id: "performance-stats",       label: "Performance, Stats and Indicators" },
  { id: "payments",                label: "Payments" },
  { id: "trading-terminals",       label: "Trading from MT4, MT5, XOH, ActTrader Terminals" },
  { id: "demo-trading",            label: "Demo Trading" },
  { id: "inappropriate-behaviors", label: "Inappropriate Trading Behaviors" },
  { id: "market-hours",            label: "Market Hours" },
  { id: "suspension",              label: "Suspension" },
];

export default function LeaderGuidePage() {
  const [activeId, setActiveId] = useState("leaders-program");
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

        {/* ── Mobile section nav ── */}
        <div className="lg:hidden sticky top-[80px] z-30 bg-white dark:bg-[#0b1c11] border-b border-[#e5e5e5] dark:border-[#1e3827]">
          <button
            onClick={() => setMobileNavOpen((o) => !o)}
            className="w-full flex items-center justify-between px-6 py-3.5 text-[13px] text-[#001011] dark:text-white"
          >
            <span className="font-medium truncate pr-2">
              {NAV_SECTIONS.find((s) => s.id === activeId)?.label}
            </span>
            <ChevronDownIcon open={mobileNavOpen} />
          </button>

          {mobileNavOpen && (
            <div className="border-t border-[#e5e5e5] dark:border-[#1e3827] bg-white dark:bg-[#0b1c11]">
              {NAV_SECTIONS.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => handleNavClick(e, id)}
                  className={`block px-6 py-3 text-[13px] border-b border-[#e5e5e5] dark:border-[#1e3827] last:border-b-0 transition-colors ${
                    activeId === id
                      ? "bg-[#f2f2ec] dark:bg-[#132b1a] text-[#001011] dark:text-white"
                      : "text-[#555555] dark:text-[#8fa896]"
                  }`}
                >
                  {label}
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="max-w-[1440px] mx-auto px-6 lg:px-[72px] py-10 lg:py-16">
          <div className="flex gap-8 lg:gap-14 items-start">

            {/* ── Sticky Sidebar (desktop only) ── */}
            <aside className="hidden lg:block w-[230px] shrink-0 sticky top-[88px]">
              <div className="border border-[#e5e5e5] dark:border-[#1e3827] rounded-lg overflow-hidden">
                {NAV_SECTIONS.map(({ id, label }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    onClick={(e) => handleNavClick(e, id)}
                    className={`block px-4 py-3.5 text-[13px] leading-snug border-b border-[#e5e5e5] dark:border-[#1e3827] last:border-b-0 transition-colors ${
                      activeId === id
                        ? "bg-[#f2f2ec] dark:bg-[#132b1a] text-[#001011] dark:text-white"
                        : "bg-white dark:bg-[#0b1c11] text-[#555555] dark:text-[#8fa896] hover:bg-[#fafaf8] dark:hover:bg-[#0e1e14] hover:text-[#001011] dark:hover:text-white"
                    }`}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </aside>

            {/* ── Main Content ── */}
            <main className="flex-1 min-w-0 flex flex-col gap-16 pb-4">

              {/* ═══════════════════════════════════
                  1. INTRODUCTION TO LEADERS PROGRAM
              ═══════════════════════════════════ */}
              <section id="leaders-program" className="flex flex-col gap-5 scroll-mt-[136px] lg:scroll-mt-28">
                <SectionHeading>Introduction to Leaders Program</SectionHeading>
                <BodyText>
                  A &quot;Leader&quot; is a VeltrixSync user, who trades on a Real account while VeltrixSync
                  publishes his/her results and statistics publicly through the website. Each trading
                  action performed in the Leader&apos;s account is sent to all VeltrixSync accounts in the
                  form of a broadcast signal. Users, who have chosen to follow the Leader
                  (&quot;Investors&quot;), have the trading action automatically executed in their account,
                  residing in their brokerage firm.
                </BodyText>
                <BodyText>
                  Since a simple Leader signal is executed by various different Brokers that have
                  different trading interfaces and configurations, trading problems can occur. A possible
                  instance is an orphan trade. An orphan trade is a trade that although it is closed in
                  the Leader&apos;s account, due to a variety of reasons, it may be left open on one or more
                  of the Investors&apos; Real accounts. This incident can lead to different results between
                  the Leader and the Investor — e.g. although the Leader gains, the Investor ends up
                  losing as a result of the trade having closed long after it had been closed in the
                  Leader&apos;s account. However, Leaders have the ability to both monitor and close their
                  Real Investors&apos; positions that are detected as &quot;orphans&quot;. Investors can fine-tune and
                  override Leader&apos;s signals by configuring their settings in their VeltrixSync account
                  portfolio, or even manually.
                </BodyText>
                <BodyText>
                  For Risk Management purposes, VeltrixSync may restrict Leaders for being copied by
                  Investors in case they don&apos;t follow the Program&apos;s Guidelines.
                </BodyText>
              </section>

              {/* ═══════════════════════════════════
                  2. CREATING A LEADER ACCOUNT
              ═══════════════════════════════════ */}
              <section id="creating-account" className="flex flex-col gap-5 scroll-mt-[136px] lg:scroll-mt-28">
                <SectionHeading>Creating a Leader account</SectionHeading>
                <LimeBulletList items={["Trading platforms"]} />
              </section>

              {/* ═══════════════════════════════════
                  3. PERFORMANCE, STATS AND INDICATORS
              ═══════════════════════════════════ */}
              <section id="performance-stats" className="flex flex-col gap-5 scroll-mt-[136px] lg:scroll-mt-28">
                <SectionHeading>Performance, Stats and Indicators</SectionHeading>

                <BodyText>
                  As a Leader trades, their performance and position in the VeltrixSync Leaders page will
                  gradually evolve; moving up and down in ranking. All data and information of the
                  Leaders are taken into consideration in order to calculate their place in the ranking.
                  Some decisive factors for the AutoRank are (please note that this list is not
                  exhaustive):
                </BodyText>

                <ul className="flex flex-col gap-3 pl-5 list-disc">
                  {[
                    { label: "Maturity:", text: "How long the Leader has been trading for, reflected in \u2018Weeks\u2019." },
                    { label: "Exposure:", text: "How many positions might be open at the same time, reflected in \u2018Max Open Trades\u2019, the \u2018NME\u2019 required, etc." },
                    { label: "Drawdown:", text: "How many ups and downs the Leader\u2019s historical performance has experienced." },
                    { label: "Performance:", text: "Overall pips earned, average pips per trade and other performance metrics." },
                  ].map((item, i) => (
                    <li key={i} className="text-[14px] leading-[1.8] text-[#444444] dark:text-[#8fa896]">
                      <span className="font-semibold text-[#001011] dark:text-white">{item.label}</span>{" "}
                      {item.text}
                    </li>
                  ))}
                </ul>

                <BodyText>
                  For Our European Performance Page only, the below mentioned factors are also taken
                  into account in order to form the list of the top 2000 Leaders:
                </BodyText>

                <BulletList
                  items={[
                    "Their minimum trading time is at least 8 weeks.",
                    "They have less than 30% Drawdown (in pips or equity)",
                    "The average number of pips is above 3 or average rate of return is above 0.015%.",
                    "If you want to find out more about the way AutoRank is calculated, please click",
                  ]}
                />

                <BodyText>
                  The Performance page is updated several times per day, as trades and Leader&apos;s
                  statistics develop.
                </BodyText>

                <BodyText>
                  Performance page also contains visual indicators, helping Investors to identify
                  certain Leader attributes. Most common of which are:
                </BodyText>

                <BulletList
                  items={[
                    "The Leader is using a Demo Account (For legacy reference only, new accounts cannot use this option).",
                    "The Leader is operating on a Demo Account but is copying his own signals in a Real Investor Account (for legacy reference only, new accounts cannot use this option).",
                    "The Leader is using the MT4, MT5, XOH, ActTrader trading platform.",
                    "The Leader is submitting trading requests through VeltrixSync API.",
                    "The Leader is trading correlated currency pairs, by using a natural hedging strategy that potentially lead to limited drawdown.",
                    "The Leader is frequently trading economic calendar releases!",
                    "Nod Veteran - a Leader that has been trading with VeltrixSync for more than 2 years with a consistently high ranking.",
                    "Leaders that have partially or fully verified their account.",
                    "Trading history from XX/XX/XX To XX/XX/XX has been imported to VeltrixSync.",
                  ]}
                />

                <BodyText>
                  In order to appear in the Leaders page, a Leader must first close 1 position, while
                  a minimum of 8 weeks of trading activity is required in order to appear on the
                  Leaders page for Europe!
                </BodyText>
              </section>

              {/* ═══════════════════════════════════
                  4. PAYMENTS
              ═══════════════════════════════════ */}
              <section id="payments" className="flex flex-col gap-6 scroll-mt-[136px] lg:scroll-mt-28">
                <SectionHeading>Payments</SectionHeading>

                {/* A. General Information */}
                <div className="flex flex-col gap-3">
                  <SubHeading>A. General Information</SubHeading>
                  <BodyText>
                    Leaders&apos; compensation differs according to their Investors account type as well as
                    the Leader&apos;s location in order to comply with local regulation.
                  </BodyText>
                  <BulletList
                    items={[
                      "Volume Based Compensation \u2013 Zero Subscription plan (Default VeltrixSync Investor Account type)",
                      "Volume Based Compensation \u2013 Classic plan (legacy accounts, for reference only)",
                      "Profit Sharing Compensation \u2013 Profit Sharing Accounts (legacy accounts, for reference only)",
                    ]}
                  />
                </div>

                {/* B. Volume Based Compensation */}
                <div className="flex flex-col gap-3">
                  <SubHeading>B. Volume Based Compensation Scheme</SubHeading>
                  <BodyText>
                    Leaders earn for each closed trade executed in a Real Investor account under Volume
                    Based Rules. The 0.5 pip value depends on the lot size executed in the investor&apos;s
                    account, not in the leader&apos;s. For example, the leader opens 1 standard lot and the
                    investor receives 1 lot according to his/her settings, then the leader will get
                    $0.5. In case that the investor only opens a micro lot, then the leader will get
                    $0.05. Pip cost varies according to the currency pair traded.
                  </BodyText>
                </div>

                {/* C. Profit Sharing */}
                <div className="flex flex-col gap-3">
                  <SubHeading>C. Profit Sharing Compensation Scheme (legacy accounts, for reference only)</SubHeading>
                  <BodyText>
                    Leaders get compensated on a monthly basis according to the profits they generate on
                    their Real Investors under Profit Sharing Account Model.
                  </BodyText>
                  <BodyText>
                    Every time you generate a profitable monthly PnL to a Profit-Sharing Investor, you
                    will be credited a 25% Performance Fee. This Fee will only apply for the amount
                    above High Water Mark (&quot;HWM&quot;). HWM is the maximum profit made by the Leader and it
                    is calculated on the 1st calendar day of each month since the Investor added the
                    Leader to his portfolio.
                  </BodyText>
                  <BodyText>
                    For each profitable monthly PnL, the Leader will be compensated based on a 50%
                    Payment-Reserve model. More specifically:
                  </BodyText>
                  <BulletList
                    items={[
                      "50% of the Performance Fee charged is being credited in the Leader\u2019s account. The same amount (50%) is requested from the Reserve bucket. The amount that will be released and credited is limited to the reserved amount generated from previous periods.",
                      "50% of the Performance Fee charged is added to the Leader\u2019s Reserve Bucket for next periods.",
                      "Each Leader holds one Reserve Bucket for all his Profit Sharing Investors. The Reserve amount is updated on the 1st calendar day of each month based on the profits/losses generated on the Real Investor accounts from the Leader during the previous month.",
                    ]}
                  />

                  {/* Case blocks */}
                  <div className="flex flex-col gap-4 mt-1">
                    <CaseBlock title="Case 1: Profitable monthly PnL — Profit above HWM">
                      <BodyText>
                        Investor&apos;s Monthly Performance Fee (20% of the Profit above High Water Mark) is
                        split, as follows:
                      </BodyText>
                      <BulletList
                        items={[
                          "50% is credited in the Leader\u2019s account",
                          "50% is credited from Reserve Bucket (if applicable \u2014 see the example below)",
                          "50% is placed into the Leader\u2019s Reserve Bucket for future release.",
                        ]}
                      />
                    </CaseBlock>

                    <CaseBlock title="Case 2: Negative monthly PnL">
                      <BodyText>
                        In case of underperforming, the Reserve amount will be deducted by 20% of the
                        generated losses.
                      </BodyText>
                    </CaseBlock>

                    <CaseBlock title="Case 3: Recovering Losses Period — Profit below HWM">
                      <BodyText>
                        In case of a Recovering Losses Period, the Performance Fee will not apply, yet
                        the Leader&apos;s reserve will be increased by 20% of the generated Profit.
                      </BodyText>
                    </CaseBlock>
                  </div>

                  {/* Example months */}
                  <BodyText>For example:</BodyText>
                  <div className="flex flex-col gap-5">
                    <MonthBlock month="June">
                      <BodyText>
                        A Leader makes a profit of $1000 — This will be the HWM. The Investor will be
                        charged 25% (20% for the leader, 5% for VeltrixSync) out of the accumulated
                        profit ($1000): $1000 × 25% = $250.
                      </BodyText>
                      <BodyText>
                        Based on the Payment-Reserve Scheme, the 20% for the Leader breaks as follows:
                        50% of the Performance Fee paid by the Investor will be credited in the
                        Leader&apos;s account immediately: $200 × 50% = $100.
                      </BodyText>
                      <BulletList
                        items={[
                          "50% of the Performance Fee paid by the Investor will be credited in the Leader\u2019s account from the Reserve (in case there is an available amount). In this example, there is no Reserve.",
                          "50% of the Performance Fee paid by the Investor will be reserved in the Leader\u2019s Reserve Bucket: $200 \u00d7 50% = $100",
                          "Monthly Reserve Amount = $100",
                          "Total Reserve Amount = $100",
                        ]}
                      />
                    </MonthBlock>

                    <MonthBlock month="July">
                      <BodyText>
                        The Leader has a negative month (−$100) — HWM remains $1000.
                      </BodyText>
                      <BulletList
                        items={[
                          "Performance Fee will not apply for the Investor",
                          "The Leader\u2019s Reserve amount will be deducted by 20% of the losing amount: \u2212$100 \u00d7 20% = \u2212$20.",
                          "Monthly Reserve Amount = \u2212$20",
                          "New Total Reserve Amount = $80 (=$100 \u2212 $20)",
                        ]}
                      />
                    </MonthBlock>

                    <MonthBlock month="August">
                      <BodyText>
                        The Leader makes a profit of $500 — New HWM $1400.
                      </BodyText>
                      <BodyText>
                        The first $100 is considered as Recovering Losses Amount (loss generated in
                        July) and the Investor will not be charged any Performance Fee. However, the
                        Leader&apos;s Reserve amount will be refilled again with the amount of $20 (20%
                        × $100). Performance Fee will apply for the Investor, only for the $400 (amount
                        above new HWM): $400 × 20% = $80.
                      </BodyText>
                      <BodyText>The Leader will now receive:</BodyText>
                      <BulletList
                        items={[
                          "50% of the Investors\u2019 Performance Fee will be credited immediately: $80 \u00d7 50% = $40.",
                          "50% of the Investors\u2019 Performance Fee will be credited from Total Reserve Amount reserved so far: $80 \u00d7 50% = $40",
                          "50% of the Investors\u2019 Performance Fee will be added to Reserve Bucket: $80 \u00d7 50% = $40.",
                          "Monthly Reserve Amount = +$20 (from Recovering Loss Period) + $40 (placed into Reserve bucket) = $60",
                          "New Total Reserve Amount = $100 (=$80 + $20 + $40 \u2212 $40)",
                        ]}
                      />
                    </MonthBlock>
                  </div>
                </div>

                {/* AutoPay Service */}
                <div className="flex flex-col gap-3">
                  <SubHeading>AutoPay Service for Real Leaders (temporarily deactivated, please request withdrawals manually)</SubHeading>
                  <BodyText>
                    Real Leaders may select to receive their total outstanding commissions automatically
                    in their Real Broker account at the 1st business day of each month. To be eligible
                    for the AutoPay Service, Leaders must:
                  </BodyText>
                  <BulletList
                    items={[
                      "Operate on a Real trading account registered in a Broker participating in this Program.",
                      "Have completed the verification process by submitting a valid identification document as well as a proof of address.",
                    ]}
                  />
                  <BodyText>
                    Leaders may enable the AutoPay service on the Revenue page of their account. On the
                    1st business day of each calendar month, they will be receiving automatically the
                    accrued commissions of the previous month directly in their trading account. There
                    are no minimum amount requirements nor fees apply if AutoPay is enabled.
                  </BodyText>
                  <BodyText>Also please take the following under consideration:</BodyText>
                  <BulletList
                    items={[
                      "To submit your request, VeltrixSync needs to be provided with sufficient evidence of the Leader credentials \u2013 typically we require a valid photo ID (passport, government identification card or government issued voter\u2019s card) and a recent formal bill indicating your name and full current residential address.",
                      "Before issuing payments, all trades need to be checked against our Trading Compliance rules and relevant commissions need to be collected from our collaborating Brokers; the estimated time frame required to process a payment after a request has been made via our website is approximately 30 days.",
                      "An active account balance with a minimum of $100 is required before proceeding to request a payment. Please ensure that your bank account details, PayPal account or Crypto Wallet Address is set up properly to avoid any complications with payment.",
                      "The relevant fees for each payment are the following. Bank transfer ($45), PayPal ($20 for 0\u2013$500 transfer and 3.9% for $500 and above), Crypto (network transaction fees).",
                      "The Leaders must at all times fully, promptly, truthfully and transparently communicate with the Investors copying their strategies via Social Pages, as well as the VeltrixSync Traders Community Desk.",
                      "VeltrixSync values the safety of its Investors\u2019 capital as an utmost priority. For this reason, Leaders who apply abusive trading behavior, introducing high risks to their Investors, will be examined carefully and if deemed malicious, they will be refused compensation.",
                      "For each specific calendar month that a Leader presents a negative Total Monthly PnL performance in $, the Leader will not be compensated. Total Monthly PnL includes unrealized PnL deriving from the end of month valuation of the Leader\u2019s open positions.",
                      "Please note that payment must be requested within 30 days of receipt of the termination notification. Payment requests received after this period will be rejected. In case of disabled or terminated accounts, any accrued commissions that fail to reach the threshold of $100 get automatically rejected.",
                      "Accounts with considerable deposits can be characterized from the Broker as Institutional due to the low spread offered. Compensation for such accounts is 0.1 pips per lot executed in a Leader\u2019s account.",
                    ]}
                  />
                </div>
              </section>

              {/* ═══════════════════════════════════
                  5. TRADING FROM MT4/MT5/XOH/ACTTRADER
              ═══════════════════════════════════ */}
              <section id="trading-terminals" className="flex flex-col gap-5 scroll-mt-[136px] lg:scroll-mt-28">
                <SectionHeading>Trading from MT4, MT5, XOH, ActTrader Terminals</SectionHeading>
                <BodyText>
                  In addition to the above rules for Leaders operating on MT4, MT5, XOH, ActTrader
                  terminals and outside of the VeltrixSync web interface, compliance with the following
                  rules is also expected:
                </BodyText>
                <BulletList
                  items={[
                    "Closing partial lots is not supported",
                    "Deleting Stop/Limit via EA (updating Stop/Limit from non-zero values to zero via EA) is not supported and related signals will not be broadcast to Investors.",
                    "We support trading in Forex, CFDs, Indices, Gold and Silver.",
                    "Altering of MT4, MT5, XOH, ActTrader trading records and statistics in any way is strictly prohibited.",
                    "Closing trades via the \u2018Close by\u2019 type is not supported.",
                  ]}
                />
              </section>

              {/* ═══════════════════════════════════
                  6. DEMO TRADING
              ═══════════════════════════════════ */}
              <section id="demo-trading" className="flex flex-col gap-5 scroll-mt-[136px] lg:scroll-mt-28">
                <SectionHeading>Demo Trading (legacy feature, for reference only)</SectionHeading>
                <BodyText>
                  When trading from a Demo account, please make sure your trading strategy complies
                  with the following restrictions:
                </BodyText>
                <BulletList
                  items={[
                    "There is an upper limit of 50 market and 50 pending orders, as well as a limit of 5000 update signals, permitted to be broadcast to Investors within a 24-hour interval.",
                    "Signals to create market/pending orders should have a minimum time interval of 5 seconds from the last one accepted in order to be broadcast to Investors.",
                    "Maximum overall number allowed of open \u2014 market and pending \u2014 orders is limited to 50; any further signals will not be broadcast to Investors.",
                  ]}
                />
                <BodyText>
                  Please note that none of the above restrictions apply to Leaders operating on a Real
                  Account.
                </BodyText>
              </section>

              {/* ═══════════════════════════════════
                  7. INAPPROPRIATE TRADING BEHAVIORS
              ═══════════════════════════════════ */}
              <section id="inappropriate-behaviors" className="flex flex-col gap-5 scroll-mt-[136px] lg:scroll-mt-28">
                <SectionHeading>Inappropriate Trading Behaviors</SectionHeading>
                <BodyText>
                  VeltrixSync values the safety of its Investors&apos; capital as an utmost priority.
                  Consequently, Leaders who apply abusive trading behavior, introducing high risks to
                  their Investors, will be examined carefully and if deemed malicious, they will be
                  refused compensation and may be banned from future use of VeltrixSync&apos;s services.
                  Likewise any attempt to take advantage of their status, extort or even break the
                  communication channel with the community or the company will be deemed as malicious.
                </BodyText>
                <BodyText>
                  In order to avoid extremes, Leaders are required to comply with a minimum set of
                  guidelines that aim to reduce risks, such as:
                </BodyText>
                <BulletList
                  items={[
                    "A Leader\u2019s maximum total draw-down should not exceed their profit in currency or pips. This applies once there is an adequate record of Leader\u2019s performance (6 months).",
                    "VeltrixSync is not endorsing a winning trades ratio close to 100%. It is a potentially risky strategy as it may indicate exposure to unusually large drawdowns.",
                    "Note that the above thresholds in pips are indicative for basic FX pairs. Please assume equivalent amounts for exotic pairs including XAU, XAG or CFDs.",
                  ]}
                />
              </section>

              {/* ═══════════════════════════════════
                  8. MARKET HOURS
              ═══════════════════════════════════ */}
              <section id="market-hours" className="flex flex-col gap-6 scroll-mt-[136px] lg:scroll-mt-28">
                <SectionHeading>Market Hours</SectionHeading>
                <BodyText>
                  No trading should be performed outside of VeltrixSync&apos;s Market Hours. Market Opens
                  Sunday 22:00 UTC and closes Friday 22:00 UTC. When Eastern time is in daylight
                  saving, market opens Sunday 21:00 UTC and closes Friday 21:00 UTC.
                </BodyText>

                <div className="flex flex-col gap-4">
                  <SubHeading>Recommendations for Effective Strategies</SubHeading>

                  {[
                    {
                      n: "1",
                      title: "Scalping is not Recommended",
                      text: "Due to the combination of different trading policies, configuration and rate feeds of various brokers to whom your Investors may subscribe, scalping is not a recommended manner of sending signals to your Investors. The practice frequently leads to very inconsistent results for different broker accounts.",
                    },
                    {
                      n: "2",
                      title: "Trading During News",
                      text: "Many brokerage firms will often reject trading signals during News announcements that affect the market, resulting in possible discrepancies between the execution in your account and your Leader.",
                    },
                    {
                      n: "3",
                      title: "Trading with Unrealistic Amounts of Virtual Funds",
                      text: "Apart from producing unrealistic trading results, no leader will ever be able to relate with your strategy if your starting balance is extremely high, or you trade huge amounts of lots.",
                    },
                    {
                      n: "4",
                      title: "Accurate Strategy descriptions",
                      text: "Your Strategy description needs to be accurate and descriptive, so that your Investors can be aware of what to anticipate from your trading activity. As unexpected trading behavior is not appreciated by your VeltrixSync Investors, any Strategies that are not in accordance with your actual trading behavior will be disapproved, affecting your Compensation or Ranking accordingly.",
                    },
                    {
                      n: "5",
                      title: "Up-to-date Status",
                      text: "Your current Status should always be up to date. Please keep in mind that Investors can request for a Status Update, in which case you will be notified via email and expected to provide a status update as shortly as possible. Awkward silences are not friendly towards your VeltrixSync Investors, so please ensure timely updates are provided.",
                    },
                  ].map((rec) => (
                    <div key={rec.n} className="flex gap-3">
                      <span className="shrink-0 mt-[2px] text-[14px] font-semibold text-[#B0D45A] leading-none">
                        {rec.n}.
                      </span>
                      <div className="flex flex-col gap-1">
                        <p className="text-[14px] font-semibold text-[#001011] dark:text-white leading-snug">
                          {rec.title}
                        </p>
                        <BodyText>{rec.text}</BodyText>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ═══════════════════════════════════
                  9. SUSPENSION
              ═══════════════════════════════════ */}
              <section id="suspension" className="flex flex-col gap-6 scroll-mt-[136px] lg:scroll-mt-28">
                <SectionHeading>Suspension</SectionHeading>
                <BodyText>
                  Suspension of a Leader&apos;s account may occur in two ways: temporarily as a warning, or
                  permanently, leading to prohibition from using the service. Liability for any
                  consequences from a Leader account getting suspended burdens the account holder.
                </BodyText>

                <div className="flex flex-col gap-3">
                  <SubHeading>Temporary Suspension</SubHeading>
                  <BodyText>
                    Leaders linked with MT4, MT5, XOH, ActTrader terminals that violate the Compliance
                    Policy Rules, will be automatically disconnected from their accounts. They can try
                    to re-connect after they have reconfigured their strategy according to the
                    suspension reason.
                  </BodyText>
                </div>

                <div className="flex flex-col gap-3">
                  <SubHeading>Permanent Suspension</SubHeading>
                  <BulletList
                    items={[
                      "Inactive Accounts. A Leader account that has been inactive for more than 1 month will be permanently suspended.",
                      "Leader accounts that receive multiple temporary suspensions.",
                    ]}
                  />
                </div>
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

/* ── Shared primitives ───────────────────────────────────────────── */

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-[28px] lg:text-[34px] font-bold text-[#001011] dark:text-white leading-tight">
        {children}
      </h2>
      <hr className="border-t border-[#e5e5e5] dark:border-[#1e3827]" />
    </div>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[15px] font-semibold text-[#001011] dark:text-white leading-snug">
      {children}
    </h3>
  );
}

function BodyText({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[14px] leading-[1.8] text-[#444444] dark:text-[#8fa896]">{children}</p>
  );
}

function LimeBulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-1.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2">
          <span className="shrink-0 mt-[3px] text-[#B0D45A]">•</span>
          <span className="text-[14px] text-[#B0D45A] leading-snug">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3 pl-5 list-disc">
      {items.map((item, i) => (
        <li key={i} className="text-[14px] leading-[1.8] text-[#444444] dark:text-[#8fa896] marker:text-[#444444] dark:marker:text-[#8fa896]">
          {item}
        </li>
      ))}
    </ul>
  );
}

function CaseBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-[#e5e5e5] dark:border-[#1e3827] bg-[#fafaf8] dark:bg-[#0e1e14] px-5 py-5 flex flex-col gap-3">
      <p className="text-[13px] font-bold text-[#001011] dark:text-white">{title}</p>
      {children}
    </div>
  );
}

function MonthBlock({ month, children }: { month: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-[#eaeadf] dark:bg-[#0d2016] px-5 py-5 flex flex-col gap-3">
      <p className="text-[13px] font-bold text-[#B0D45A] uppercase tracking-wide">{month}</p>
      {children}
    </div>
  );
}

function ChevronDownIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <polyline points="3,6 8,11 13,6" />
    </svg>
  );
}
