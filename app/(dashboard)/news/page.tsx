"use client";

import { useState, useRef } from "react";
import DashNav from "@/components/DashNav";

/* ══════════════════════════════════════════════════════════════
   TYPES
══════════════════════════════════════════════════════════════ */

type Category = "All" | "Crypto" | "Stocks" | "Forex" | "Commodities" | "Tech" | "ETF" | "Macro";
type Impact = "positive" | "negative" | "neutral";

interface NewsArticle {
  id: number;
  category: Category;
  breaking: boolean;
  headline: string;
  excerpt: string;
  body: string[];
  source: string;
  sourceInitials: string;
  sourceColor: string;
  time: string;
  readTime: string;
  impact: Impact;
  change: string;
  assets: string[];
  quote?: string;
  quoteAuthor?: string;
}

/* ══════════════════════════════════════════════════════════════
   STATIC DATA
══════════════════════════════════════════════════════════════ */

const CATEGORY_META: Record<string, { color: string; bg: string; darkBg: string; darkColor: string }> = {
  Crypto:      { color: "#7c3aed", bg: "#f3eeff", darkBg: "#1a0d2e", darkColor: "#a78bfa" },
  Stocks:      { color: "#2563eb", bg: "#eff6ff", darkBg: "#0d1a2e", darkColor: "#60a5fa" },
  Forex:       { color: "#059669", bg: "#ecfdf5", darkBg: "#0a1e14", darkColor: "#34d399" },
  Commodities: { color: "#d97706", bg: "#fffbeb", darkBg: "#1e1208", darkColor: "#fbbf24" },
  Tech:        { color: "#0891b2", bg: "#ecfeff", darkBg: "#081820", darkColor: "#22d3ee" },
  ETF:         { color: "#be185d", bg: "#fdf2f8", darkBg: "#1e0812", darkColor: "#f472b6" },
  Macro:       { color: "#4a7a6a", bg: "#f0faf5", darkBg: "#0a1e14", darkColor: "#6fcf97" },
};

