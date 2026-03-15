"use client";

import { useState, useEffect, useCallback } from "react";
import DashNav from "@/components/DashNav";

/* ══════════════════════════════════════════════════════════════
   TYPES
══════════════════════════════════════════════════════════════ */

type Sector = "All" | "Technology" | "Finance" | "Healthcare" | "Energy" | "Consumer" | "Industrials";

interface Stock {
  symbol:      string;
  name:        string;
  sector:      Sector;
  domain:      string;
  price:       number;
  change:      number;
  changePct:   number;
  mktCap:      string;
  volume:      string;
  pe:          number | null;
  eps:         number;
  high52:      number;
  low52:       number;
  divYield:    string;
  beta:        number;
  avgVol:      string;
  exchange:    string;
  description: string;
  sparkline:   number[];
}

/* ══════════════════════════════════════════════════════════════
   STATIC DATA
══════════════════════════════════════════════════════════════ */

const STOCKS: Stock[] = [
  {
    symbol: "AAPL", name: "Apple Inc.", sector: "Technology", domain: "apple.com",
    price: 189.30, change: 1.24, changePct: 0.66,
    mktCap: "2.95T", volume: "54.2M", pe: 31.2, eps: 6.08,
    high52: 199.62, low52: 164.08, divYield: "0.51%", beta: 1.24, avgVol: "58.1M",
    exchange: "NASDAQ",
    description: "Apple designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide, along with related software, services, and cloud solutions.",
    sparkline: [182.4, 183.1, 181.8, 184.2, 185.0, 183.7, 186.4, 187.1, 185.8, 186.9, 187.5, 188.2, 186.8, 187.9, 188.5, 189.0, 188.1, 188.7, 189.1, 189.3],
  },
  {
    symbol: "MSFT", name: "Microsoft Corp.", sector: "Technology", domain: "microsoft.com",
    price: 415.50, change: 3.80, changePct: 0.92,
    mktCap: "3.08T", volume: "22.1M", pe: 36.4, eps: 11.45,
    high52: 430.82, low52: 309.45, divYield: "0.72%", beta: 0.90, avgVol: "24.3M",
    exchange: "NASDAQ",
    description: "Microsoft develops, licenses, and supports software, services, devices, and solutions that deliver value to customers worldwide.",
    sparkline: [405.2, 407.8, 404.5, 408.9, 410.3, 408.1, 411.7, 412.4, 410.8, 413.2, 411.9, 414.0, 412.5, 413.8, 414.5, 415.1, 413.7, 414.8, 415.2, 415.5],
  },
  {
    symbol: "GOOGL", name: "Alphabet Inc.", sector: "Technology", domain: "google.com",
    price: 175.98, change: 2.15, changePct: 1.24,
    mktCap: "2.17T", volume: "18.4M", pe: 24.8, eps: 7.10,
    high52: 191.75, low52: 130.67, divYield: "0.00%", beta: 1.06, avgVol: "22.6M",
    exchange: "NASDAQ",
    description: "Alphabet is the holding company of Google and various other businesses in technology, advertising, cloud computing, and emerging technologies.",
    sparkline: [168.3, 169.7, 167.8, 170.4, 171.2, 169.5, 172.1, 173.0, 171.4, 172.8, 173.5, 174.2, 172.9, 174.0, 174.8, 175.2, 174.1, 175.0, 175.6, 175.98],
  },
  {
    symbol: "AMZN", name: "Amazon.com Inc.", sector: "Consumer", domain: "amazon.com",
    price: 198.12, change: -1.33, changePct: -0.67,
    mktCap: "2.09T", volume: "31.5M", pe: 44.6, eps: 4.44,
    high52: 201.20, low52: 118.35, divYield: "0.00%", beta: 1.15, avgVol: "38.2M",
    exchange: "NASDAQ",
    description: "Amazon is a multinational technology company focusing on e-commerce, cloud computing (AWS), digital streaming, and artificial intelligence.",
    sparkline: [201.5, 200.8, 202.1, 200.3, 199.7, 201.0, 199.2, 200.5, 199.8, 198.9, 200.2, 199.1, 198.5, 199.4, 198.8, 199.5, 198.2, 198.9, 198.4, 198.12],
  },
  {
    symbol: "NVDA", name: "NVIDIA Corp.", sector: "Technology", domain: "nvidia.com",
    price: 875.40, change: 22.50, changePct: 2.64,
    mktCap: "2.15T", volume: "42.3M", pe: 68.2, eps: 12.84,
    high52: 974.00, low52: 373.36, divYield: "0.03%", beta: 1.68, avgVol: "49.1M",
    exchange: "NASDAQ",
    description: "NVIDIA designs and manufactures graphics processing units, system on chip units, and API software for gaming, professional visualization, data centers, and automotive markets.",
    sparkline: [820.1, 831.4, 825.7, 840.2, 845.8, 838.3, 852.1, 858.5, 850.2, 861.4, 856.8, 864.3, 859.7, 866.2, 862.5, 869.8, 865.1, 871.4, 873.8, 875.4],
  },
  {
    symbol: "TSLA", name: "Tesla Inc.", sector: "Consumer", domain: "tesla.com",
    price: 177.58, change: -4.22, changePct: -2.32,
    mktCap: "566.4B", volume: "98.7M", pe: 47.3, eps: 3.75,
    high52: 299.29, low52: 138.80, divYield: "0.00%", beta: 2.31, avgVol: "112.4M",
    exchange: "NASDAQ",
    description: "Tesla designs, develops, manufactures, and sells electric vehicles, energy generation and storage systems, and related services globally.",
    sparkline: [188.4, 186.2, 190.1, 184.5, 187.8, 183.2, 186.5, 181.8, 184.3, 180.7, 183.1, 179.5, 182.4, 178.9, 181.3, 178.2, 180.5, 177.8, 179.1, 177.58],
  },
  {
    symbol: "META", name: "Meta Platforms", sector: "Technology", domain: "meta.com",
    price: 527.34, change: 8.92, changePct: 1.72,
    mktCap: "1.35T", volume: "15.8M", pe: 29.4, eps: 17.94,
    high52: 531.49, low52: 274.38, divYield: "0.40%", beta: 1.22, avgVol: "18.7M",
    exchange: "NASDAQ",
    description: "Meta builds technologies that help people connect, find communities, and grow businesses across its family of apps including Facebook, Instagram, WhatsApp, and Threads.",
    sparkline: [505.2, 508.7, 503.9, 511.4, 514.8, 509.3, 516.2, 518.7, 513.5, 520.1, 517.4, 522.8, 519.3, 523.6, 521.0, 524.9, 522.3, 525.8, 526.7, 527.34],
  },
  {
    symbol: "JPM", name: "JPMorgan Chase", sector: "Finance", domain: "jpmorgan.com",
    price: 208.47, change: 1.58, changePct: 0.76,
    mktCap: "594.2B", volume: "8.9M", pe: 12.1, eps: 17.23,
    high52: 220.82, low52: 135.19, divYield: "2.25%", beta: 1.08, avgVol: "10.1M",
    exchange: "NYSE",
    description: "JPMorgan Chase is a global financial services firm offering investment banking, commercial banking, financial transaction processing, and asset management.",
    sparkline: [203.1, 204.5, 202.8, 205.2, 206.1, 204.7, 206.8, 207.3, 205.9, 207.8, 206.5, 208.1, 207.0, 208.5, 207.3, 208.9, 207.6, 208.2, 208.5, 208.47],
  },
  {
    symbol: "JNJ", name: "Johnson & Johnson", sector: "Healthcare", domain: "jnj.com",
    price: 152.34, change: -0.87, changePct: -0.57,
    mktCap: "365.8B", volume: "6.2M", pe: 16.4, eps: 9.28,
    high52: 168.60, low52: 143.13, divYield: "3.18%", beta: 0.56, avgVol: "7.4M",
    exchange: "NYSE",
    description: "Johnson & Johnson is a multinational corporation that develops medical devices, pharmaceuticals, and consumer packaged goods globally.",
    sparkline: [154.2, 153.8, 154.9, 153.1, 154.5, 153.4, 154.8, 153.7, 154.2, 153.0, 153.8, 152.9, 153.5, 152.7, 153.2, 152.5, 152.9, 152.2, 152.5, 152.34],
  },
  {
    symbol: "XOM", name: "Exxon Mobil", sector: "Energy", domain: "exxon.com",
    price: 118.92, change: 0.64, changePct: 0.54,
    mktCap: "472.1B", volume: "14.3M", pe: 14.2, eps: 8.38,
    high52: 123.75, low52: 95.77, divYield: "3.46%", beta: 0.85, avgVol: "17.8M",
    exchange: "NYSE",
    description: "ExxonMobil explores, produces, transports, and sells crude oil and natural gas, as well as manufactures petroleum products globally.",
    sparkline: [116.5, 117.2, 116.0, 117.8, 118.1, 117.3, 118.5, 118.9, 117.7, 119.1, 118.3, 119.4, 118.0, 119.2, 118.5, 119.5, 118.7, 119.1, 118.8, 118.92],
  },
  {
    symbol: "NFLX", name: "Netflix Inc.", sector: "Consumer", domain: "netflix.com",
    price: 638.22, change: 12.45, changePct: 1.99,
    mktCap: "276.4B", volume: "4.1M", pe: 46.8, eps: 13.63,
    high52: 698.54, low52: 344.73, divYield: "0.00%", beta: 1.32, avgVol: "4.8M",
    exchange: "NASDAQ",
    description: "Netflix is a subscription streaming service offering movies, TV shows, documentaries, and original content across 190+ countries.",
    sparkline: [612.4, 618.7, 610.2, 622.5, 619.8, 624.3, 621.0, 628.4, 624.7, 630.1, 626.5, 632.8, 629.2, 634.7, 631.0, 636.5, 633.8, 637.1, 636.4, 638.22],
  },
  {
    symbol: "V", name: "Visa Inc.", sector: "Finance", domain: "visa.com",
    price: 279.14, change: 2.31, changePct: 0.83,
    mktCap: "567.3B", volume: "5.7M", pe: 30.2, eps: 9.25,
    high52: 290.96, low52: 220.89, divYield: "0.76%", beta: 0.93, avgVol: "6.9M",
    exchange: "NYSE",
    description: "Visa operates the world's largest retail electronic payments network, facilitating transactions between consumers, merchants, financial institutions, and governments.",
    sparkline: [273.5, 274.8, 272.9, 275.4, 276.1, 274.7, 276.8, 277.5, 275.9, 277.8, 276.5, 278.2, 277.0, 278.8, 277.4, 279.1, 277.8, 278.5, 278.9, 279.14],
  },
  {
    symbol: "BA", name: "Boeing Co.", sector: "Industrials", domain: "boeing.com",
    price: 183.56, change: -2.14, changePct: -1.15,
    mktCap: "115.2B", volume: "7.8M", pe: null, eps: -5.74,
    high52: 267.54, low52: 159.70, divYield: "0.00%", beta: 1.45, avgVol: "9.3M",
    exchange: "NYSE",
    description: "Boeing designs, develops, manufactures, and services commercial jetliners, military aircraft, satellites, missile defense, space systems, and launching systems.",
    sparkline: [189.2, 187.8, 190.5, 186.3, 188.9, 185.4, 187.7, 184.2, 186.8, 183.5, 185.9, 182.8, 185.1, 182.1, 184.4, 181.5, 183.7, 181.8, 182.9, 183.56],
  },
  {
    symbol: "PFE", name: "Pfizer Inc.", sector: "Healthcare", domain: "pfizer.com",
    price: 28.14, change: -0.33, changePct: -1.16,
    mktCap: "159.1B", volume: "32.4M", pe: 14.8, eps: 1.90,
    high52: 32.46, low52: 25.20, divYield: "5.96%", beta: 0.58, avgVol: "38.9M",
    exchange: "NYSE",
    description: "Pfizer discovers, develops, manufactures, and sells biopharmaceutical products globally, including vaccines, oncology, inflammation, and rare disease treatments.",
    sparkline: [29.1, 28.8, 29.4, 28.5, 29.0, 28.4, 28.9, 28.3, 28.8, 28.2, 28.7, 28.1, 28.6, 28.0, 28.5, 27.9, 28.3, 28.0, 28.2, 28.14],
  },
  {
    symbol: "CAT", name: "Caterpillar Inc.", sector: "Industrials", domain: "caterpillar.com",
    price: 362.18, change: 4.55, changePct: 1.27,
    mktCap: "175.4B", volume: "2.1M", pe: 16.8, eps: 21.56,
    high52: 388.46, low52: 223.96, divYield: "1.54%", beta: 0.96, avgVol: "2.8M",
    exchange: "NYSE",
    description: "Caterpillar manufactures construction and mining equipment, off-highway diesel and natural gas engines, industrial gas turbines, and diesel-electric locomotives.",
    sparkline: [352.4, 354.8, 351.2, 356.5, 357.9, 354.3, 358.7, 359.4, 356.8, 360.2, 357.5, 361.4, 358.9, 362.1, 359.6, 362.8, 360.3, 362.5, 361.8, 362.18],
  },
  {
    symbol: "WMT", name: "Walmart Inc.", sector: "Consumer", domain: "walmart.com",
    price: 67.82, change: 0.42, changePct: 0.62,
    mktCap: "546.2B", volume: "19.3M", pe: 36.9, eps: 1.84,
    high52: 70.00, low52: 47.82, divYield: "1.25%", beta: 0.49, avgVol: "22.1M",
    exchange: "NYSE",
    description: "Walmart operates retail, wholesale, and other units in multiple formats worldwide, including Supercenters, Sam's Club, and eCommerce platforms.",
    sparkline: [66.2, 66.7, 65.9, 67.1, 67.4, 66.8, 67.5, 67.8, 67.1, 67.9, 67.3, 68.0, 67.2, 67.9, 67.4, 68.1, 67.5, 67.8, 67.7, 67.82],
  },
];

