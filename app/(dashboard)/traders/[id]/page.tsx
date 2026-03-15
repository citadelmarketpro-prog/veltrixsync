"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import DashNav from "@/components/DashNav";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

/* ══════════════════════════════════════════════════════════════
   TYPES
══════════════════════════════════════════════════════════════ */

interface TraderDetail {
  id: number;
  name: string;
  desc: string;
  minCapitalDisplay: string;
  copiers: number;
  followers_count: number;
  trading_days: number;
  tags: string[];
  color: string;
  initials: string;
  avatar_url: string | null;
  roi_display: string;
  masterPnl: string;
  accountAssets: string;
  maxDrawdown: string;
  riskDisplay: string;
  cumEarnings: string;
  cumCopiers: string;
  profitShare: string;
  winRate: string;
  min_capital: string;
  is_copying: boolean;
  copy_status: "active" | "cancel_requested" | null;
  top_assets: TopAsset[];
  portfolio_allocations: PortfolioAlloc[];
}

interface TopAsset {
  icon_url: string | null;
  name: string;
  ticker: string;
  avg_return: string;
  avg_risk: string;
  risk_label: string;
  success_rate: string;
}

interface PortfolioAlloc {
  label: string;
  pct: number;
  color: string;
}

interface Position {
  market: string;
  date: string;
  direction: string;
  invested: string;
  pl: string;
  plPositive: boolean;
  value: string;
  sell: string;
  buy: string;
}

interface TradeHistoryItem {
  name: string;
  date: string;
  orderType: string;
  position: string;
  open: string;
  openDate: string;
  close: string;
  closeDate: string;
  pl: string;
  plPositive: boolean;
}

interface Copier {
  name: string;
  date: string;
  copyDays: number;
  assets: string;
  pl: string;
}

interface SimilarTrader {
  id: number;
  name: string;
  role: string;
  tags: string[];
  profit: string;
  copiers: number;
  color: string;
  initials: string;
  avatar_url: string | null;
}

type Tab = "overview" | "portfolio" | "history" | "copiers";
const TIME_FILTERS = ["Week", "1D", "1H", "1W", "1M", "1Y"] as const;

/* ══════════════════════════════════════════════════════════════
   AVATAR
══════════════════════════════════════════════════════════════ */