const NEWS: NewsArticle[] = [
  {
    id: 1,
    category: "Crypto",
    breaking: true,
    headline: "Bitcoin Surges Past $98,000 as Institutional Demand Hits Record Highs",
    excerpt: "BTC breaks through a critical resistance level as BlackRock and Fidelity ETFs record their biggest single-day inflows since launch.",
    body: [
      "Bitcoin climbed past $98,000 on Thursday, marking its highest level in over three months and reigniting optimism among long-term holders who had been waiting for a decisive breakout above the key $95K resistance band.",
      "The rally was largely fueled by an unprecedented surge in institutional demand. BlackRock's IBIT and Fidelity's FBTC exchange-traded funds collectively recorded net inflows of $847 million in a single trading session — their biggest combined day since launching in January 2024.",
      "On-chain analysts pointed to a notable decline in exchange reserves as a confirming signal: over 28,000 BTC were withdrawn from major centralized exchanges in the past 48 hours, suggesting buyers are moving assets into cold storage rather than preparing to sell.",
      "Macro tailwinds also played a role. The latest Fed minutes, released Wednesday, reinforced market expectations of at least one rate cut before year-end, weakening the dollar index and boosting risk assets broadly — from equities to digital assets.",
      "Market technicians are now eyeing the psychological $100,000 level as the next major target, while derivatives data shows a sharp increase in leveraged long positions. Some analysts caution that the funding rate is approaching levels historically associated with short-term pullbacks.",
    ],
    source: "CoinDesk",
    sourceInitials: "CD",
    sourceColor: "#7c3aed",
    time: "42 min ago",
    readTime: "4 min read",
    impact: "positive",
    change: "+7.34%",
    assets: ["BTC", "ETH", "IBIT"],
    quote: "We are witnessing a structural shift in how institutions view Bitcoin as a treasury asset.",
    quoteAuthor: "Cathie Wood, ARK Invest",
  },
  {
    id: 2,
    category: "Stocks",
    breaking: true,
    headline: "NVIDIA Posts Record $35B Quarter, Raises Full-Year Guidance on AI Chip Boom",
    excerpt: "Jensen Huang's AI empire continues to defy gravity — data center revenue tripled year-over-year as hyperscalers ramp Blackwell GPU orders.",
    body: [
      "NVIDIA reported quarterly revenue of $35.1 billion for its fiscal Q3, smashing Wall Street's consensus estimate of $32.5 billion and marking the fifth consecutive quarter of record-breaking results. Shares jumped 9.2% in after-hours trading.",
      "Data center revenue, which now constitutes 87% of total sales, came in at $30.8 billion — more than triple the same period a year ago. The surge was driven by explosive demand for the company's new Blackwell GPU architecture, which customers like Microsoft, Google, and Amazon have been ordering at scale.",
      "CEO Jensen Huang described supply constraints as the primary bottleneck. 'Demand for Blackwell is staggering,' Huang said on the earnings call. 'We are working around the clock with our manufacturing partners to ramp production as fast as physically possible.'",
      "The company raised its fiscal year revenue guidance to $129 billion, up from the prior guidance of $122 billion. Gross margins held at 74.6%, slightly above analyst projections, allaying concerns about margin compression as Blackwell ramps up.",
      "Competitors AMD and Intel saw their shares dip on the news, as investors interpreted NVIDIA's dominance as evidence that the competitive landscape in AI accelerators remains firmly in Jensen's favor for the foreseeable future.",
    ],
    source: "Bloomberg",
    sourceInitials: "BB",
    sourceColor: "#2563eb",
    time: "1 hr ago",
    readTime: "5 min read",
    impact: "positive",
    change: "+9.21%",
    assets: ["NVDA", "AMD", "INTC"],
    quote: "Demand for Blackwell is staggering. We're working around the clock to ramp production.",
    quoteAuthor: "Jensen Huang, NVIDIA CEO",
  },
  {
    id: 3,
    category: "Forex",
    breaking: false,
    headline: "Dollar Weakens as Fed Officials Signal Patience on Rate Path",
    excerpt: "The DXY slipped 0.6% after multiple Fed speakers tempered expectations of near-term rate hikes, boosting EUR/USD back above 1.09.",
    body: [
      "The US Dollar Index (DXY) fell 0.61% on Thursday after three Federal Reserve officials made comments suggesting the central bank is in no rush to raise interest rates further, even as inflation data remains modestly above target.",
      "EUR/USD climbed back above the 1.0900 handle for the first time in two weeks, while GBP/USD pushed toward 1.2750 as sterling benefited from broad dollar weakness and better-than-expected UK retail sales figures.",
      "Fed Governor Christopher Waller, speaking at a financial conference in Washington, said the Fed 'can afford to be patient' as policy is 'already in restrictive territory.' His remarks echoed similar sentiments from Fed Vice Chair Philip Jefferson earlier in the week.",
      "Currency strategists at Goldman Sachs revised their 3-month EUR/USD target upward to 1.10, citing a combination of dollar softness and improving eurozone economic momentum. The pair has traded in a tight range between 1.07 and 1.09 for most of the past six months.",
      "USD/JPY edged lower toward 152.80, remaining below the 153 level that Japanese authorities have repeatedly flagged as a threshold warranting intervention. Traders remain cautious given Tokyo's history of unannounced currency operations.",
    ],
    source: "Reuters",
    sourceInitials: "RT",
    sourceColor: "#059669",
    time: "2 hr ago",
    readTime: "3 min read",
    impact: "negative",
    change: "-0.61%",
    assets: ["EUR/USD", "GBP/USD", "DXY"],
  },
  {
    id: 4,
    category: "Crypto",
    breaking: false,
    headline: "Ethereum ETF Sees $420M Inflows in a Single Day — Largest Since Launch",
    excerpt: "Spot Ethereum ETFs are finally gaining traction, with Grayscale's ETHE seeing its first week of net positive flows since converting from a trust.",
    body: [
      "Spot Ethereum ETFs recorded their largest ever single-day inflow of $420 million on Wednesday, signaling a meaningful shift in institutional sentiment toward the second-largest cryptocurrency by market cap.",
      "BlackRock's ETHA led the pack with $186 million in net new assets, followed by Fidelity's FETH at $112 million. Even Grayscale's ETHE — which had seen persistent outflows since converting from a trust — posted net inflows for the first time in several weeks.",
      "ETH prices responded by rallying roughly 5.8% to trade above $3,800, its highest level in six weeks. Options market data shows a surge in call buying at the $4,000 and $4,500 strike prices for end-of-year expiry contracts.",
      "Analysts attribute the renewed interest partly to Bitcoin's own ETF momentum creating a halo effect, and partly to growing institutional understanding of Ethereum's role as the backbone of decentralized finance and stablecoin settlement.",
      "The Ethereum network also processed a record $42 billion in stablecoin transfers over the trailing 30 days, underscoring the asset's real-world utility and providing a fundamental narrative to accompany the price action.",
    ],
    source: "The Block",
    sourceInitials: "TB",
    sourceColor: "#7c3aed",
    time: "3 hr ago",
    readTime: "4 min read",
    impact: "positive",
    change: "+5.82%",
    assets: ["ETH", "ETHA", "ETHE"],
    quote: "The Ethereum ETF story is just getting started. Institutions are finally doing their homework.",
    quoteAuthor: "Analyst, Galaxy Digital",
  },
  {
    id: 5,
    category: "Stocks",
    breaking: false,
    headline: "Tesla Cuts Model Y Price Again in Europe Amid Inventory Build-Up",
    excerpt: "The EV maker reduces prices by up to €4,000 across several European markets as competition from BYD and local brands intensifies.",
    body: [
      "Tesla announced a fresh round of price cuts for the Model Y in Germany, France, and the Netherlands, reducing prices by €2,000 to €4,000 depending on the variant. The move comes as the company faces mounting inventory pressure in key European markets.",
      "The cuts are the fourth in 18 months across Europe and signal that demand has not fully recovered following earlier price reductions. European EV registrations data shows Tesla's market share slipping from 18% to 13% over the past year as domestic brands like Volkswagen and Renault roll out competitive electric models.",
      "Chinese rival BYD has also been making aggressive inroads, with several models priced thousands of euros below comparable Tesla offerings. The competitive pressure has forced Tesla into a margin-compressing pricing cycle that Wall Street analysts have flagged as a concern.",
      "Tesla shares fell 3.4% on the news, extending a year-to-date decline of roughly 14%. Bulls argue the company's robotaxi and energy storage businesses represent significant long-term upside, while bears cite weakening automotive margins as a key risk.",
      "CFO Vaibhav Taneja maintained on the last earnings call that the company prioritizes volume over margin in the short term to preserve its cost leadership position, a strategy that has divided opinion among investors.",
    ],
    source: "Financial Times",
    sourceInitials: "FT",
    sourceColor: "#2563eb",
    time: "4 hr ago",
    readTime: "4 min read",
    impact: "negative",
    change: "-3.41%",
    assets: ["TSLA", "BYD", "RIVN"],
  },
  {
    id: 6,
    category: "Commodities",
    breaking: false,
    headline: "Gold Touches $2,680 as Geopolitical Risk Spikes and Dollar Softens",
    excerpt: "Spot gold climbed to a two-week high as safe-haven demand accelerated, with central bank buying providing a structural floor.",
    body: [
      "Gold rose to $2,680 per ounce on Thursday, its highest level in two weeks, as a combination of safe-haven demand, dollar weakness, and persistent central bank buying provided upward momentum for the precious metal.",
      "Geopolitical tensions in the Middle East escalated overnight, prompting investors to rotate into traditional safe-haven assets. Gold, along with US Treasuries and the Japanese yen, saw inflows as risk appetite waned.",
      "Central banks have remained significant buyers this year. The World Gold Council reported that central bank purchases reached 187 tonnes in Q3 alone, with Poland, India, and Turkey among the most active buyers as they diversify reserves away from US dollar exposure.",
      "Silver also advanced, rising 2.1% to trade at $31.80 per ounce, while platinum gained 1.4%. The broader precious metals complex benefited from the same macro tailwinds driving gold higher.",
      "From a technical standpoint, gold has held above the key $2,600 support level despite several tests over the past two months. Analysts at Citi maintain a year-end target of $2,750, citing continued central bank demand and the prospect of Fed rate cuts as key catalysts.",
    ],
    source: "Kitco",
    sourceInitials: "KC",
    sourceColor: "#d97706",
    time: "5 hr ago",
    readTime: "3 min read",
    impact: "positive",
    change: "+1.24%",
    assets: ["XAUUSD", "GLD", "XAGUSD"],
    quote: "Gold is reasserting its role as the world's premier store of value against a backdrop of fiscal instability.",
    quoteAuthor: "Nicky Shiels, MKS PAMP",
  },
  {
    id: 7,
    category: "Tech",
    breaking: false,
    headline: "Apple Intelligence Drives iPhone Upgrade Supercycle Thesis — Analysts Upgrade AAPL",
    excerpt: "Three major banks raise price targets on Apple stock as survey data suggests a significant share of iPhone users plan to upgrade for AI features.",
    body: [
      "Apple received three analyst upgrades on Thursday, as Wall Street increasingly buys into the thesis that Apple Intelligence — the company's suite of on-device AI features — will trigger the largest iPhone upgrade cycle since 5G.",
      "Morgan Stanley raised its price target to $275, citing proprietary survey data showing that 42% of existing iPhone users on models older than 2 years intend to upgrade specifically for AI features. Wedbush Securities echoed the optimism, lifting its target to $300 and calling Apple the 'most underappreciated AI play in big tech.'",
      "The features in question — including a personalized Siri with deep app integration, AI-powered writing tools, and priority notification summaries — require the A17 Pro chip or later, creating a natural hardware upgrade driver for the company's installed base of over 1.2 billion active devices.",
      "Apple shares climbed 2.8% to $231 on the news, outperforming the broader tech sector. The company's services revenue, which reached $24.2 billion last quarter, continues to grow at double digits and provides a resilient earnings buffer even during hardware upgrade lulls.",
      "Critics note that Apple Intelligence features have faced mixed reviews in early testing, with some users reporting disappointment relative to the hype. Execution risk remains, particularly as the company expands the rollout to international markets where regulatory hurdles could delay availability.",
    ],
    source: "CNBC",
    sourceInitials: "CN",
    sourceColor: "#0891b2",
    time: "6 hr ago",
    readTime: "5 min read",
    impact: "positive",
    change: "+2.84%",
    assets: ["AAPL", "MSFT", "GOOGL"],
    quote: "Apple is the most underappreciated AI play in big tech. The installed base monetization story is just beginning.",
    quoteAuthor: "Dan Ives, Wedbush Securities",
  },
  {
    id: 8,
    category: "Macro",
    breaking: false,
    headline: "US CPI Cools to 2.6% — Markets Price In December Fed Cut",
    excerpt: "Headline inflation came in below expectations for the second straight month, cementing expectations for a 25bps rate reduction before year-end.",
    body: [
      "US Consumer Price Index data for October showed headline inflation easing to 2.6% year-over-year, down from 2.9% in September and below the consensus estimate of 2.8%. Core CPI, which excludes food and energy, also softened to 3.2%.",
      "The report immediately shifted rate expectations. CME FedWatch data showed the probability of a 25 basis point cut at the December FOMC meeting jumping from 62% to 84% within minutes of the data release, as traders recalibrated their models.",
      "Treasury yields fell sharply across the curve. The 10-year yield dropped 12 basis points to 4.31%, its lowest level in six weeks, while the 2-year yield fell 9 basis points to 4.18%. The yield curve inversion narrowed further.",
      "Equity markets rallied on the data. The S&P 500 gained 1.4% and the Nasdaq surged 1.9% as growth and tech stocks, which are particularly sensitive to rate expectations, led the charge. Small-cap stocks in the Russell 2000 outperformed, rising 2.3%.",
      "Economists caution that two months of softer prints do not necessarily mark a sustained trend. Services inflation, a stickier component, remains elevated at 4.8% year-over-year, and the labor market continues to show resilience that could complicate the Fed's easing path heading into 2025.",
    ],
    source: "WSJ",
    sourceInitials: "WS",
    sourceColor: "#4a7a6a",
    time: "8 hr ago",
    readTime: "4 min read",
    impact: "positive",
    change: "-12bps",
    assets: ["SPY", "QQQ", "TLT"],
  },
  {
    id: 9,
    category: "Stocks",
    breaking: false,
    headline: "Uniper SE Shares Plummet -76.8% After Surprise Nationalization Announcement",
    excerpt: "German energy giant's stock goes into freefall after the government announces full nationalization to prevent a systemic collapse in Europe's gas supply.",
    body: [
      "Shares of Uniper SE collapsed 76.8% in Frankfurt trading after the German government announced it would fully nationalize the energy company, wiping out existing shareholders in a move designed to prevent a cascading crisis in European natural gas supply.",
      "The nationalization, valued at approximately €8 billion, came after Uniper disclosed losses exceeding €12 billion stemming from its inability to fulfill long-term gas supply contracts following the disruption of Russian pipeline flows. The company had been purchasing replacement gas at spot market prices far above its fixed-price contract commitments.",
      "Economy Minister Robert Habeck called the decision 'unavoidable' to protect Germany's energy security, adding that the government had no interest in operating an energy company long-term and would seek to return Uniper to private ownership once the crisis stabilized.",
      "European energy stocks broadly declined on the news, with fears spreading about the financial health of other utilities with similar exposure to Russian gas contract disruptions. Fortum, Uniper's Finnish parent company which owns a 78% stake, saw its shares drop 27%.",
      "The episode highlights the systemic risks embedded in Europe's energy infrastructure following the geopolitical realignment triggered by the war in Ukraine, and has accelerated debates about regulatory frameworks for energy companies deemed systemically important to national security.",
    ],
    source: "Reuters",
    sourceInitials: "RT",
    sourceColor: "#2563eb",
    time: "Yesterday",
    readTime: "5 min read",
    impact: "negative",
    change: "-76.8%",
    assets: ["UN01.DE", "FORTUM", "E.ON"],
  },
  {
    id: 10,
    category: "ETF",
    breaking: false,
    headline: "ARK Innovation ETF Sees Largest Weekly Inflow in 18 Months on AI Optimism",
    excerpt: "ARKK attracted $340M in fresh capital as Cathie Wood doubles down on AI and genomics bets, citing an upcoming 'exponential growth' period.",
    body: [
      "ARK Innovation ETF (ARKK) recorded its largest weekly inflow in 18 months, attracting approximately $340 million in fresh capital as retail and institutional investors bet on a recovery in high-growth, disruptive technology stocks.",
      "The surge in interest came as Cathie Wood published a widely circulated research note arguing that artificial intelligence is approaching an inflection point that will compress the technology adoption curve for multiple industries simultaneously — from healthcare to autonomous vehicles to fintech.",
      "ARKK's top holdings, including Tesla, Roku, Coinbase, and UiPath, all gained between 4% and 11% over the week, contributing to a 14.2% monthly gain for the fund. The ETF remains down significantly from its 2021 peak, but has attracted a new cohort of investors willing to look through the drawdown.",
      "Wood specifically highlighted the genomics sector as being 'dramatically undervalued' relative to its eventual market opportunity, pointing to CRISPR Therapeutics and Intellia Therapeutics as key positions that could generate multiples of their current valuations over a 5-year horizon.",
      "Critics of the fund note that ARKK's concentrated bets and high volatility profile make it unsuitable for most investors, and point to the fund's -75% drawdown from its February 2021 peak as evidence of the risks involved in thematic growth investing.",
    ],
    source: "ETF.com",
    sourceInitials: "ET",
    sourceColor: "#be185d",
    time: "Yesterday",
    readTime: "3 min read",
    impact: "positive",
    change: "+14.2%",
    assets: ["ARKK", "TSLA", "COIN"],
    quote: "We are on the cusp of an exponential growth era driven by five converging disruptive innovation platforms.",
    quoteAuthor: "Cathie Wood, ARK Invest",
  },
  {
    id: 11,
    category: "Crypto",
    breaking: false,
    headline: "Solana Hits $220 as DeFi Volume Surges — SOL Flips BNB by Market Cap",
    excerpt: "SOL reaches its highest price since March as the network processes record transaction volumes and developer activity hits an all-time high.",
    body: [
      "Solana's native token SOL surged past $220 on Thursday, reaching its highest price level since March and overtaking BNB Chain's BNB token to become the fourth-largest cryptocurrency by market capitalization.",
      "The rally was underpinned by record network activity. Solana processed over 65 million daily transactions — a new all-time high — as decentralized exchange volumes on platforms like Jupiter and Raydium hit $4.2 billion in 24 hours, rivaling Ethereum's DEX volumes for the first time.",
      "Developer activity on Solana has also been a key bullish driver. Data from Electric Capital's annual developer report shows Solana now has the second-highest number of active monthly developers among all blockchain ecosystems, trailing only Ethereum.",
      "The mobile-first strategy is bearing fruit as well. The Solana Saga phone, initially considered a commercial failure, has seen a secondary market surge as owners discovered valuable token airdrops tied to the device, and a second-generation device is expected to launch in early 2025.",
      "Bearish voices point to Solana's history of network outages as a lingering concern, noting the chain suffered multiple disruptions in 2022 and 2023. The team has made significant reliability improvements, but critics argue the network has not yet been stress-tested at its current activity levels.",
    ],
    source: "Decrypt",
    sourceInitials: "DC",
    sourceColor: "#7c3aed",
    time: "Yesterday",
    readTime: "4 min read",
    impact: "positive",
    change: "+11.4%",
    assets: ["SOL", "BNB", "JUP"],
  },
  {
    id: 12,
    category: "Commodities",
    breaking: false,
    headline: "Oil Drops 2.3% as OPEC+ Production Cut Compliance Wavers",
    excerpt: "Brent crude slipped to $76.40 as reports emerge that several OPEC+ members are exceeding their agreed production quotas, clouding the cartel's supply discipline narrative.",
    body: [
      "Brent crude fell 2.3% to $76.40 per barrel on Thursday, extending a three-day decline as reports emerged that multiple OPEC+ member nations have been quietly exceeding their agreed production quotas, undermining the cartel's supply management credibility.",
      "According to tanker tracking data compiled by Vortexa Analytics, Iraq and Kazakhstan have been the primary offenders, with actual output running 180,000 and 120,000 barrels per day above their respective quotas. Russia has also been pumping above its ceiling, albeit by a smaller margin.",
      "Saudi Arabia, which has been shouldering voluntary cuts of 1 million barrels per day on top of the agreed OPEC+ reductions, is reportedly frustrated by the lack of compliance among its partners. Analysts speculate that Riyadh may choose to ease its own voluntary cuts as a signal of displeasure.",
      "Demand-side concerns are also weighing on prices. Preliminary data from China's National Bureau of Statistics shows crude imports in October running 8% below the same month last year, reflecting both an economic slowdown and the structural shift toward electric vehicles reducing gasoline demand.",
      "WTI crude tracked Brent lower, falling to $72.60 per barrel. Energy stocks in the S&P 500 underperformed the broader market, with Exxon Mobil and Chevron both losing between 1.2% and 1.8%.",
    ],
    source: "Platts",
    sourceInitials: "SP",
    sourceColor: "#d97706",
    time: "2 days ago",
    readTime: "4 min read",
    impact: "negative",
    change: "-2.31%",
    assets: ["BRENT", "WTI", "XOM"],
  },
];