const SECTOR_FILTERS: Sector[] = ["All", "Technology", "Finance", "Healthcare", "Energy", "Consumer", "Industrials"];

const INDICES = [
  { name: "S&P 500",  value: "5,234.18", change: "+18.42", changePct: "+0.35%", positive: true  },
  { name: "NASDAQ",   value: "16,428.82", change: "+94.56", changePct: "+0.58%", positive: true  },
  { name: "DOW JONES", value: "39,127.14", change: "-42.77", changePct: "-0.11%", positive: false },
  { name: "FTSE 100", value: "7,924.56",  change: "+31.22", changePct: "+0.40%", positive: true  },
];

const SECTOR_COLORS: Record<string, { bg: string; darkBg: string; text: string; darkText: string }> = {
  Technology:  { bg: "#eff6ff", darkBg: "#0d1a2e", text: "#2563eb", darkText: "#60a5fa" },
  Finance:     { bg: "#fefce8", darkBg: "#1e1a06", text: "#ca8a04", darkText: "#facc15" },
  Healthcare:  { bg: "#f0fdf4", darkBg: "#061a0e", text: "#16a34a", darkText: "#4ade80" },
  Energy:      { bg: "#fff7ed", darkBg: "#1e1006", text: "#ea580c", darkText: "#fb923c" },
  Consumer:    { bg: "#fdf4ff", darkBg: "#160d1e", text: "#9333ea", darkText: "#c084fc" },
  Industrials: { bg: "#f0f9ff", darkBg: "#061820", text: "#0284c7", darkText: "#38bdf8" },
};