function TraderAvatar({
  avatarUrl,
  initials,
  color,
  size = "lg",
}: {
  avatarUrl: string | null;
  initials: string;
  color: string;
  size?: "sm" | "md" | "lg";
}) {
  const cls =
    size === "lg"
      ? "w-[64px] h-[64px] sm:w-[80px] sm:h-[80px] text-[18px] sm:text-[22px]"
      : size === "md"
      ? "w-10 h-10 text-[13px]"
      : "w-9 h-9 text-[11px]";

  if (avatarUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={avatarUrl}
        alt={initials}
        className={`${cls} rounded-full shrink-0 object-cover`}
      />
    );
  }
  return (
    <div
      className={`${cls} rounded-full shrink-0 flex items-center justify-center font-bold text-white`}
      style={{ backgroundColor: color }}
    >
      {initials}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════ */

export default function TraderDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [trader, setTrader] = useState<TraderDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const [positions, setPositions] = useState<Position[]>([]);
  const [history, setHistory] = useState<TradeHistoryItem[]>([]);
  const [copiers, setCopiers] = useState<Copier[]>([]);
  const [similar, setSimilar] = useState<SimilarTrader[]>([]);

  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [timeFilter, setTimeFilter] = useState<string>("Week");
  const [isCopying, setIsCopying] = useState(false);
  const [cancelRequested, setCancelRequested] = useState(false);
  const [copyLoading, setCopyLoading] = useState(false);

  const { user } = useAuth();

  const handleCopy = useCallback(async () => {
    if (!trader || !user) return;
    const funds = parseFloat(user.balance) + parseFloat(user.profit);
    const minCap = parseFloat(String(trader.min_capital));
    if (funds < minCap) {
      toast.error("Insufficient balance", {
        description: `You need at least ${trader.minCapitalDisplay} to copy this trader.`,
      });
      return;
    }
    try {
      setCopyLoading(true);
      await api.post(`/api/traders/${id}/copy/`);
      setIsCopying(true);
    } catch {
      toast.error("Failed to start copying. Please try again.");
    } finally {
      setCopyLoading(false);
    }
  }, [trader, user, id]);

  const handleCancel = useCallback(async () => {
    try {
      setCopyLoading(true);
      await api.delete(`/api/traders/${id}/copy/`);
      setIsCopying(false);
      setCancelRequested(true);
      toast.success("Cancel requested", {
        description: "Your request has been submitted. An admin will review and confirm.",
      });
    } catch {
      toast.error("Failed to request cancel. Please try again.");
    } finally {
      setCopyLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (!id) return;
    setLoading(true);

    Promise.all([
      api.get<TraderDetail>(`/api/traders/${id}/`),
      api.get<Position[]>(`/api/traders/${id}/positions/`),
      api.get<TradeHistoryItem[]>(`/api/traders/${id}/history/`),
      api.get<Copier[]>(`/api/traders/${id}/copiers/`),
      api.get<SimilarTrader[]>(`/api/traders/${id}/similar/`),
    ])
      .then(([traderData, posData, histData, copData, simData]) => {
        setTrader(traderData);
        setIsCopying(traderData.copy_status === "active");
        setCancelRequested(traderData.copy_status === "cancel_requested");
        setPositions(Array.isArray(posData) ? posData : []);
        setHistory(Array.isArray(histData) ? histData : []);
        setCopiers(Array.isArray(copData) ? copData : []);
        setSimilar(Array.isArray(simData) ? simData : []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const tabs: { key: Tab; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "portfolio", label: "Portfolio" },
    { key: "history", label: "Trade History" },
    { key: "copiers", label: "Copiers" },
  ];

  return (
    <div className="min-h-screen bg-[#f5f6f0] dark:bg-[#0a1810]">
      <DashNav />

      <div className="max-w-[1280px] mx-auto px-4 lg:px-6">
        {/* Back */}
        <div className="pt-5 pb-4">
          <Link
            href="/traders"
            className="inline-flex items-center gap-1.5 text-[13px] text-[#555555] dark:text-[#8fa896] hover:text-[#001011] dark:hover:text-white transition-colors"
          >
            <ChevronLeftIcon />
            Back
          </Link>
        </div>

        {loading || !trader ? (
          <div className="flex items-center justify-center py-24 text-[#888888] dark:text-[#4a6655] text-[14px]">
            Loading trader…
          </div>
        ) : (
          <>
            {/* ── Trader header ── */}
            <div className="bg-white dark:bg-[#0e1e14] border border-[#e5e5e5] dark:border-[#1e3827] px-4 sm:px-6 lg:px-8 pt-6 pb-0">
              {/* Profile row */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
                {/* Left: avatar + info */}
                <div className="flex items-start gap-4 sm:gap-5">
                  <TraderAvatar
                    avatarUrl={trader.avatar_url}
                    initials={trader.initials}
                    color={trader.color}
                    size="lg"
                  />

                  <div className="min-w-0 flex-1">
                    <h1 className="text-[18px] sm:text-[20px] font-bold text-[#001011] dark:text-white leading-tight mb-3">
                      {trader.name}
                    </h1>

                    {/* Stats inline */}
                    <div className="flex flex-wrap items-start gap-x-6 gap-y-2 mb-4">
                      {[
                        { value: trader.minCapitalDisplay, label: "Min Capital" },
                        { value: trader.copiers, label: "Copiers" },
                        { value: trader.followers_count, label: "Followers" },
                        { value: trader.trading_days, label: "Trading days" },
                      ].map(({ value, label }) => (
                        <div key={label}>
                          <p className="text-[15px] sm:text-[17px] font-bold text-[#001011] dark:text-white leading-none">
                            {value}
                          </p>
                          <p className="text-[11px] text-[#888888] dark:text-[#4a6655] mt-0.5">
                            {label}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {trader.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-[12px] font-medium text-[#555555] dark:text-[#8fa896] border border-[#e5e5e5] dark:border-[#1e3827] bg-white dark:bg-transparent"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: icon + CTA */}
                <div className="flex items-center gap-3 shrink-0 sm:self-start">
                  <button className="w-9 h-9 flex items-center justify-center text-[#555555] dark:text-[#8fa896] hover:text-[#001011] dark:hover:text-white transition-colors border border-[#e5e5e5] dark:border-[#1e3827]">
                    <CopySettingsIcon />
                  </button>
                  {cancelRequested ? (
                    <span
                      className="h-9 flex items-center px-5 text-[13px] font-bold gap-2"
                      style={{ backgroundColor: "#2a1f00", color: "#fbbf24", border: "1px solid #92400e" }}
                    >
                      <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                      Cancel Requested
                    </span>
                  ) : isCopying ? (
                    <>
                      <span
                        className="h-9 flex items-center px-5 text-[13px] font-bold text-[#001011] gap-2"
                        style={{ backgroundColor: "#C1E963" }}
                      >
                        <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
                        Copying
                      </span>
                      <button
                        onClick={handleCancel}
                        disabled={copyLoading}
                        className="h-9 px-4 text-[13px] font-bold text-[#dc2626] border border-[#dc2626] hover:bg-[#fef2f2] dark:hover:bg-[#2a1010] transition-colors disabled:opacity-50"
                      >
                        {copyLoading ? "..." : "Cancel"}
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleCopy}
                      disabled={copyLoading}
                      className="h-9 flex-1 sm:flex-none px-5 text-[13px] font-bold text-[#001011] transition-opacity hover:opacity-90 disabled:opacity-50"
                      style={{ backgroundColor: "#C1E963" }}
                    >
                      {copyLoading ? "..." : "Copy Trader"}
                    </button>
                  )}
                </div>
              </div>

              {/* Tab nav */}
              <div className="flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden border-t border-[#f0f0ec] dark:border-[#1e3827] -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
                {tabs.map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`relative h-11 px-3 sm:px-4 text-[13px] font-medium transition-colors whitespace-nowrap mr-1 sm:mr-2 shrink-0 ${
                      activeTab === key
                        ? "text-[#001011] dark:text-white"
                        : "text-[#888888] dark:text-[#4a6655] hover:text-[#001011] dark:hover:text-white"
                    }`}
                  >
                    {label}
                    {activeTab === key && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B0D45A]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Tab content ── */}
            <div className="mt-5 pb-12">
              {activeTab === "overview" && (
                <OverviewTab
                  trader={trader}
                  similar={similar}
                  timeFilter={timeFilter}
                  setTimeFilter={setTimeFilter}
                />
              )}
              {activeTab === "portfolio" && <PortfolioTab positions={positions} />}
              {activeTab === "history" && <TradeHistoryTab history={history} />}
              {activeTab === "copiers" && <CopiersTab copiers={copiers} />}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   OVERVIEW TAB
══════════════════════════════════════════════════════════════ */

function OverviewTab({
  trader,
  similar,
  timeFilter,
  setTimeFilter,
}: {
  trader: TraderDetail;
  similar: SimilarTrader[];
  timeFilter: string;
  setTimeFilter: (f: string) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col gap-5">
      {/* Row 1: Chart + Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5">
        {/* Portfolio chart card */}
        <div className="bg-white dark:bg-[#0e1e14] border border-[#e5e5e5] dark:border-[#1e3827] p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-1">
            <div className="flex items-center gap-2 text-[12px] text-[#888888] dark:text-[#4a6655]">
              <span className="font-medium text-[#001011] dark:text-white">Portfolio</span>
              <span>|</span>
              <span>Last 90 days</span>
            </div>
            <div className="flex items-center gap-0.5 overflow-x-auto [scrollbar-width:none]">
              {TIME_FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setTimeFilter(f)}
                  className={`h-6 px-2 text-[11px] font-medium transition-colors ${
                    timeFilter === f
                      ? "bg-[#B0D45A] text-[#001011]"
                      : "text-[#888888] dark:text-[#4a6655] hover:text-[#001011] dark:hover:text-white"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-[24px] sm:text-[32px] font-bold text-[#001011] dark:text-white leading-none">
              {trader.accountAssets}
            </span>
            <span className="text-[13px] font-semibold text-[#16a34a] dark:text-[#22c55e] flex items-center gap-0.5">
              {trader.roi_display}
              <MiniTrendUp />
            </span>
          </div>

          {/* Chart SVG */}
          <div className="w-full overflow-hidden">
            <svg viewBox="0 0 580 200" preserveAspectRatio="none" className="w-full h-[180px]">
              <defs>
                <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#B0D45A" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#B0D45A" stopOpacity="0.02" />
                </linearGradient>
              </defs>
              <path
                d="M0,168 C10,165 15,160 22,155 C30,148 35,140 45,132 C55,124 60,130 70,126 C80,122 85,118 95,112 C105,106 110,100 120,95 C130,90 135,98 145,102 C155,106 160,100 170,94 C180,88 185,78 195,70 C205,62 210,68 220,72 C230,76 235,82 245,88 C255,94 260,100 270,106 C280,112 285,104 295,98 C305,92 310,86 320,80 C330,74 335,68 345,62 C355,56 360,64 370,70 C380,76 385,72 395,66 C405,60 410,54 420,50 C430,46 435,40 445,36 C455,32 460,26 470,22 C480,18 485,14 495,12 C505,10 510,8 520,6 C530,4 540,3 550,2 C560,1 570,1 580,0 L580,200 L0,200 Z"
                fill="url(#chartFill)"
              />
              <path
                d="M0,168 C10,165 15,160 22,155 C30,148 35,140 45,132 C55,124 60,130 70,126 C80,122 85,118 95,112 C105,106 110,100 120,95 C130,90 135,98 145,102 C155,106 160,100 170,94 C180,88 185,78 195,70 C205,62 210,68 220,72 C230,76 235,82 245,88 C255,94 260,100 270,106 C280,112 285,104 295,98 C305,92 310,86 320,80 C330,74 335,68 345,62 C355,56 360,64 370,70 C380,76 385,72 395,66 C405,60 410,54 420,50 C430,46 435,40 445,36 C455,32 460,26 470,22 C480,18 485,14 495,12 C505,10 510,8 520,6 C530,4 540,3 550,2 C560,1 570,1 580,0"
                fill="none"
                stroke="#B0D45A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="flex justify-between mt-2 px-1">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
              (m, i) => (
                <span
                  key={m}
                  className={`text-[10px] text-[#aaaaaa] dark:text-[#3a5040] ${
                    i % 2 !== 0 ? "hidden sm:inline" : ""
                  }`}
                >
                  {m}
                </span>
              )
            )}
          </div>
        </div>

        {/* Trader Stats card */}
        <div className="bg-white dark:bg-[#0e1e14] border border-[#e5e5e5] dark:border-[#1e3827] p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[16px] font-bold text-[#001011] dark:text-white">Trader Stats</h3>
            <button className="flex items-center gap-1 text-[12px] text-[#555555] dark:text-[#8fa896] border border-[#e5e5e5] dark:border-[#1e3827] px-2.5 py-1 hover:bg-[#f5f5f5] dark:hover:bg-[#132b1a] transition-colors">
              90 days
              <ChevronDownIcon />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <div className="flex items-center gap-1">
                <span className="text-[16px] sm:text-[18px] font-bold text-[#001011] dark:text-white">
                  {trader.roi_display}
                </span>
                <MiniTrendUp />
              </div>
              <p className="text-[11px] text-[#888888] dark:text-[#4a6655]">ROI(1M)</p>
            </div>
            <div>
              <div className="flex items-center gap-1 flex-wrap">
                <span className="text-[14px] sm:text-[18px] font-bold text-[#16a34a] dark:text-[#22c55e]">
                  {trader.masterPnl}
                </span>
                <MiniTrendUp color="#16a34a" />
              </div>
              <p className="text-[11px] text-[#888888] dark:text-[#4a6655]">Master&apos;s PnL</p>
            </div>
          </div>

          <div className="h-px bg-[#f0f0ec] dark:bg-[#1e3827] mb-4" />

          {[
            { label: "Account Assets", value: trader.accountAssets, green: false },
            { label: "Max. Drawdown", value: trader.maxDrawdown, green: false },
            { label: "Risk", value: trader.riskDisplay, green: true },
            { label: "Cum. Earnings of Copiers", value: trader.cumEarnings, green: true },
            { label: "Cum. Copiers", value: trader.cumCopiers, green: false },
            { label: "Profit Share (%)", value: trader.profitShare, green: false },
            { label: "Win rate", value: trader.winRate, green: false },
          ].map(({ label, value, green }) => (
            <div
              key={label}
              className="flex items-center justify-between py-2 border-b border-[#f5f5f0] dark:border-[#192e1e] last:border-0"
            >
              <span className="text-[12px] text-[#888888] dark:text-[#4a6655]">{label}</span>
              <span
                className={`text-[13px] font-semibold ${
                  green
                    ? "text-[#16a34a] dark:text-[#22c55e]"
                    : "text-[#001011] dark:text-white"
                }`}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Top assets + Portfolio allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5">
        {/* Top assets */}
        <div className="bg-white dark:bg-[#0e1e14] border border-[#e5e5e5] dark:border-[#1e3827] p-4 sm:p-5">
          <h3 className="text-[16px] font-bold text-[#001011] dark:text-white mb-4">Top assets</h3>
          <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="min-w-[460px]">
              {trader.top_assets.map((asset, i) => (
                <div
                  key={asset.ticker}
                  className={`flex items-center gap-3 sm:gap-4 py-3.5 ${
                    i < trader.top_assets.length - 1
                      ? "border-b border-[#f0f0ec] dark:border-[#1e3827]"
                      : ""
                  }`}
                >
                  <div className="w-9 h-9 rounded-full bg-[#1a1a1a] dark:bg-[#0a1008] flex items-center justify-center shrink-0 overflow-hidden">
                    {asset.icon_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={asset.icon_url} alt={asset.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-[9px] font-bold text-white">{asset.name[0]}</span>
                    )}
                  </div>
                  <div className="w-[90px] sm:w-[110px] shrink-0">
                    <p className="text-[13px] font-semibold text-[#001011] dark:text-white">
                      {asset.name}
                    </p>
                    <p className="text-[11px] text-[#888888] dark:text-[#4a6655]">{asset.ticker}</p>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="flex items-center justify-center gap-0.5">
                      <span className="text-[12px] sm:text-[13px] font-semibold text-[#16a34a] dark:text-[#22c55e]">
                        {asset.avg_return}
                      </span>
                      <MiniTrendUp color="#16a34a" />
                    </div>
                    <p className="text-[10px] text-[#888888] dark:text-[#4a6655]">Avg. Return</p>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="flex items-center justify-center gap-0.5">
                      <span className="text-[12px] sm:text-[13px] font-semibold text-[#dc2626] dark:text-[#f87171]">
                        {asset.avg_risk}
                      </span>
                      <MiniTrendDown />
                    </div>
                    <p className="text-[10px] text-[#888888] dark:text-[#4a6655]">
                      {asset.risk_label}
                    </p>
                  </div>
                  <div className="flex-1 text-right">
                    <p className="text-[12px] sm:text-[13px] font-semibold text-[#001011] dark:text-white">
                      {asset.success_rate}
                    </p>
                    <p className="text-[10px] text-[#888888] dark:text-[#4a6655]">Success Rate</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Portfolio allocation */}
        <div className="bg-white dark:bg-[#0e1e14] border border-[#e5e5e5] dark:border-[#1e3827] p-4 sm:p-5">
          <h3 className="text-[16px] font-bold text-[#001011] dark:text-white mb-1">
            Portfolio Allocation
          </h3>
          <p className="text-[11px] text-[#888888] dark:text-[#4a6655] mb-5">
            This breakdown includes 92.7% of this portfolio
          </p>

          <div className="flex justify-between mb-2">
            {trader.portfolio_allocations.map(({ label, pct }) => (
              <div key={label}>
                <p className="text-[12px] font-semibold text-[#001011] dark:text-white">{label}</p>
                <p className="text-[12px] text-[#888888] dark:text-[#4a6655]">{pct}%</p>
              </div>
            ))}
          </div>

          <div className="flex h-2 overflow-hidden gap-0.5">
            {trader.portfolio_allocations.map(({ label, pct, color }) => (
              <div key={label} className="h-full" style={{ width: `${pct}%`, backgroundColor: color }} />
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Similar traders */}
      <div className="bg-white dark:bg-[#0e1e14] border border-[#e5e5e5] dark:border-[#1e3827] p-4 sm:p-5">
        <h3 className="text-[16px] font-bold text-[#001011] dark:text-white mb-0.5">
          Top performing traders
        </h3>
        <p className="text-[12px] text-[#888888] dark:text-[#4a6655] mb-4">
          Investors with similar strategies to {trader.name.split(" ")[0]}
        </p>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-1"
        >
          {similar.map((t) => (
            <SimilarTraderCard key={t.id} trader={t} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   PORTFOLIO TAB
══════════════════════════════════════════════════════════════ */

function PortfolioTab({ positions }: { positions: Position[] }) {
  return (
    <div className="bg-white dark:bg-[#0e1e14] border border-[#e5e5e5] dark:border-[#1e3827] p-5 lg:p-6">
      <h3 className="text-[18px] font-bold text-[#001011] dark:text-white">Portfolio</h3>
      <p className="text-[12px] text-[#888888] dark:text-[#4a6655] mb-5">Last updated: now</p>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-[#f0f0ec] dark:border-[#1e3827]">
              <th className="text-left py-2.5 text-[12px] font-medium text-[#888888] dark:text-[#4a6655] pr-4">
                Market ({positions.length})
              </th>
              <th className="text-left py-2.5 text-[12px] font-medium text-[#888888] dark:text-[#4a6655] pr-4">
                Direction
              </th>
              <th className="text-left py-2.5 text-[12px] font-medium text-[#888888] dark:text-[#4a6655] pr-4">
                Invested
              </th>
              <th className="text-left py-2.5 text-[12px] font-medium text-[#888888] dark:text-[#4a6655] pr-4">
                P/L (%)
              </th>
              <th className="text-left py-2.5 text-[12px] font-medium text-[#888888] dark:text-[#4a6655] pr-4">
                Value
              </th>
              <th className="text-left py-2.5 text-[12px] font-medium text-[#888888] dark:text-[#4a6655] pr-4">
                Sell
              </th>
              <th className="text-left py-2.5 text-[12px] font-medium text-[#888888] dark:text-[#4a6655]">
                Buy
              </th>
            </tr>
          </thead>
          <tbody>
            {positions.map((pos, i) => (
              <tr key={i} className="border-b border-[#f5f5f0] dark:border-[#192e1e] last:border-0">
                <td className="py-4 pr-4">
                  <div className="flex items-center gap-3">
                    <XMarkCircleIcon />
                    <div>
                      <p className="text-[13px] font-semibold text-[#001011] dark:text-white">
                        {pos.market}
                      </p>
                      <p className="text-[11px] text-[#888888] dark:text-[#4a6655]">
                        {formatDate(pos.date)}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-4 pr-4 text-[13px] text-[#001011] dark:text-white">
                  {pos.direction}
                </td>
                <td className="py-4 pr-4 text-[13px] text-[#001011] dark:text-white">
                  {pos.invested}
                </td>
                <td
                  className={`py-4 pr-4 text-[13px] font-semibold ${
                    pos.plPositive
                      ? "text-[#16a34a] dark:text-[#22c55e]"
                      : "text-[#dc2626] dark:text-[#f87171]"
                  }`}
                >
                  {pos.pl}
                </td>
                <td className="py-4 pr-4 text-[13px] text-[#001011] dark:text-white">{pos.value}</td>
                <td className="py-4 pr-4 text-[13px] text-[#001011] dark:text-white">{pos.sell}</td>
                <td className="py-4 text-[13px] text-[#001011] dark:text-white">{pos.buy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   TRADE HISTORY TAB
══════════════════════════════════════════════════════════════ */

function TradeHistoryTab({ history }: { history: TradeHistoryItem[] }) {
  return (
    <div className="bg-white dark:bg-[#0e1e14] border border-[#e5e5e5] dark:border-[#1e3827] p-5 lg:p-6">
      <h3 className="text-[18px] font-bold text-[#001011] dark:text-white">Trade History</h3>
      <p className="text-[12px] text-[#888888] dark:text-[#4a6655] mb-5">Last updated: Now</p>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[780px]">
          <thead>
            <tr className="border-b border-[#f0f0ec] dark:border-[#1e3827]">
              <th className="text-left py-2.5 text-[12px] font-medium text-[#888888] dark:text-[#4a6655] pr-4">
                ETH/USD ({history.length})
              </th>
              <th className="text-left py-2.5 text-[12px] font-medium text-[#888888] dark:text-[#4a6655] pr-4">
                Order Type
              </th>
              <th className="text-left py-2.5 text-[12px] font-medium text-[#888888] dark:text-[#4a6655] pr-4">
                Position
              </th>
              <th className="text-left py-2.5 text-[12px] font-medium text-[#888888] dark:text-[#4a6655] pr-4">
                Open
              </th>
              <th className="text-left py-2.5 text-[12px] font-medium text-[#888888] dark:text-[#4a6655] pr-4">
                Close
              </th>
              <th className="text-left py-2.5 text-[12px] font-medium text-[#888888] dark:text-[#4a6655]">
                P/L(%)
              </th>
            </tr>
          </thead>
          <tbody>
            {history.map((trade, i) => (
              <tr key={i} className="border-b border-[#f5f5f0] dark:border-[#192e1e] last:border-0">
                <td className="py-4 pr-4">
                  <div className="flex items-center gap-3">
                    <XMarkCircleIcon />
                    <div>
                      <p className="text-[13px] font-semibold text-[#001011] dark:text-white">
                        {trade.name}
                      </p>
                      <p className="text-[11px] text-[#888888] dark:text-[#4a6655]">
                        {formatDate(trade.date)}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-4 pr-4 text-[13px] text-[#001011] dark:text-white">
                  {trade.orderType}
                </td>
                <td className="py-4 pr-4 text-[13px] text-[#001011] dark:text-white">
                  {trade.position}
                </td>
                <td className="py-4 pr-4">
                  <p className="text-[13px] font-semibold text-[#001011] dark:text-white">
                    {trade.open}
                  </p>
                  <p className="text-[10px] text-[#888888] dark:text-[#4a6655]">
                    {formatDate(trade.openDate)}
                  </p>
                </td>
                <td className="py-4 pr-4">
                  <p className="text-[13px] font-semibold text-[#001011] dark:text-white">
                    {trade.close}
                  </p>
                  <p className="text-[10px] text-[#888888] dark:text-[#4a6655]">
                    {formatDate(trade.closeDate)}
                  </p>
                </td>
                <td
                  className={`py-4 text-[13px] font-semibold ${
                    trade.plPositive
                      ? "text-[#16a34a] dark:text-[#22c55e]"
                      : "text-[#dc2626] dark:text-[#f87171]"
                  }`}
                >
                  {trade.pl}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   COPIERS TAB
══════════════════════════════════════════════════════════════ */

function CopiersTab({ copiers }: { copiers: Copier[] }) {
  return (
    <div className="bg-white dark:bg-[#0e1e14] border border-[#e5e5e5] dark:border-[#1e3827] p-5 lg:p-6">
      <h3 className="text-[18px] font-bold text-[#001011] dark:text-white">Copiers</h3>
      <p className="text-[12px] text-[#888888] dark:text-[#4a6655] mb-5">Last updated: now</p>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-[#f0f0ec] dark:border-[#1e3827]">
              <th className="text-left py-2.5 text-[12px] font-medium text-[#888888] dark:text-[#4a6655] pr-4">
                Copier ({copiers.length})
              </th>
              <th className="text-left py-2.5 text-[12px] font-medium text-[#888888] dark:text-[#4a6655] pr-4">
                Copy days
              </th>
              <th className="text-left py-2.5 text-[12px] font-medium text-[#888888] dark:text-[#4a6655] pr-4">
                Copy assets(USDT)
              </th>
              <th className="text-left py-2.5 text-[12px] font-medium text-[#888888] dark:text-[#4a6655]">
                P/L(USDT)
              </th>
            </tr>
          </thead>
          <tbody>
            {copiers.map((c, i) => (
              <tr key={i} className="border-b border-[#f5f5f0] dark:border-[#192e1e] last:border-0">
                <td className="py-4 pr-4">
                  <div className="flex items-center gap-3">
                    <XMarkCircleIcon />
                    <div>
                      <p className="text-[13px] font-semibold text-[#001011] dark:text-white">
                        {c.name}
                      </p>
                      <p className="text-[11px] text-[#888888] dark:text-[#4a6655]">
                        {formatDate(c.date)}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-4 pr-4 text-[13px] text-[#001011] dark:text-white">
                  {c.copyDays}
                </td>
                <td className="py-4 pr-4 text-[13px] text-[#001011] dark:text-white">{c.assets}</td>
                <td className="py-4 text-[13px] font-semibold text-[#16a34a] dark:text-[#22c55e]">
                  {c.pl}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SIMILAR TRADER CARD
══════════════════════════════════════════════════════════════ */

function SimilarTraderCard({ trader }: { trader: SimilarTrader }) {
  return (
    <Link
      href={`/traders/${trader.id}`}
      className="min-w-[240px] max-w-[240px] border border-[#e5e5e5] dark:border-[#1e3827] bg-[#fafaf8] dark:bg-[#0b1a10] flex flex-col shrink-0 overflow-hidden p-4 gap-3 hover:border-[#B0D45A] transition-colors"
    >
      <div className="flex items-center gap-2.5">
        <TraderAvatar
          avatarUrl={trader.avatar_url}
          initials={trader.initials}
          color={trader.color}
          size="sm"
        />
        <div className="min-w-0">
          <p className="text-[13px] font-bold text-[#001011] dark:text-white truncate">
            {trader.name}
          </p>
          <p className="text-[11px] text-[#888888] dark:text-[#4a6655] truncate">{trader.role}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {trader.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 text-[10px] font-medium border border-[#e5e5e5] dark:border-[#1e3827] text-[#555555] dark:text-[#8fa896]"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1">
            <span className="text-[18px] font-bold text-[#001011] dark:text-white">
              {trader.profit}
            </span>
            <MiniTrendUp color="#16a34a" />
          </div>
          <p className="text-[10px] text-[#888888] dark:text-[#4a6655]">Profit (1M)</p>
        </div>
        <div className="text-right">
          <div className="flex items-center justify-end gap-1">
            <span className="text-[18px] font-bold text-[#001011] dark:text-white">
              {trader.copiers}
            </span>
            <MiniTrendUp color="#16a34a" />
          </div>
          <p className="text-[10px] text-[#888888] dark:text-[#4a6655]">Copiers</p>
        </div>
      </div>

      <div className="w-full h-9 border border-[#e5e5e5] dark:border-[#1e3827] text-[12px] font-bold text-[#001011] dark:text-white flex items-center justify-center hover:bg-white dark:hover:bg-[#132b1a] transition-colors">
        Copy trader
      </div>
    </Link>
  );
}

/* ══════════════════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════════════════ */

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  } catch {
    return iso;
  }
}

/* ══════════════════════════════════════════════════════════════
   ICONS
══════════════════════════════════════════════════════════════ */

function ChevronLeftIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="10,3 5,8 10,13" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="4,6 8,10 12,6" />
    </svg>
  );
}

function CopySettingsIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M6 20v-1a6 6 0 0 1 12 0v1" />
      <circle cx="19" cy="19" r="3" />
      <line x1="19" y1="16" x2="19" y2="16.01" />
    </svg>
  );
}

function MiniTrendUp({ color = "#16a34a" }: { color?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <polyline
        points="1,9 4,5.5 7,7 11,2"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="8,2 11,2 11,5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MiniTrendDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <polyline
        points="1,3 4,6.5 7,5 11,10"
        stroke="#dc2626"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="8,10 11,10 11,7"
        stroke="#dc2626"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function XMarkCircleIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="shrink-0">
      <circle
        cx="16"
        cy="16"
        r="14"
        stroke="#e5e5e5"
        strokeWidth="1.5"
        className="dark:stroke-[#1e3827]"
      />
      <path
        d="M11 11l10 10M21 11L11 21"
        stroke="#888888"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="dark:stroke-[#4a6655]"
      />
    </svg>
  );
}
