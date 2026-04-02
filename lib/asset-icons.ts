/**
 * Asset icon mapping for the Trade Copied section.
 *
 * `color`  — badge background color shown as fallback / behind the icon
 * `textColor` — text color for the ticker initials
 * `icon`   — path relative to /public/trade-assets/ (add the PNG/SVG there to show a logo)
 *             Leave as null to show the colored-initial badge instead.
 */

export interface AssetMeta {
  color:     string;
  textColor: string;
  icon:      string | null;
}

const STOCK_COLOR  = { color: "#1e293b", textColor: "#94a3b8" };
const CRYPTO_COLOR = { color: "#1c1a0e", textColor: "#f59e0b" };
const FOREX_COLOR  = { color: "#0a1e14", textColor: "#4ade80" };

const ASSET_META: Record<string, AssetMeta> = {
  // ── Stocks ──────────────────────────────────────────────────────────────────
  AAPL:  { color: "#1c1c1e", textColor: "#e2e2e2", icon: "/trade-assets/AAPL.png"  },
  MSFT:  { color: "#0a2240", textColor: "#5ba4f5", icon: "/trade-assets/MSFT.png"  },
  GOOGL: { color: "#0d1f12", textColor: "#34a853", icon: "/trade-assets/GOOGL.png" },
  AMZN:  { color: "#1a0f00", textColor: "#ff9900", icon: "/trade-assets/AMZN.png"  },
  TSLA:  { color: "#1a0505", textColor: "#e82127", icon: "/trade-assets/TSLA.png"  },
  META:  { color: "#001a3a", textColor: "#1877f2", icon: "/trade-assets/META.png"  },
  NVDA:  { color: "#0d1a0d", textColor: "#76b900", icon: "/trade-assets/NVDA.png"  },
  JPM:   { ...STOCK_COLOR, icon: null },
  NFLX:  { color: "#1a0404", textColor: "#e50914", icon: "/trade-assets/NFLX.png"  },
  SPY:   { ...STOCK_COLOR, icon: null },
  QQQ:   { ...STOCK_COLOR, icon: null },
  BAC:   { ...STOCK_COLOR, icon: null },
  V:     { color: "#00017a", textColor: "#f7a600", icon: "/trade-assets/V.png"     },
  AMD:   { color: "#1a0505", textColor: "#ed1c24", icon: null },
  WMT:   { color: "#002d62", textColor: "#ffc220", icon: null },
  DIS:   { ...STOCK_COLOR, icon: null },
  PYPL:  { color: "#001432", textColor: "#009cde", icon: null },
  COIN:  { color: "#001e3c", textColor: "#0052ff", icon: null },
  SPX:   { ...STOCK_COLOR, icon: null },
  NDX:   { ...STOCK_COLOR, icon: null },
  BABA:  { color: "#1a0900", textColor: "#ff6a00", icon: null },
  INTC:  { color: "#001a40", textColor: "#0071c5", icon: null },
  GS:    { ...STOCK_COLOR, icon: null },
  MS:    { ...STOCK_COLOR, icon: null },
  UBER:  { color: "#0d0d0d", textColor: "#ffffff", icon: null },

  // ── Crypto ──────────────────────────────────────────────────────────────────
  BTC:   { color: "#1a0e00", textColor: "#f7931a", icon: "/trade-assets/BTC.png"   },
  ETH:   { color: "#0d0d2a", textColor: "#627eea", icon: "/trade-assets/ETH.png"   },
  BNB:   { color: "#1a1400", textColor: "#f3ba2f", icon: "/trade-assets/BNB.png"   },
  SOL:   { color: "#0a0a1a", textColor: "#9945ff", icon: "/trade-assets/SOL.png"   },
  XRP:   { color: "#001a2a", textColor: "#00aae4", icon: "/trade-assets/XRP.png"   },
  ADA:   { color: "#000d2a", textColor: "#0d83cd", icon: null },
  DOGE:  { color: "#1a1400", textColor: "#c3a634", icon: "/trade-assets/DOGE.png"  },
  AVAX:  { color: "#1a0000", textColor: "#e84142", icon: null },
  DOT:   { color: "#1a0010", textColor: "#e6007a", icon: null },
  MATIC: { color: "#0d0025", textColor: "#8247e5", icon: null },
  LTC:   { color: "#0d0d1a", textColor: "#a6a9aa", icon: null },
  LINK:  { color: "#00092a", textColor: "#2a5ada", icon: null },
  UNI:   { color: "#1a0014", textColor: "#ff007a", icon: null },
  ATOM:  { color: "#0a0a1a", textColor: "#6f7390", icon: null },
  SHIB:  { color: "#1a0500", textColor: "#e7423c", icon: null },
  TRX:   { color: "#1a0000", textColor: "#ef0027", icon: null },
  FIL:   { color: "#001a2a", textColor: "#0090ff", icon: null },
  NEAR:  { color: "#0d0d0d", textColor: "#ffffff", icon: null },
  APT:   { color: "#080820", textColor: "#4daaff", icon: null },
  ARB:   { color: "#001a2a", textColor: "#28a0f0", icon: null },

  // ── Forex ───────────────────────────────────────────────────────────────────
  "EUR/USD": { ...FOREX_COLOR, icon: null },
  "GBP/USD": { ...FOREX_COLOR, icon: null },
  "USD/JPY": { ...FOREX_COLOR, icon: null },
  "USD/CHF": { ...FOREX_COLOR, icon: null },
  "AUD/USD": { ...FOREX_COLOR, icon: null },
  "USD/CAD": { ...FOREX_COLOR, icon: null },
  "NZD/USD": { ...FOREX_COLOR, icon: null },
  "EUR/GBP": { ...FOREX_COLOR, icon: null },
  "EUR/JPY": { ...FOREX_COLOR, icon: null },
  "GBP/JPY": { ...FOREX_COLOR, icon: null },
  "EUR/CHF": { ...FOREX_COLOR, icon: null },
  "AUD/JPY": { ...FOREX_COLOR, icon: null },
  "USD/MXN": { ...FOREX_COLOR, icon: null },
  "USD/ZAR": { ...FOREX_COLOR, icon: null },
};

const FALLBACK: AssetMeta = { color: "#1e2a20", textColor: "#8fa896", icon: null };

export function getAssetMeta(ticker: string): AssetMeta {
  return ASSET_META[ticker] ?? FALLBACK;
}