/* ══════════════════════════════════════════════════════════════
   SPARKLINE HELPERS
══════════════════════════════════════════════════════════════ */

function buildSparklinePath(prices: number[], width: number, height: number, padding = 3): string {
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1;
  const step  = (width - padding * 2) / (prices.length - 1);

  return prices
    .map((p, i) => {
      const x = padding + i * step;
      const y = padding + ((max - p) / range) * (height - padding * 2);
      return `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
}

function buildSparklineArea(prices: number[], width: number, height: number, padding = 3): string {
  const linePath = buildSparklinePath(prices, width, height, padding);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1;

  const lastX  = padding + (prices.length - 1) * ((width - padding * 2) / (prices.length - 1));
  const baseY  = padding + height - padding;
  const firstX = padding;
  const lastY  = padding + ((max - prices[prices.length - 1]) / range) * (height - padding * 2);

  return `${linePath} L${lastX.toFixed(2)},${baseY.toFixed(2)} L${firstX.toFixed(2)},${baseY.toFixed(2)} Z`;
}

/* ══════════════════════════════════════════════════════════════
   LOGO WITH FALLBACK
══════════════════════════════════════════════════════════════ */

const FALLBACK_COLORS = [
  "#6366f1", "#8b5cf6", "#ec4899", "#14b8a6",
  "#f59e0b", "#10b981", "#3b82f6", "#f43f5e",
];

function StockLogo({ domain, name, size = 44 }: { domain: string; name: string; size?: number }) {
  const [failed, setFailed] = useState(false);
  const color = FALLBACK_COLORS[name.charCodeAt(0) % FALLBACK_COLORS.length];
  const initials = name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
  const fontSize = Math.round(size * 0.36);

  if (failed) {
    return (
      <div
        style={{ width: size, height: size, backgroundColor: color, borderRadius: 10, fontSize }}
        className="flex items-center justify-center font-bold text-white shrink-0"
      >
        {initials}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://logo.clearbit.com/${domain}`}
      alt={name}
      width={size}
      height={size}
      style={{ borderRadius: 10, objectFit: "contain", width: size, height: size }}
      className="shrink-0 bg-white"
      onError={() => setFailed(true)}
    />
  );
}