const CATEGORIES: Category[] = ["All", "Crypto", "Stocks", "Forex", "Commodities", "Tech", "ETF", "Macro"];

/* ══════════════════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════════════════ */

function impactStyles(impact: Impact) {
  if (impact === "positive") return {
    bg: "bg-[#dcfce7] dark:bg-[#082a12]",
    text: "text-[#16a34a] dark:text-[#4ade80]",
    dot: "bg-[#22c55e]",
    label: "Bullish",
  };
  if (impact === "negative") return {
    bg: "bg-[#fee2e2] dark:bg-[#2a0808]",
    text: "text-[#dc2626] dark:text-[#f87171]",
    dot: "bg-[#ef4444]",
    label: "Bearish",
  };
  return {
    bg: "bg-[#f0f0ec] dark:bg-[#1a2a1e]",
    text: "text-[#555555] dark:text-[#8fa896]",
    dot: "bg-[#aaaaaa]",
    label: "Neutral",
  };
}

function categoryStyle(cat: string) {
  return CATEGORY_META[cat] ?? CATEGORY_META["Macro"];
}

/* ══════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════ */

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [search, setSearch] = useState("");

  const filtered = NEWS.filter((n) => {
    const matchCat = activeCategory === "All" || n.category === activeCategory;
    const q = search.toLowerCase();
    const matchSearch = !q || n.headline.toLowerCase().includes(q) || n.excerpt.toLowerCase().includes(q) || n.assets.some((a) => a.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });

  const featured = filtered[0] ?? null;
  const rest = filtered.slice(1);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0b1c11]">
      <DashNav />

      {/* Hero Banner */}
      <HeroBanner />

      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 pb-16">

        {/* Search + Category filter */}
        <div className="py-5 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#aaaaaa] dark:text-[#4a6655] pointer-events-none">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search news, assets, sources..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-11 pl-10 pr-4 border border-[#e5e5e5] dark:border-[#1e3827] bg-white dark:bg-[#0b1c11] text-[13px] text-[#001011] dark:text-white placeholder-[#aaaaaa] dark:placeholder-[#4a6655] outline-none focus:border-[#B0D45A] transition-colors"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-5">
          {CATEGORIES.map((cat) => {
            const active = cat === activeCategory;
            const meta = categoryStyle(cat);
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 h-8 px-4 text-[12px] font-semibold transition-all ${
                  active
                    ? "bg-[#001011] dark:bg-[#C1E963] text-white dark:text-[#001011]"
                    : "bg-[#f5f5f0] dark:bg-[#0e1e14] text-[#555555] dark:text-[#8fa896] hover:bg-[#eaeaea] dark:hover:bg-[#132b1a] border border-[#e5e5e5] dark:border-[#1e3827]"
                }`}
                style={active ? {} : {}}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-14 h-14 rounded-full bg-[#f0f0ec] dark:bg-[#1a2a1e] flex items-center justify-center mb-4">
              <SearchIcon />
            </div>
            <p className="text-[16px] font-semibold text-[#001011] dark:text-white mb-1">No results found</p>
            <p className="text-[13px] text-[#888888] dark:text-[#4a6655]">Try a different keyword or category</p>
          </div>
        ) : (
          <>
            {/* Featured Article */}
            {featured && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C1E963]" />
                  <span className="text-[11px] font-bold text-[#555555] dark:text-[#8fa896] uppercase tracking-widest">Top Story</span>
                </div>
                <FeaturedCard article={featured} onClick={() => setSelectedArticle(featured)} />
              </div>
            )}

            {/* Breaking news strip */}
            {rest.some((n) => n.breaking) && (
              <div className="mb-6">
                <BreakingStrip articles={rest.filter((n) => n.breaking)} onSelect={setSelectedArticle} />
              </div>
            )}

            {/* News Grid */}
            {rest.filter((n) => !n.breaking).length > 0 && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-[18px] font-bold text-[#001011] dark:text-white">Latest News</h2>
                    <p className="text-[12px] text-[#888888] dark:text-[#4a6655] mt-0.5">Real-time market intelligence</p>
                  </div>
                  <span className="text-[12px] text-[#aaaaaa] dark:text-[#3a5040]">{filtered.length} articles</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {rest.map((article) => (
                    <NewsCard key={article.id} article={article} onClick={() => setSelectedArticle(article)} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* Modal */}
      {selectedArticle && (
        <NewsModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   HERO BANNER
══════════════════════════════════════════════════════════════ */

function HeroBanner() {
  return (
    <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-4">
      <div
        className="relative flex overflow-hidden"
        style={{ backgroundColor: "#C1E963", minHeight: "140px" }}
      >
        {/* Decorative dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle, #001011 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Left: Text */}
        <div className="flex-1 min-w-0 flex flex-col justify-center px-6 lg:px-10 py-6 z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white bg-[#001011]/80 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C1E963] animate-pulse" />
              Live market news
            </span>
          </div>
          <h1 className="text-[19px] sm:text-[24px] lg:text-[28px] font-extrabold text-[#001a08] leading-tight mb-2">
            Stay ahead of every move
          </h1>
          <p className="text-[12px] sm:text-[13px] text-[#2a5018] max-w-[360px]">
            Stocks, crypto, forex, and commodities — all the market intelligence you need in one place.
          </p>
        </div>

        {/* Right: Visual */}
        <div className="hidden sm:flex items-center justify-end shrink-0 w-[280px] lg:w-[380px] px-8 lg:px-12 relative z-10 gap-4">
          {/* Mini ticker cards */}
          <div className="flex flex-col gap-2">
            {[
              { ticker: "BTC", val: "$98,420", chg: "+7.3%", up: true },
              { ticker: "NVDA", val: "$876.40", chg: "+9.2%", up: true },
              { ticker: "BRENT", val: "$76.40", chg: "-2.3%", up: false },
            ].map((t) => (
              <div key={t.ticker} className="flex items-center gap-2 bg-[#001011]/10 backdrop-blur-sm px-3 py-2 rounded-sm border border-[#001011]/10">
                <span className="text-[11px] font-bold text-[#001a08] w-[42px]">{t.ticker}</span>
                <span className="text-[11px] font-semibold text-[#001a08]">{t.val}</span>
                <span className={`text-[10px] font-bold ml-1 ${t.up ? "text-[#14532d]" : "text-[#7f1d1d]"}`}>{t.chg}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            {[
              { ticker: "ETH",  val: "$3,820", chg: "+5.8%", up: true },
              { ticker: "AAPL", val: "$231.00", chg: "+2.8%", up: true },
              { ticker: "GOLD", val: "$2,680", chg: "+1.2%", up: true },
            ].map((t) => (
              <div key={t.ticker} className="flex items-center gap-2 bg-[#001011]/10 backdrop-blur-sm px-3 py-2 rounded-sm border border-[#001011]/10">
                <span className="text-[11px] font-bold text-[#001a08] w-[42px]">{t.ticker}</span>
                <span className="text-[11px] font-semibold text-[#001a08]">{t.val}</span>
                <span className={`text-[10px] font-bold ml-1 ${t.up ? "text-[#14532d]" : "text-[#7f1d1d]"}`}>{t.chg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   FEATURED CARD
══════════════════════════════════════════════════════════════ */

function FeaturedCard({ article, onClick }: { article: NewsArticle; onClick: () => void }) {
  const meta = categoryStyle(article.category);
  const imp = impactStyles(article.impact);

  return (
    <button
      onClick={onClick}
      className="w-full text-left group"
    >
      <div
        className="relative overflow-hidden flex flex-col sm:flex-row border border-[#e5e5e5] dark:border-[#1e3827] hover:border-[#B0D45A] dark:hover:border-[#B0D45A] transition-colors bg-white dark:bg-[#0e1e14]"
      >
        {/* Color accent left stripe */}
        <div className="w-full sm:w-1.5 h-1.5 sm:h-auto shrink-0" style={{ backgroundColor: meta.color }} />

        {/* Content */}
        <div className="flex-1 p-5 lg:p-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {article.breaking && (
              <span className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#ef4444] text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Breaking
              </span>
            )}
            <span
              className="px-2.5 py-0.5 text-[11px] font-semibold rounded-full"
              style={{ backgroundColor: meta.bg, color: meta.color }}
            >
              {article.category}
            </span>
            <span className={`flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-semibold rounded-full ${imp.bg} ${imp.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${imp.dot}`} />
              {imp.label} · {article.change}
            </span>
          </div>

          <h2 className="text-[18px] sm:text-[22px] lg:text-[26px] font-extrabold text-[#001011] dark:text-white leading-tight mb-3 group-hover:text-[#4a7a6a] dark:group-hover:text-[#B0D45A] transition-colors">
            {article.headline}
          </h2>

          <p className="text-[13px] sm:text-[14px] text-[#555555] dark:text-[#8fa896] leading-relaxed mb-5 line-clamp-2">
            {article.excerpt}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Assets */}
            <div className="flex flex-wrap gap-1.5">
              {article.assets.map((a) => (
                <span key={a} className="px-2 py-0.5 text-[11px] font-mono font-bold text-[#001011] dark:text-white bg-[#f0f0ec] dark:bg-[#1a2a1e] border border-[#e5e5e5] dark:border-[#2a3a2e]">
                  {a}
                </span>
              ))}
            </div>

            {/* Meta */}
            <div className="flex items-center gap-3 text-[12px] text-[#aaaaaa] dark:text-[#3a5040]">
              <span className="flex items-center gap-1.5">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold text-white shrink-0"
                  style={{ backgroundColor: article.sourceColor }}
                >
                  {article.sourceInitials}
                </div>
                {article.source}
              </span>
              <span>·</span>
              <span>{article.time}</span>
              <span>·</span>
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

/* ══════════════════════════════════════════════════════════════
   BREAKING STRIP  (horizontal scroll)
══════════════════════════════════════════════════════════════ */

function BreakingStrip({ articles, onSelect }: { articles: NewsArticle[]; onSelect: (a: NewsArticle) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className="flex items-center gap-1.5 px-2 py-0.5 bg-[#ef4444] text-white text-[10px] font-bold uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          Breaking
        </span>
        <div className="flex-1 h-px bg-[#e5e5e5] dark:bg-[#1e3827]" />
      </div>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-4 lg:-mx-6 px-4 lg:px-6 pb-1"
      >
        {articles.map((a) => (
          <BreakingCard key={a.id} article={a} onClick={() => onSelect(a)} />
        ))}
      </div>
    </div>
  );
}

function BreakingCard({ article, onClick }: { article: NewsArticle; onClick: () => void }) {
  const meta = categoryStyle(article.category);
  const imp = impactStyles(article.impact);

  return (
    <button
      onClick={onClick}
      className="min-w-[300px] max-w-[300px] shrink-0 text-left group border border-[#e5e5e5] dark:border-[#1e3827] hover:border-[#B0D45A] dark:hover:border-[#B0D45A] bg-white dark:bg-[#0e1e14] transition-colors overflow-hidden flex flex-col"
    >
      {/* Top colored bar */}
      <div className="h-1 w-full" style={{ backgroundColor: meta.color }} />

      <div className="p-4 flex flex-col gap-3 flex-1">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full" style={{ backgroundColor: meta.bg, color: meta.color }}>
            {article.category}
          </span>
          <span className={`text-[11px] font-bold ${imp.text}`}>{article.change}</span>
        </div>

        <p className="text-[14px] font-bold text-[#001011] dark:text-white leading-snug line-clamp-3 group-hover:text-[#4a7a6a] dark:group-hover:text-[#B0D45A] transition-colors">
          {article.headline}
        </p>

        <div className="mt-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-[11px] text-[#aaaaaa] dark:text-[#3a5040]">
            <div className="w-4 h-4 rounded-full flex items-center justify-center text-[7px] font-bold text-white shrink-0" style={{ backgroundColor: article.sourceColor }}>
              {article.sourceInitials}
            </div>
            {article.source} · {article.time}
          </div>
          <span className={`flex items-center gap-1 text-[10px] font-semibold ${imp.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${imp.dot}`} />
            {imp.label}
          </span>
        </div>
      </div>
    </button>
  );
}

/* ══════════════════════════════════════════════════════════════
   NEWS CARD (grid)
══════════════════════════════════════════════════════════════ */

function NewsCard({ article, onClick }: { article: NewsArticle; onClick: () => void }) {
  const meta = categoryStyle(article.category);
  const imp = impactStyles(article.impact);

  return (
    <button
      onClick={onClick}
      className="text-left group border border-[#e5e5e5] dark:border-[#1e3827] hover:border-[#B0D45A] dark:hover:border-[#B0D45A] bg-white dark:bg-[#0e1e14] transition-colors overflow-hidden flex flex-col w-full"
    >
      {/* Colored top bar */}
      <div className="h-[3px] w-full" style={{ backgroundColor: meta.color }} />

      <div className="p-4 flex flex-col gap-3 flex-1">

        {/* Category + impact row */}
        <div className="flex items-center justify-between gap-2">
          <span
            className="px-2.5 py-0.5 text-[10px] font-semibold rounded-full"
            style={{ backgroundColor: meta.bg, color: meta.color }}
          >
            {article.category}
          </span>
          <span className={`flex items-center gap-1 text-[10px] font-bold ${imp.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${imp.dot}`} />
            {article.change}
          </span>
        </div>

        {/* Headline */}
        <p className="text-[14px] font-bold text-[#001011] dark:text-white leading-snug line-clamp-3 group-hover:text-[#4a7a6a] dark:group-hover:text-[#B0D45A] transition-colors">
          {article.headline}
        </p>

        {/* Excerpt */}
        <p className="text-[12px] text-[#666666] dark:text-[#4a6655] leading-relaxed line-clamp-2">
          {article.excerpt}
        </p>

        {/* Assets */}
        <div className="flex flex-wrap gap-1">
          {article.assets.slice(0, 3).map((a) => (
            <span key={a} className="px-1.5 py-0.5 text-[10px] font-mono font-bold text-[#001011] dark:text-[#8fa896] bg-[#f0f0ec] dark:bg-[#1a2a1e]">
              {a}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center gap-2 pt-3 border-t border-[#f0f0ec] dark:border-[#1a2e1e]">
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center text-[7px] font-bold text-white shrink-0"
            style={{ backgroundColor: article.sourceColor }}
          >
            {article.sourceInitials}
          </div>
          <span className="text-[11px] text-[#888888] dark:text-[#4a6655] truncate">{article.source}</span>
          <span className="text-[11px] text-[#aaaaaa] dark:text-[#3a5040] ml-auto shrink-0">{article.time}</span>
        </div>
      </div>
    </button>
  );
}

/* ══════════════════════════════════════════════════════════════
   NEWS MODAL
══════════════════════════════════════════════════════════════ */

function NewsModal({ article, onClose }: { article: NewsArticle; onClose: () => void }) {
  const meta = categoryStyle(article.category);
  const imp = impactStyles(article.impact);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full sm:max-w-[680px] max-h-[92vh] sm:max-h-[88vh] bg-white dark:bg-[#0e1e14] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="h-1 w-full shrink-0" style={{ backgroundColor: meta.color }} />

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1">
          {/* Top section */}
          <div className="px-5 sm:px-8 pt-6 pb-5 border-b border-[#f0f0ec] dark:border-[#1e3827]">

            {/* Category + time + close */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex flex-wrap items-center gap-2">
                {article.breaking && (
                  <span className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#ef4444] text-white">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    Breaking
                  </span>
                )}
                <span
                  className="px-2.5 py-0.5 text-[11px] font-semibold rounded-full"
                  style={{ backgroundColor: meta.bg, color: meta.color }}
                >
                  {article.category}
                </span>
                <span className="text-[12px] text-[#aaaaaa] dark:text-[#3a5040]">{article.time} · {article.readTime}</span>
              </div>
              <button
                onClick={onClose}
                className="w-7 h-7 rounded-full flex items-center justify-center bg-[#f0f0ec] dark:bg-[#1a2a1e] text-[#888888] hover:text-[#001011] dark:hover:text-white transition-colors shrink-0"
              >
                <ModalCloseIcon />
              </button>
            </div>

            {/* Headline */}
            <h2 className="text-[18px] sm:text-[22px] font-extrabold text-[#001011] dark:text-white leading-tight mb-3">
              {article.headline}
            </h2>

            {/* Excerpt */}
            <p className="text-[13px] sm:text-[14px] text-[#555555] dark:text-[#8fa896] leading-relaxed mb-4">
              {article.excerpt}
            </p>

            {/* Impact + change */}
            <div className="flex flex-wrap items-center gap-3">
              <div className={`flex items-center gap-2 px-3 py-2 rounded-sm ${imp.bg}`}>
                <span className={`w-2 h-2 rounded-full ${imp.dot}`} />
                <span className={`text-[12px] font-bold ${imp.text}`}>{imp.label}</span>
                <span className={`text-[14px] font-extrabold ${imp.text}`}>{article.change}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white shrink-0" style={{ backgroundColor: article.sourceColor }}>
                  {article.sourceInitials}
                </div>
                <span className="text-[13px] font-semibold text-[#001011] dark:text-white">{article.source}</span>
              </div>
            </div>
          </div>

          {/* Article body */}
          <div className="px-5 sm:px-8 py-6 space-y-4">
            {article.body.map((para, i) => (
              <p key={i} className="text-[13px] sm:text-[14px] text-[#333333] dark:text-[#c0d0c4] leading-[1.8]">
                {para}
              </p>
            ))}

            {/* Pull quote */}
            {article.quote && (
              <div
                className="my-6 pl-5 border-l-4 py-3"
                style={{ borderColor: meta.color }}
              >
                <p className="text-[15px] sm:text-[17px] font-bold italic text-[#001011] dark:text-white leading-snug mb-2">
                  "{article.quote}"
                </p>
                <p className="text-[12px] text-[#888888] dark:text-[#4a6655]">— {article.quoteAuthor}</p>
              </div>
            )}
          </div>

          {/* Footer: assets + read more */}
          <div className="px-5 sm:px-8 pb-6 pt-2 border-t border-[#f0f0ec] dark:border-[#1e3827]">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold text-[#aaaaaa] dark:text-[#3a5040] uppercase tracking-wider mb-2">Affected Assets</p>
                <div className="flex flex-wrap gap-2">
                  {article.assets.map((a) => (
                    <span
                      key={a}
                      className="px-3 py-1 text-[12px] font-mono font-bold text-[#001011] dark:text-white bg-[#f5f5f0] dark:bg-[#1a2a1e] border border-[#e5e5e5] dark:border-[#2a3a2e]"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>

              <button
                className="flex items-center gap-2 h-10 px-5 text-[13px] font-bold text-[#001011] bg-[#C1E963] hover:opacity-90 transition-opacity shrink-0"
              >
                Read full article
                <ExternalLinkIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   ICONS
══════════════════════════════════════════════════════════════ */

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function ModalCloseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <line x1="1" y1="1" x2="11" y2="11" />
      <line x1="11" y1="1" x2="1" y2="11" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15,3 21,3 21,9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}