/* ══════════════════════════════════════════════════════════════
   MINI SPARKLINE (card)
══════════════════════════════════════════════════════════════ */

function MiniSparkline({ prices, positive }: { prices: number[]; positive: boolean }) {
  const W = 80; const H = 32;
  const path  = buildSparklinePath(prices, W, H, 2);
  const area  = buildSparklineArea(prices, W, H, 2);
  const color = positive ? "#22c55e" : "#f87171";
  const gradId = positive ? "mini-profit" : "mini-loss";
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gradId})`} />
      <path d={path} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════
   MODAL SPARKLINE (large with gradient)
══════════════════════════════════════════════════════════════ */

function ModalSparkline({ prices, positive }: { prices: number[]; positive: boolean }) {
  const W = 560; const H = 100;
  const padding = 6;
  const linePath = buildSparklinePath(prices, W, H, padding);
  const areaPath = buildSparklineArea(prices, W, H, padding);
  const color    = positive ? "#22c55e" : "#f87171";
  const gradId   = positive ? "grad-profit" : "grad-loss";
  const gradStop = positive ? "#22c55e" : "#f87171";

  return (
    <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" fill="none">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={gradStop} stopOpacity="0.28" />
          <stop offset="100%" stopColor={gradStop} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${gradId})`} />
      <path d={linePath} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════
   STOCK CARD
══════════════════════════════════════════════════════════════ */

function StockCard({ stock, onClick }: { stock: Stock; onClick: () => void }) {
  const positive = stock.change >= 0;
  const sectorMeta = SECTOR_COLORS[stock.sector];

  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white dark:bg-[#132b1a] border border-[#e5e5e5] dark:border-[#1e3827] rounded-xl p-5 hover:shadow-lg hover:shadow-black/10 dark:hover:shadow-black/40 hover:border-[#d0d0d0] dark:hover:border-[#2e4a35] transition-all duration-200 group"
    >
      {/* Top row: logo + name + symbol badge */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <StockLogo domain={stock.domain} name={stock.name} size={44} />
          <div className="min-w-0">
            <p className="text-[13px] font-bold text-[#001011] dark:text-[#f0f0f0] leading-tight truncate group-hover:text-[#B0D45A] transition-colors">
              {stock.name}
            </p>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wide bg-[#f0fae0] dark:bg-[#1e3827] text-[#033F2D] dark:text-[#B0D45A]">
                {stock.symbol}
              </span>
              <span
                className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium"
                style={{
                  backgroundColor: sectorMeta?.bg,
                  color: sectorMeta?.text,
                }}
              >
                <span className="dark:hidden">{stock.sector}</span>
                <span
                  className="hidden dark:inline"
                  style={{ color: sectorMeta?.darkText }}
                >
                  {stock.sector}
                </span>
              </span>
            </div>
          </div>
        </div>
        {/* Sparkline */}
        <div className="shrink-0 mt-1">
          <MiniSparkline prices={stock.sparkline} positive={positive} />
        </div>
      </div>

      {/* Price row */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[22px] font-bold text-[#001011] dark:text-[#f0f0f0] leading-none">
            ${stock.price.toFixed(2)}
          </p>
          <p className={`text-[12px] font-semibold mt-1 ${
            positive
              ? "text-[#16a34a] dark:text-[#22c55e]"
              : "text-[#dc2626] dark:text-[#f87171]"
          }`}>
            {positive ? "▲" : "▼"} {positive ? "+" : ""}{stock.change.toFixed(2)} ({positive ? "+" : ""}{stock.changePct.toFixed(2)}%)
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-[#888888] dark:text-[#8fa896] mb-0.5">Vol</p>
          <p className="text-[12px] font-medium text-[#555555] dark:text-[#8fa896]">{stock.volume}</p>
        </div>
      </div>
    </button>
  );
}

/* ══════════════════════════════════════════════════════════════
   STOCK MODAL
══════════════════════════════════════════════════════════════ */

function StockModal({ stock, onClose }: { stock: Stock; onClose: () => void }) {
  const positive = stock.change >= 0;
  const sectorMeta = SECTOR_COLORS[stock.sector];

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const metrics = [
    { label: "Market Cap",     value: stock.mktCap },
    { label: "P/E Ratio",      value: stock.pe !== null ? stock.pe.toFixed(1) : "N/A" },
    { label: "EPS",            value: stock.eps >= 0 ? `$${stock.eps.toFixed(2)}` : `-$${Math.abs(stock.eps).toFixed(2)}` },
    { label: "52W High",       value: `$${stock.high52.toFixed(2)}` },
    { label: "52W Low",        value: `$${stock.low52.toFixed(2)}` },
    { label: "Avg Volume",     value: stock.avgVol },
    { label: "Dividend Yield", value: stock.divYield },
    { label: "Beta",           value: stock.beta.toFixed(2) },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-[#0e1e14] w-full max-w-2xl rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex items-start justify-between gap-4 p-6 border-b border-[#e5e5e5] dark:border-[#1e3827]">
          <div className="flex items-center gap-4">
            <StockLogo domain={stock.domain} name={stock.name} size={52} />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-[18px] font-bold text-[#001011] dark:text-[#f0f0f0]">{stock.name}</h2>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-[#f0fae0] dark:bg-[#1e3827] text-[#033F2D] dark:text-[#B0D45A]">
                  {stock.symbol}
                </span>
              </div>
              <div className="flex items-baseline gap-3 mt-1 flex-wrap">
                <span className="text-[26px] font-bold text-[#001011] dark:text-[#f0f0f0] leading-none">
                  ${stock.price.toFixed(2)}
                </span>
                <span className={`text-[14px] font-semibold ${
                  positive ? "text-[#16a34a] dark:text-[#22c55e]" : "text-[#dc2626] dark:text-[#f87171]"
                }`}>
                  {positive ? "▲" : "▼"} {positive ? "+" : ""}{stock.change.toFixed(2)} ({positive ? "+" : ""}{stock.changePct.toFixed(2)}%)
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#f0f0ec] dark:bg-[#1a2e1e] text-[#666666] dark:text-[#8fa896] hover:text-[#001011] dark:hover:text-white transition-colors shrink-0"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="1" y1="1" x2="12" y2="12" />
              <line x1="12" y1="1" x2="1" y2="12" />
            </svg>
          </button>
        </div>

        {/* Chart */}
        <div className="px-6 pt-5 pb-2">
          <div className="bg-[#f8fdf4] dark:bg-[#091810] border border-[#e5e5e5] dark:border-[#1e3827] rounded-xl overflow-hidden p-3">
            <ModalSparkline prices={stock.sparkline} positive={positive} />
          </div>
          <div className="flex items-center justify-between mt-2 px-1">
            <span className="text-[10px] text-[#aaaaaa] dark:text-[#4a6655]">20 days</span>
            <span className="text-[10px] text-[#aaaaaa] dark:text-[#4a6655]">Today</span>
          </div>
        </div>

        {/* Key metrics */}
        <div className="px-6 py-4">
          <h3 className="text-[12px] font-bold text-[#888888] dark:text-[#8fa896] uppercase tracking-widest mb-3">
            Key Metrics
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {metrics.map(({ label, value }) => (
              <div
                key={label}
                className="bg-[#f8f8f5] dark:bg-[#132b1a] border border-[#eeeeea] dark:border-[#1e3827] rounded-lg px-3 py-2.5"
              >
                <p className="text-[10px] text-[#888888] dark:text-[#8fa896] mb-1">{label}</p>
                <p className="text-[14px] font-bold text-[#001011] dark:text-[#f0f0f0]">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Badges + description */}
        <div className="px-6 pb-6">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span
              className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold"
              style={{
                backgroundColor: sectorMeta?.bg,
                color: sectorMeta?.text,
              }}
            >
              <span className="dark:hidden">{stock.sector}</span>
              <span className="hidden dark:inline" style={{ color: sectorMeta?.darkText, backgroundColor: sectorMeta?.darkBg, padding: "2px 8px", borderRadius: 999 }}>
                {stock.sector}
              </span>
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#f0f4ff] dark:bg-[#0d1a2e] text-[#2563eb] dark:text-[#60a5fa]">
              {stock.exchange}
            </span>
          </div>
          <p className="text-[13px] text-[#555555] dark:text-[#8fa896] leading-relaxed">
            {stock.description}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════ */

export default function StocksPage() {
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [searchQuery,   setSearchQuery]   = useState("");
  const [activeFilter,  setActiveFilter]  = useState<Sector>("All");

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = selectedStock ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedStock]);

  const filtered = STOCKS.filter((s) => {
    const matchesSector = activeFilter === "All" || s.sector === activeFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || s.name.toLowerCase().includes(q) || s.symbol.toLowerCase().includes(q);
    return matchesSector && matchesSearch;
  });

  const handleClose = useCallback(() => setSelectedStock(null), []);

  return (
    <div className="min-h-screen bg-[#f5f5f0] dark:bg-[#0b1c11]">
      <DashNav />

      {/* ── Market Overview Bar ── */}
      <div className="bg-[#f0f0ea] dark:bg-[#0d1f14] border-b border-[#e0e0d8] dark:border-[#1e3827]">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-6">
          <div className="flex items-center gap-0 overflow-x-auto scrollbar-hide">
            {INDICES.map((idx, i) => (
              <div
                key={idx.name}
                className={`flex items-center gap-4 py-3 pr-6 ${
                  i > 0 ? "pl-6 border-l border-[#d8d8d0] dark:border-[#1e3827]" : ""
                } shrink-0`}
              >
                <div>
                  <p className="text-[10px] font-semibold text-[#888888] dark:text-[#8fa896] uppercase tracking-wider leading-none mb-1">
                    {idx.name}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-[14px] font-bold text-[#001011] dark:text-[#f0f0f0]">
                      {idx.value}
                    </span>
                    <span className={`text-[11px] font-semibold ${
                      idx.positive
                        ? "text-[#16a34a] dark:text-[#22c55e]"
                        : "text-[#dc2626] dark:text-[#f87171]"
                    }`}>
                      {idx.change} ({idx.changePct})
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <div className="ml-auto pl-6 border-l border-[#d8d8d0] dark:border-[#1e3827] shrink-0 py-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
                <span className="text-[10px] font-medium text-[#16a34a] dark:text-[#22c55e]">Markets Open</span>
              </div>
              <p className="text-[10px] text-[#aaaaaa] dark:text-[#4a6655] mt-0.5">NYSE · NASDAQ</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Page Content ── */}
      <div className="max-w-[1360px] mx-auto px-4 lg:px-6 py-8">

        {/* Page header + search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-[24px] font-bold text-[#001011] dark:text-[#f0f0f0]">Stock Market</h1>
            <p className="text-[13px] text-[#888888] dark:text-[#8fa896] mt-0.5">
              Track real-time prices, performance, and key metrics
            </p>
          </div>
          {/* Search */}
          <div className="relative sm:w-[280px]">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#aaaaaa] dark:text-[#4a6655] pointer-events-none">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search stocks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-4 border border-[#e5e5e5] dark:border-[#1e3827] bg-white dark:bg-[#0e1e14] text-[13px] text-[#001011] dark:text-[#f0f0f0] placeholder:text-[#aaaaaa] dark:placeholder:text-[#4a6655] rounded-lg outline-none focus:border-[#B0D45A] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#aaaaaa] dark:text-[#4a6655] hover:text-[#555555] dark:hover:text-[#8fa896] transition-colors"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="1" y1="1" x2="11" y2="11" />
                  <line x1="11" y1="1" x2="1" y2="11" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Sector filter pills */}
        <div className="flex items-center gap-2 flex-wrap mb-6">
          {SECTOR_FILTERS.map((sector) => (
            <button
              key={sector}
              onClick={() => setActiveFilter(sector)}
              className={`h-8 px-4 rounded-full text-[12px] font-semibold transition-all duration-150 ${
                activeFilter === sector
                  ? "bg-[#B0D45A] text-[#001011] shadow-sm"
                  : "border border-[#e5e5e5] dark:border-[#1e3827] text-[#555555] dark:text-[#8fa896] bg-white dark:bg-transparent hover:border-[#B0D45A] hover:text-[#001011] dark:hover:text-[#B0D45A]"
              }`}
            >
              {sector}
            </button>
          ))}
          <span className="ml-auto text-[12px] text-[#888888] dark:text-[#8fa896]">
            Showing <span className="font-bold text-[#001011] dark:text-[#f0f0f0]">{filtered.length}</span> of <span className="font-bold text-[#001011] dark:text-[#f0f0f0]">{STOCKS.length}</span> stocks
          </span>
        </div>

        {/* Stock grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((stock) => (
              <StockCard
                key={stock.symbol}
                stock={stock}
                onClick={() => setSelectedStock(stock)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-14 h-14 rounded-full bg-[#f0f0ea] dark:bg-[#132b1a] flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8fa896" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <p className="text-[15px] font-semibold text-[#001011] dark:text-[#f0f0f0] mb-1">No stocks found</p>
            <p className="text-[13px] text-[#888888] dark:text-[#8fa896]">
              Try adjusting your search or filter
            </p>
          </div>
        )}
      </div>

      {/* ── Stock Detail Modal ── */}
      {selectedStock && (
        <StockModal stock={selectedStock} onClose={handleClose} />
      )}
    </div>
  );
}
