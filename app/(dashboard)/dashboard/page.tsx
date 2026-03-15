"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DashNav from "@/components/DashNav";
import { api, ApiError } from "@/lib/api";
import { toast } from "sonner";

/* ════════════════════════════════════════════════════════════════
   TYPES
════════════════════════════════════════════════════════════════ */

interface CopyTrade {
  id: number;
  trader_name: string;
  asset: string;
  trade_type: string;
  direction: "Long" | "Short";
  price: string;
  pnl: string;
  pnl_display: string;
  pnl_positive: boolean;
  status: "open" | "closed" | "pending";
}

interface CopyingTrader {
  id: number;
  trader_id: number;
  trader_name: string;
  avatar_url: string | null;
  avatar_color: string;
  roi: string;
  allocated_amount: string;
  pl: string;
}

const INIT_NOTIFICATIONS = [
  { id: 1, unread: true,  title: "Uniper SE shares plummet over", highlight: "-76.8%", titleSuffix: " about", body: null, time: "4 hours ago" },
  { id: 2, unread: true,  title: "Uniper SE shares plummet over", highlight: "-76.8%", titleSuffix: " about", body: null, time: "4 hours ago" },
  { id: 3, unread: false, title: "Stay informed", highlight: null, titleSuffix: null, body: "Get the latest insights on market trends. Dive into detailed analyses and stay ahead.", time: "Yesterday" },
  { id: 4, unread: false, title: "Your Copy trade is successfully executed", highlight: null, titleSuffix: null, body: 'Congratulations! Your copy trade order for "James Profile" has been executed. See your portfolio.', time: "Yesterday" },
  { id: 5, unread: false, title: "Wallet successfully funded", highlight: null, titleSuffix: null, body: 'Congratulations! You have successfully added "50 USDT" to your account. Start trading!', time: "Yesterday" },
];

/* ════════════════════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════════════════════ */

export default function DashboardPage() {
  const [trades, setTrades] = useState<CopyTrade[]>([]);
  const [copying, setCopying] = useState<CopyingTrader[]>([]);

  useEffect(() => {
    api.get<{ trades: CopyTrade[]; copying: CopyingTrader[] }>("/api/dashboard/copy-trades/")
      .then((data) => {
        setTrades(data.trades ?? []);
        setCopying(data.copying ?? []);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen dark:bg-[#0c1a10] flex flex-col">
      <DashNav />
      <main className="flex-1 px-4 py-4 lg:px-6 lg:py-5">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 xl:grid-cols-[1fr_330px] gap-4">
          {/* ── Left ── */}
          <div className="flex flex-col gap-4">
            <PortfolioCard />
            <CopiedTradesCard trades={trades} />
          </div>
          {/* ── Right ── */}
          <div className="flex flex-col gap-4">
            <LiveTradingCard />
            <BreakdownCard />
            <FollowingCard copying={copying} />
          </div>
        </div>
      </main>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   NOTIFICATION DROPDOWN
════════════════════════════════════════════════════════════════ */

function NotificationDropdown({ onClose }: { onClose: () => void }) {
  const [notifs, setNotifs] = useState(INIT_NOTIFICATIONS);
  const unreadCount = notifs.filter((n) => n.unread).length;

  return (
    <div className="fixed sm:absolute top-[56px] sm:top-full sm:mt-2 left-0 right-0 sm:left-auto sm:right-0 w-full sm:w-[340px] bg-white dark:bg-[#0e1e14] border-b sm:border border-[#e5e5e5] dark:border-[#1e3827] shadow-xl z-50 max-h-[calc(100vh-56px)] sm:max-h-[480px] overflow-y-auto">

      {/* Header */}
      <div className="sticky top-0 flex items-center gap-2 px-4 py-3 bg-white dark:bg-[#0e1e14] border-b border-[#f0f0ec] dark:border-[#1a2e1e]">
        <span className="text-[15px] font-bold text-[#001011] dark:text-white">Notification</span>
        {unreadCount > 0 && (
          <span className="w-5 h-5 rounded-full bg-[#22c55e] flex items-center justify-center text-[10px] font-bold text-white shrink-0">
            {unreadCount}
          </span>
        )}
        <button
          onClick={() => setNotifs((prev) => prev.map((n) => ({ ...n, unread: false })))}
          className="ml-auto text-[12px] text-[#555555] dark:text-[#8fa896] hover:text-[#001011] dark:hover:text-white transition-colors whitespace-nowrap"
        >
          Mark all as read
        </button>
        <button
          onClick={onClose}
          className="w-6 h-6 rounded-full flex items-center justify-center bg-[#f0f0ec] dark:bg-[#1a2a1e] text-[#888888] hover:text-[#001011] dark:hover:text-white transition-colors ml-2 shrink-0"
        >
          <CloseIcon />
        </button>
      </div>

      {/* Items */}
      {notifs.map((n) => (
        <div
          key={n.id}
          className="flex gap-3 px-4 py-3.5 border-b border-[#f5f5f0] dark:border-[#1a2e1e] hover:bg-[#fafaf7] dark:hover:bg-[#112018] transition-colors cursor-pointer"
        >
          {/* Icon */}
          <div
            className={`w-9 h-9 flex items-center justify-center shrink-0 ${
              n.unread ? "bg-[#22c55e]" : "bg-[#ebebea] dark:bg-[#1a2a1e]"
            }`}
          >
            <SyncIcon color={n.unread ? "white" : "#999999"} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-[#001011] dark:text-white leading-snug mb-0.5">
              {n.title}
              {n.highlight && <span className="text-[#ef4444]"> {n.highlight}</span>}
              {n.titleSuffix}
            </p>
            {n.body && (
              <p className="text-[12px] text-[#666666] dark:text-[#4a6655] leading-snug mb-1">{n.body}</p>
            )}
            <p className="text-[11px] text-[#aaaaaa] dark:text-[#3a5040] text-right">{n.time}</p>
          </div>

          {/* Unread dot */}
          {n.unread && (
            <span className="w-2 h-2 rounded-full bg-[#22c55e] shrink-0 mt-1.5" />
          )}
        </div>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   PROFILE DROPDOWN
════════════════════════════════════════════════════════════════ */

function ProfileDropdown({
  onClose,
  onEditProfile,
}: {
  onClose: () => void;
  onEditProfile: () => void;
}) {
  return (
    <div className="fixed sm:absolute top-[56px] sm:top-full sm:mt-2 left-0 right-0 sm:left-auto sm:right-0 w-full sm:w-[290px] bg-white dark:bg-[#0e1e14] border-b sm:border border-[#e5e5e5] dark:border-[#1e3827] shadow-xl z-50">

      {/* User info row */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-[#f0f0ec] dark:border-[#1a2e1e]">
        <div className="w-11 h-11 bg-[#c07858] flex items-center justify-center text-[14px] font-bold text-white shrink-0">
          AJ
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-bold text-[#001011] dark:text-white leading-tight">Adisko James</p>
          <p className="text-[12px] text-[#888888] dark:text-[#4a6655] truncate">adiskojames@gmail.com</p>
        </div>
        <button
          onClick={onEditProfile}
          className="flex items-center gap-1 text-[12px] text-[#555555] dark:text-[#8fa896] hover:text-[#001011] dark:hover:text-white transition-colors shrink-0"
        >
          <PencilIcon />
          Edit profile
        </button>
      </div>

      {/* About */}
      <div className="bg-[#f5f5ef] dark:bg-[#132b1a] border-b border-[#e5e5e5] dark:border-[#1e3827] px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-[#eeeee9] dark:hover:bg-[#1a3020] transition-colors">
        <span className="text-[13px] font-medium text-[#001011] dark:text-white">About VELTRIXSYNC</span>
        <ExternalIcon />
      </div>

      {/* Logout */}
      <div className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-[#fafaf7] dark:hover:bg-[#112018] transition-colors">
        <button className="text-[13px] font-medium text-[#ef4444] dark:text-[#f87171]">Logout</button>
        <LogoutIcon />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   EDIT PROFILE MODAL
════════════════════════════════════════════════════════════════ */

function EditProfileModal({ onClose }: { onClose: () => void }) {
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [username, setUsername] = useState("adski");
  const [email, setEmail] = useState("adski@gmail.com");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-[#0e1e14] w-full max-w-[420px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-7">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[16px] font-bold text-[#001011] dark:text-white">Edit profile</h2>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full flex items-center justify-center bg-[#f0f0ec] dark:bg-[#1a2a1e] text-[#888888] hover:text-[#001011] dark:hover:text-white transition-colors"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Avatar */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-[68px] h-[68px] rounded-full bg-[#c07858] flex items-center justify-center text-[22px] font-bold text-white mb-3">
              AJ
            </div>
            <div className="flex items-center gap-2">
              <button className="h-8 px-4 border border-[#ef4444] text-[12px] font-medium text-[#ef4444] hover:bg-[#fff5f5] dark:hover:bg-[#2a1515] transition-colors">
                Remove
              </button>
              <button className="h-8 px-4 border border-[#d4d4d4] dark:border-[#2a4a34] text-[12px] font-medium text-[#555555] dark:text-[#8fa896] hover:bg-[#f5f5f5] dark:hover:bg-[#1a2a1e] transition-colors">
                Change
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-4">

            {/* First + Last name — side by side */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[12px] font-medium text-[#333333] dark:text-[#8fa896] mb-1.5">
                  First name
                </label>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full h-10 px-3 border border-[#e5e5e5] dark:border-[#1e3827] bg-white dark:bg-[#0b1c11] text-[13px] text-[#001011] dark:text-white outline-none focus:border-[#B0D45A] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-[#333333] dark:text-[#8fa896] mb-1.5">
                  Last name
                </label>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full h-10 px-3 border border-[#e5e5e5] dark:border-[#1e3827] bg-white dark:bg-[#0b1c11] text-[13px] text-[#001011] dark:text-white outline-none focus:border-[#B0D45A] transition-colors"
                />
              </div>
            </div>

            {/* Username */}
            <div>
              <label className="block text-[12px] font-medium text-[#333333] dark:text-[#8fa896] mb-1.5">
                Choose username
              </label>
              <div className="relative">
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full h-10 px-3 pr-9 border border-[#e5e5e5] dark:border-[#1e3827] bg-white dark:bg-[#0b1c11] text-[13px] text-[#001011] dark:text-white outline-none focus:border-[#B0D45A] transition-colors"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#22c55e]">
                  <GreenCheckCircleIcon />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-[12px] font-medium text-[#333333] dark:text-[#8fa896] mb-1.5">
                Email
              </label>
              <div className="relative">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-10 px-3 pr-9 border border-[#e5e5e5] dark:border-[#1e3827] bg-white dark:bg-[#0b1c11] text-[13px] text-[#001011] dark:text-white outline-none focus:border-[#B0D45A] transition-colors"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#22c55e]">
                  <GreenCheckCircleIcon />
                </div>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button className="w-full h-11 mt-6 text-[13px] font-bold bg-[#C1E963] text-[#001011] hover:opacity-90 transition-opacity">
            Update information
          </button>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   PORTFOLIO BALANCE CARD
════════════════════════════════════════════════════════════════ */

interface DashStats {
  balance:             number;
  profit:              number;
  portfolio:           number;
  invested_value:      number;
  last_month_deposits: number;
  pct_change:          number;
}

function fmt(n: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function PortfolioCard() {
  const [modal, setModal] = useState<"none" | "addFunds" | "withdraw">("none");
  const [stats, setStats] = useState<DashStats | null>(null);

  const loadStats = useCallback(async () => {
    try {
      const data = await api.get<DashStats>("/api/dashboard/stats/");
      setStats(data);
    } catch {
      // silently ignore — zeros show instead
    }
  }, []);

  useEffect(() => { loadStats(); }, [loadStats]);

  const close = () => { setModal("none"); loadStats(); }; // refresh after deposit/withdraw

  const portfolio = stats ? fmt(stats.portfolio) : "0.00";
  const balance   = stats ? fmt(stats.balance)   : "0.00";
  const invested  = stats ? fmt(stats.invested_value) : "0.00";
  const profit    = stats ? fmt(stats.profit)    : "0.00";
  const lastMonth = stats ? fmt(stats.last_month_deposits) : "0.00";
  const pct       = stats ? stats.pct_change : 0;
  const pctLabel  = pct >= 0 ? `+${pct.toFixed(1)}%` : `${pct.toFixed(1)}%`;
  const pctColor  = pct >= 0
    ? "text-[#22a34a] dark:text-[#22c55e]"
    : "text-[#dc2626] dark:text-[#f87171]";

  return (
    <>
      <div className="overflow-hidden bg-[#e5e3d5] dark:bg-[#0f1e14] border border-[#d0cec0] dark:border-[#1e3827]">

        {/* ── Beige top section ── */}
        <div className="px-5 pt-5 pb-5">

          {/* Header */}
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-full bg-[#2a5a3c] dark:bg-[#1e3827] flex items-center justify-center text-white shrink-0">
              <DollarIcon />
            </div>
            <span className="text-[14px] font-medium text-[#444444] dark:text-[#8fa896]">
              Portfolio balance (USD)
            </span>
          </div>

          {/* Balance + wallet */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              {/* Amount */}
              <div className="flex items-baseline gap-2 flex-wrap mb-1">
                <span className="text-[28px] sm:text-[34px] lg:text-[40px] font-bold text-[#001011] dark:text-white leading-none">
                  ${portfolio}
                </span>
                <span className={`text-[13px] font-semibold flex items-center gap-0.5 ${pctColor}`}>
                  {pctLabel}
                  <MiniTrendIcon />
                </span>
              </div>
              <p className="text-[12px] text-[#888888] dark:text-[#5a7060] mb-4">
                Compared to ${lastMonth} last month
              </p>

              {/* Stats — stacked on mobile, row on sm+ */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-0">
                <StatBox label="Available Balance" value={`$${balance}`} />
                <div className="hidden sm:block w-px self-stretch bg-[#c4c1b4] dark:bg-[#1e3827] mx-5" />
                <StatBox label="Invested Value" value={`$${invested}`} />
                <div className="hidden sm:block w-px self-stretch bg-[#c4c1b4] dark:bg-[#1e3827] mx-5" />
                <StatBox label="Profit" value={`$${profit}`} />
              </div>
            </div>

            {/* Wallet — visible on all screen sizes */}
            <div className="shrink-0 pointer-events-none select-none self-center">
              <Image
                src="/wallet-dynamic-premium.png"
                alt=""
                width={152}
                height={134}
                className="object-contain w-[90px] sm:w-[110px] lg:w-[152px]"
              />
            </div>
          </div>
        </div>

        {/* ── White action bar ── */}
        <div className="px-5 py-4 dark:bg-[#0a1a10] border-t border-[#d0cec0] dark:border-[#1e3827]">

          {/* Mobile: Balance Quick Action label + two stacked full-width buttons */}
          <div className="flex flex-col gap-2.5 sm:hidden">
            <div className="flex items-center justify-center gap-2.5 mb-1">
              <div className="w-8 h-8 rounded-full bg-[#1a1a1a] dark:bg-[#111] flex items-center justify-center text-white shrink-0">
                <FlashIcon />
              </div>
              <span className="text-[13px] font-medium text-[#333333] dark:text-[#8fa896]">
                Balance Quick Action
              </span>
            </div>
            <button
              onClick={() => setModal("addFunds")}
              className="w-full h-11 text-[14px] font-bold text-[#001011] bg-[#C1E963] hover:opacity-90 transition-opacity"
            >
              Top up wallet
            </button>
            <button
              onClick={() => setModal("withdraw")}
              className="w-full h-11 text-[14px] font-medium text-[#001011] dark:text-white bg-white dark:bg-transparent border border-[#d4d4d4] dark:border-[#2a4a34] hover:bg-[#f8f8f8] dark:hover:bg-[#1a2e1e] transition-colors"
            >
              Withdraw
            </button>
          </div>

          {/* Desktop: Account Quick Actions label on left, buttons on right */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="flex items-center gap-2.5 mr-auto">
              <div className="w-9 h-9 rounded-full bg-[#1a1a1a] dark:bg-[#111] flex items-center justify-center text-white shrink-0">
                <FlashIcon />
              </div>
              <span className="text-[13px] font-medium text-[#333333] dark:text-[#8fa896]">
                Account Quick Actions
              </span>
            </div>
            <button
              onClick={() => setModal("addFunds")}
              className="h-10 px-7 text-[14px] font-bold text-[#001011] bg-[#C1E963] hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Add funds
            </button>
            <button
              onClick={() => setModal("withdraw")}
              className="h-10 px-5 text-[14px] font-medium text-[#001011] dark:text-white bg-white dark:bg-transparent border border-[#d4d4d4] dark:border-[#2a4a34] hover:bg-[#f8f8f8] dark:hover:bg-[#1a2e1e] transition-colors whitespace-nowrap"
            >
              Make withdrawal
            </button>
          </div>

        </div>

      </div>

      {modal === "addFunds" && <AddFundsModal onClose={close} />}
      {modal === "withdraw" && <WithdrawModal onClose={close} />}
    </>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 min-w-0">
      <span className="text-[11px] text-[#888888] dark:text-[#5a7060] whitespace-nowrap">{label}</span>
      <span className="text-[14px] font-bold text-[#001011] dark:text-white whitespace-nowrap">{value}</span>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   ADD FUNDS MODAL
════════════════════════════════════════════════════════════════ */

interface AdminWallet {
  id:           number;
  name:         string;
  name_display: string;
  symbol:       string;
  network:      string;
  address:      string;
  icon_url:     string | null;
}

function AddFundsModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [step, setStep]               = useState<1 | 2 | 3>(1);
  const [rawAmount, setRawAmount]     = useState("");
  const [checked, setChecked]         = useState(false);
  const [copied, setCopied]           = useState(false);
  const [showWallets, setShowWallets] = useState(false);
  const [wallets, setWallets]         = useState<AdminWallet[]>([]);
  const [wallet, setWallet]           = useState<AdminWallet | null>(null);
  const [submitting, setSubmitting]   = useState(false);
  const [submitError, setSubmitError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch admin wallets on mount
  useEffect(() => {
    api.get<AdminWallet[]>("/api/transactions/wallets/").then((data) => {
      setWallets(data);
      if (data.length > 0) setWallet(data[0]);
    }).catch(() => {});
  }, []);

  // Auto-focus amount input
  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 80);
    return () => clearTimeout(t);
  }, []);

  const amount     = parseFloat(rawAmount) || 0;
  const canDeposit = amount > 0 && wallet !== null;

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value.replace(/[^0-9.]/g, "");
    const parts = val.split(".");
    if (parts.length > 2) return;
    if (parts[1] && parts[1].length > 2) return;
    setRawAmount(val);
  }

  function handleCopy() {
    if (!wallet) return;
    navigator.clipboard.writeText(wallet.address).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  async function handleTopUp() {
    if (!wallet || submitting) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      await api.post("/api/transactions/deposit/", {
        wallet_id:  wallet.id,
        amount_usd: amount,
      });
      setStep(3);
    } catch (err) {
      setSubmitError(err instanceof ApiError ? err.detail : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-[#0e1e14] w-full max-w-[300px] sm:max-w-[340px]"
        onClick={(e) => e.stopPropagation()}
      >

        {/* ── Step 1: Select wallet + enter amount ── */}
        {step === 1 && (
          <div className="px-6 py-7">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[16px] font-bold text-[#001011] dark:text-white">Top up account</h2>
              <button
                onClick={onClose}
                className="w-6 h-6 flex items-center justify-center bg-[#f0f0ec] dark:bg-[#1a2a1e] text-[#888888] dark:text-[#8fa896] hover:text-[#001011] dark:hover:text-white transition-colors"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Wallet selector */}
            <div className="relative mb-6">
              <div
                className="flex items-center gap-2.5 px-3 py-2.5 bg-[#f5f5ef] dark:bg-[#1a2a1e] border border-[#e0e0d8] dark:border-[#2a4a34] cursor-pointer select-none"
                onClick={() => wallets.length > 1 && setShowWallets(!showWallets)}
              >
                {wallet ? (
                  <>
                    <CurrencyBadge icon_url={wallet.icon_url} symbol={wallet.symbol} size="sm" />
                    <span className="flex-1 text-[13px] font-medium text-[#001011] dark:text-white">
                      {wallet.symbol}{" "}
                      {wallet.network && <span className="text-[#888888] dark:text-[#4a6655] font-normal">({wallet.network})</span>}
                    </span>
                  </>
                ) : (
                  <span className="flex-1 text-[13px] text-[#aaaaaa] dark:text-[#4a6655]">Loading wallets…</span>
                )}
                {wallets.length > 1 && <ChevronDownIcon />}
              </div>

              {showWallets && (
                <>
                  <div className="fixed inset-0 z-[1]" onClick={() => setShowWallets(false)} />
                  <div className="absolute top-full left-0 right-0 z-[2] bg-white dark:bg-[#0e1e14] border border-[#e0e0d8] dark:border-[#2a4a34] shadow-md max-h-[200px] overflow-y-auto">
                    {wallets.map((w) => (
                      <div
                        key={w.id}
                        className={`flex items-center gap-2.5 px-3 py-2.5 cursor-pointer transition-colors ${
                          w.id === wallet?.id
                            ? "bg-[#f0f7e8] dark:bg-[#1a2e10]"
                            : "hover:bg-[#f5f5ef] dark:hover:bg-[#1a2a1e]"
                        }`}
                        onClick={() => { setWallet(w); setShowWallets(false); }}
                      >
                        <CurrencyBadge icon_url={w.icon_url} symbol={w.symbol} size="sm" />
                        <span className="flex-1 text-[13px] font-medium text-[#001011] dark:text-white">
                          {w.symbol}{" "}
                          {w.network && <span className="text-[#888888] dark:text-[#4a6655] font-normal">({w.network})</span>}
                        </span>
                        {w.id === wallet?.id && (
                          <svg width="11" height="9" viewBox="0 0 11 9" fill="none" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="1,4.5 3.5,7 10,1" />
                          </svg>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Amount input */}
            <div className="flex flex-col items-center gap-2 py-4">
              <input
                ref={inputRef}
                type="text"
                inputMode="decimal"
                placeholder="0.00"
                value={rawAmount}
                onChange={handleAmountChange}
                className="text-[48px] font-bold text-[#aaaaaa] dark:text-[#4a6655] bg-transparent border-none outline-none text-center w-full placeholder:text-[#aaaaaa] dark:placeholder:text-[#4a6655]"
              />
              <p className="text-[12px] text-[#d97706] dark:text-[#c98a30] text-center">
                All deposits are converted to USD for ease of use
              </p>
            </div>

            {/* You will get */}
            <div className="border-t border-[#f0f0ec] dark:border-[#1a2e1e] pt-3 pb-4 flex items-center justify-between">
              <span className="text-[12px] text-[#888888] dark:text-[#4a6655]">You will get</span>
              <span className="text-[12px] font-semibold text-[#001011] dark:text-white">
                {amount > 0 ? `${amount.toFixed(2)} USD` : "0.00 USD"}
              </span>
            </div>

            {/* Deposit button */}
            <button
              onClick={() => canDeposit && setStep(2)}
              className={`w-full h-10 text-[13px] font-bold transition-opacity ${
                canDeposit
                  ? "bg-[#C1E963] text-[#001011] hover:opacity-90 cursor-pointer"
                  : "bg-[#e4f0cc] dark:bg-[#1a2e10] text-[#aaaaaa] dark:text-[#3a5040] cursor-not-allowed"
              }`}
            >
              Deposit
            </button>
          </div>
        )}

        {/* ── Step 2: Show wallet address + confirm ── */}
        {step === 2 && wallet && (
          <div className="px-6 py-7">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[16px] font-bold text-[#001011] dark:text-white">Deposit</h2>
              <button
                onClick={onClose}
                className="w-6 h-6 flex items-center justify-center bg-[#f0f0ec] dark:bg-[#1a2a1e] text-[#888888] dark:text-[#8fa896] hover:text-[#001011] dark:hover:text-white transition-colors"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Dashed address box */}
            <div className="border-2 border-dashed border-[#c4b5fd] dark:border-[#4c3f6e] p-6 flex flex-col items-center gap-2 mb-5">
              <CurrencyBadge icon_url={wallet.icon_url} symbol={wallet.symbol} size="lg" />
              <p className="text-[14px] font-bold text-[#001011] dark:text-white mt-1">
                {wallet.symbol}{wallet.network ? ` (${wallet.network})` : ""}
              </p>
              <div className="flex items-center gap-1.5 max-w-full">
                <span className="text-[12px] text-[#888888] dark:text-[#8fa896] truncate max-w-[180px]">
                  {wallet.address}
                </span>
                <button
                  onClick={handleCopy}
                  className={`shrink-0 transition-colors ${copied ? "text-[#22c55e]" : "text-[#888888] dark:text-[#8fa896] hover:text-[#001011] dark:hover:text-white"}`}
                  title={copied ? "Copied!" : "Copy address"}
                >
                  {copied ? <SmallCheckIcon /> : <CopyIcon />}
                </button>
              </div>
            </div>

            {/* Checkbox */}
            <div
              className="flex items-center gap-2.5 mb-4 cursor-pointer"
              onClick={() => setChecked(!checked)}
            >
              <div
                className={`w-4 h-4 flex items-center justify-center border shrink-0 transition-colors ${
                  checked
                    ? "bg-[#22c55e] border-[#22c55e]"
                    : "border-[#d4d4d4] dark:border-[#2a4a34] bg-white dark:bg-transparent"
                }`}
              >
                {checked && <SmallCheckIcon />}
              </div>
              <span className="text-[12px] text-[#555555] dark:text-[#8fa896] select-none">
                I have sent the funds to this address
              </span>
            </div>

            {submitError && (
              <p className="text-[12px] text-[#dc2626] dark:text-[#f87171] mb-3">{submitError}</p>
            )}

            {/* Complete button */}
            <button
              onClick={() => checked && handleTopUp()}
              disabled={!checked || submitting}
              className={`w-full h-10 text-[13px] font-bold transition-opacity ${
                checked && !submitting
                  ? "bg-[#C1E963] text-[#001011] hover:opacity-90 cursor-pointer"
                  : "bg-[#e4f0cc] dark:bg-[#1a2e10] text-[#aaaaaa] dark:text-[#3a5040] cursor-not-allowed"
              }`}
            >
              {submitting ? "Submitting…" : "Top up complete"}
            </button>
          </div>
        )}

        {/* ── Step 3: Success ── */}
        {step === 3 && (
          <div className="px-6 py-7 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-[#e8f5e0] dark:bg-[#1a3020] flex items-center justify-center mb-4">
              <BigCheckIcon />
            </div>
            <h2 className="text-[16px] font-bold text-[#001011] dark:text-white mb-3">
              Thank you for funding your account
            </h2>
            <p className="text-[12px] text-[#888888] dark:text-[#4a6655] mb-6 leading-relaxed">
              Your deposit is pending admin confirmation. If you don&apos;t see the funds within 24 hours,
              contact us at{" "}
              <a href="mailto:support@signalsync.com" className="text-[#5a9a3c] dark:text-[#B0D45A] hover:underline">
                support@signalsync.com
              </a>
            </p>
            <button
              onClick={() => router.push("/transactions")}
              className="w-full h-10 text-[13px] font-medium text-[#001011] dark:text-white border border-[#e5e5e5] dark:border-[#1e3827] bg-white dark:bg-transparent hover:bg-[#f8f8f8] dark:hover:bg-[#132b1a] transition-colors"
            >
              Done
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   WITHDRAW MODAL
════════════════════════════════════════════════════════════════ */

const WITHDRAW_FROM_OPTIONS = [
  { value: "balance", label: "Available Balance" },
  { value: "profit",  label: "Profit (ROI)"      },
];

function WithdrawModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [walletOpen, setWalletOpen]           = useState(false);
  const [wallets, setWallets]                 = useState<AdminWallet[]>([]);
  const [selectedWallet, setSelectedWallet]   = useState<AdminWallet | null>(null);
  const [amount, setAmount]                   = useState("");
  const [walletAddress, setWalletAddress]     = useState("");
  const [withdrawFrom, setWithdrawFrom]       = useState(WITHDRAW_FROM_OPTIONS[0]);
  const [withdrawFromOpen, setWithdrawFromOpen] = useState(false);
  const [submitting, setSubmitting]           = useState(false);
  const [success, setSuccess]                 = useState(false);

  useEffect(() => {
    api.get<AdminWallet[]>("/api/transactions/wallets/").then((data) => {
      setWallets(data);
      if (data.length > 0) setSelectedWallet(data[0]);
    }).catch(() => {});
  }, []);

  const receiveAmount = amount ? parseFloat(amount).toFixed(2) : "0.00";
  const canWithdraw   = !!selectedWallet && parseFloat(amount) > 0 && walletAddress.trim().length > 0;

  async function handleWithdraw() {
    if (!canWithdraw || submitting) return;
    setSubmitting(true);
    try {
      await api.post("/api/transactions/withdraw/", {
        wallet_id:      selectedWallet!.id,
        amount_usd:     parseFloat(amount),
        wallet_address: walletAddress.trim(),
        withdraw_from:  withdrawFrom.value,
      });
      setSuccess(true);
    } catch (err) {
      const msg = err instanceof ApiError ? err.detail : "Something went wrong. Please try again.";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-[#0e1e14] w-full max-w-[360px] flex flex-col max-h-[90vh] overflow-y-auto"
        style={{ scrollbarWidth: "thin" }}
        onClick={(e) => e.stopPropagation()}
      >
        {success ? (
          /* ── Success state ── */
          <div className="px-6 py-7 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-[#e8f5e0] dark:bg-[#1a3020] flex items-center justify-center mb-4">
              <BigCheckIcon />
            </div>
            <h2 className="text-[16px] font-bold text-[#001011] dark:text-white mb-3">
              Withdrawal request submitted
            </h2>
            <p className="text-[12px] text-[#888888] dark:text-[#4a6655] mb-6 leading-relaxed">
              Your withdrawal is pending admin review. Funds will be sent to your provided address once approved.
            </p>
            <button
              onClick={() => router.push("/transactions")}
              className="w-full h-10 text-[13px] font-medium text-[#001011] dark:text-white border border-[#e5e5e5] dark:border-[#1e3827] bg-white dark:bg-transparent hover:bg-[#f8f8f8] dark:hover:bg-[#132b1a] transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4 shrink-0">
              <h2 className="text-[16px] font-bold text-[#001011] dark:text-white">Withdraw funds</h2>
              <button
                onClick={onClose}
                className="w-7 h-7 rounded-full flex items-center justify-center bg-[#f0f0ec] dark:bg-[#1a2a1e] text-[#888888] dark:text-[#8fa896] hover:text-[#001011] dark:hover:text-white transition-colors"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="px-6 pb-6 flex flex-col gap-5">
              {/* Wallet selector */}
              <div className="relative">
                <button
                  onClick={() => setWalletOpen((v) => !v)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-[#f5f5ef] dark:bg-[#1a2a1e] text-[#001011] dark:text-white"
                >
                  {selectedWallet ? (
                    <div className="flex items-center gap-3">
                      <CurrencyBadge icon_url={selectedWallet.icon_url} symbol={selectedWallet.symbol} size="sm" />
                      <span className="text-[13px] font-medium">
                        {selectedWallet.symbol}{selectedWallet.network ? ` (${selectedWallet.network})` : ""}
                      </span>
                    </div>
                  ) : (
                    <span className="text-[13px] text-[#aaa] dark:text-[#4a6655]">Loading…</span>
                  )}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={`shrink-0 transition-transform ${walletOpen ? "rotate-180" : ""}`}>
                    <path d="M2.5 5l4.5 4 4.5-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {walletOpen && (
                  <div className="absolute top-full left-0 right-0 z-10 bg-white dark:bg-[#132b1a] border border-[#e5e5e5] dark:border-[#1e3827] shadow-lg max-h-[200px] overflow-y-auto">
                    {wallets.map((w) => (
                      <button
                        key={w.id}
                        onClick={() => { setSelectedWallet(w); setWalletOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-[13px] hover:bg-[#f5f5ef] dark:hover:bg-[#1a2a1e] transition-colors ${selectedWallet?.id === w.id ? "bg-[#f5f5ef] dark:bg-[#1a2a1e] font-medium text-[#001011] dark:text-white" : "text-[#555] dark:text-[#8fa896]"}`}
                      >
                        <CurrencyBadge icon_url={w.icon_url} symbol={w.symbol} size="sm" />
                        <span>{w.symbol}{w.network ? ` (${w.network})` : ""}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Amount */}
              <div className="flex flex-col items-center gap-2 py-4">
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => {
                    const v = e.target.value;
                    if (v === "" || /^\d*\.?\d{0,2}$/.test(v)) setAmount(v);
                  }}
                  className="text-[48px] font-bold text-[#aaaaaa] dark:text-[#4a6655] bg-transparent border-none outline-none text-center w-full placeholder:text-[#aaaaaa] dark:placeholder:text-[#4a6655]"
                />
                <p className="text-[12px] text-[#d97706] dark:text-[#c98a30] text-center">
                  Enter the amount you wish to withdraw
                </p>
              </div>

              {/* Wallet address */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-medium text-[#001011] dark:text-white">Wallet Address</label>
                <input
                  type="text"
                  placeholder="Enter your receiving wallet address"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  className="w-full px-4 py-3 text-[13px] bg-[#f5f5ef] dark:bg-[#1a2a1e] text-[#001011] dark:text-white placeholder:text-[#aaa] dark:placeholder:text-[#4a6655] border-none outline-none"
                />
              </div>

              {/* Withdraw from */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-medium text-[#001011] dark:text-white">Withdraw from</label>
                <div className="relative">
                  <button
                    onClick={() => setWithdrawFromOpen((v) => !v)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-[#f5f5ef] dark:bg-[#1a2a1e]"
                  >
                    <span className="text-[13px] font-medium text-[#001011] dark:text-white">{withdrawFrom.label}</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={`shrink-0 transition-transform text-[#888] dark:text-[#8fa896] ${withdrawFromOpen ? "rotate-180" : ""}`}>
                      <path d="M2.5 5l4.5 4 4.5-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {withdrawFromOpen && (
                    <div className="absolute top-full left-0 right-0 z-10 bg-white dark:bg-[#132b1a] border border-[#e5e5e5] dark:border-[#1e3827] shadow-lg">
                      {WITHDRAW_FROM_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => { setWithdrawFrom(opt); setWithdrawFromOpen(false); }}
                          className={`w-full flex items-center justify-between px-4 py-3 text-[13px] transition-colors ${withdrawFrom.value === opt.value ? "bg-[#f0f9e8] dark:bg-[#1a2e1a] font-medium text-[#001011] dark:text-white" : "text-[#555] dark:text-[#8fa896] hover:bg-[#f5f5ef] dark:hover:bg-[#1a2a1e]"}`}
                        >
                          <span>{opt.label}</span>
                          {withdrawFrom.value === opt.value && (
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <path d="M2.5 7l3 3 6-6" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* You will receive */}
              <div className="flex items-center justify-between py-3 border-t border-[#f0f0ec] dark:border-[#1e3827]">
                <span className="text-[12px] text-[#888888] dark:text-[#8fa896]">You will receive</span>
                <span className="text-[13px] font-bold text-[#001011] dark:text-white">
                  {receiveAmount} {selectedWallet?.symbol ?? ""}
                </span>
              </div>

              {/* Withdraw button */}
              <button
                onClick={handleWithdraw}
                disabled={!canWithdraw || submitting}
                className={`w-full h-11 flex items-center justify-center text-[13px] font-bold transition-opacity ${
                  canWithdraw && !submitting
                    ? "bg-[#B0D45A] text-[#001011] hover:opacity-90 active:opacity-80"
                    : "bg-[#d4e8a0] dark:bg-[#1a2e10] text-[#666] dark:text-[#3a5040] cursor-not-allowed"
                }`}
              >
                {submitting ? "Submitting…" : "Withdraw"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   COPIED TRADES CARD
════════════════════════════════════════════════════════════════ */

function CopiedTradesCard({ trades }: { trades: CopyTrade[] }) {
  const statusCls = (s: string) =>
    s === "open"    ? "bg-[#dcfce7] text-[#16a34a] dark:bg-[#082a12] dark:text-[#4ade80]" :
    s === "pending" ? "bg-[#fef3c7] text-[#d97706] dark:bg-[#2a1f08] dark:text-[#fbbf24]" :
                      "bg-[#f0f0ec] text-[#555555] dark:bg-[#1a2a1e] dark:text-[#8fa896]";

  return (
    <div className="bg-white dark:bg-[#0e1e14] border border-[#e5e5e5] dark:border-[#1e3827] overflow-hidden">
      <div className="px-5 pt-5 pb-2">
        <h2 className="text-[16px] font-bold text-[#001011] dark:text-white mb-4">
          Trade Copied
        </h2>

        {/* Table header */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] text-[11px] font-medium text-[#999999] dark:text-[#4a6655] uppercase tracking-wide pb-3 border-b border-[#f0f0ec] dark:border-[#1a2e1e]">
          <span>Asset</span>
          <span>Type</span>
          <span>Direction</span>
          <span>Price</span>
          <span>PNL</span>
          <span>Status</span>
        </div>
      </div>

      {trades.length === 0 ? (
        /* ── Empty state ── */
        <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
          <div className="w-[60px] h-[60px] rounded-full bg-[#f0f0ec] dark:bg-[#1a2a1e] flex items-center justify-center mb-4">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#888888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="dark:stroke-[#4a6655]">
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4"  />
              <line x1="6"  y1="20" x2="6"  y2="14" />
            </svg>
          </div>
          <p className="text-[15px] font-bold text-[#001011] dark:text-white mb-1.5">No trades yet</p>
          <p className="text-[13px] text-[#888888] dark:text-[#4a6655] leading-relaxed mb-5 max-w-[220px]">
            Start copying expert traders to see your trades here
          </p>
          <a
            href="/traders"
            className="h-10 px-8 flex items-center justify-center text-[13px] font-bold text-[#001011] hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#C1E963" }}
          >
            Explore Traders
          </a>
        </div>
      ) : (
        <>
          {/* ── Desktop rows (sm+) ── */}
          <div className="hidden sm:block divide-y divide-[#f5f5f0] dark:divide-[#1a2e1e]">
            {trades.map((t) => (
              <div
                key={t.id}
                className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] items-center px-5 py-3.5 hover:bg-[#fafaf7] dark:hover:bg-[#112018] transition-colors"
              >
                <div>
                  <span className="text-[13px] font-semibold text-[#001011] dark:text-white">{t.asset}</span>
                  <p className="text-[10px] text-[#aaaaaa] dark:text-[#4a6655]">{t.trader_name}</p>
                </div>
                <span className="text-[13px] text-[#555555] dark:text-[#8fa896]">{t.trade_type}</span>
                <span className={`text-[13px] font-semibold ${t.direction === "Long" ? "text-[#16a34a] dark:text-[#22c55e]" : "text-[#dc2626] dark:text-[#f87171]"}`}>
                  {t.direction}
                </span>
                <span className="text-[13px] text-[#001011] dark:text-white">${Number(t.price).toLocaleString()}</span>
                <span className={`text-[13px] font-semibold ${t.pnl_positive ? "text-[#16a34a] dark:text-[#22c55e]" : "text-[#dc2626] dark:text-[#f87171]"}`}>
                  {t.pnl_display}
                </span>
                <span className={`inline-flex w-fit px-2 py-0.5 text-[11px] font-semibold capitalize ${statusCls(t.status)}`}>
                  {t.status}
                </span>
              </div>
            ))}
          </div>

          {/* ── Mobile cards (< sm) ── */}
          <div className="sm:hidden divide-y divide-[#f5f5f0] dark:divide-[#1a2e1e]">
            {trades.map((t) => (
              <div key={t.id} className="px-5 py-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[14px] font-bold text-[#001011] dark:text-white">{t.asset}</span>
                  <span className={`px-2 py-0.5 text-[11px] font-semibold capitalize ${statusCls(t.status)}`}>{t.status}</span>
                </div>
                <p className="text-[10px] text-[#aaaaaa] dark:text-[#4a6655] mb-2">{t.trader_name}</p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "Type",      val: t.trade_type,  cls: "text-[#555555] dark:text-[#8fa896]" },
                    { label: "Direction", val: t.direction,   cls: t.direction === "Long" ? "text-[#16a34a] dark:text-[#22c55e] font-semibold" : "text-[#dc2626] dark:text-[#f87171] font-semibold" },
                    { label: "Price",     val: `$${Number(t.price).toLocaleString()}`, cls: "text-[#001011] dark:text-white" },
                    { label: "PNL",       val: t.pnl_display, cls: t.pnl_positive ? "text-[#16a34a] dark:text-[#22c55e] font-semibold" : "text-[#dc2626] dark:text-[#f87171] font-semibold" },
                  ].map(({ label, val, cls }) => (
                    <div key={label}>
                      <p className="text-[10px] text-[#aaaaaa] dark:text-[#4a6655] uppercase tracking-wide mb-0.5">{label}</p>
                      <p className={`text-[12px] ${cls}`}>{val}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   START LIVE TRADING CARD
════════════════════════════════════════════════════════════════ */

function LiveTradingCard() {
  const router = useRouter();
  return (
    <div className="bg-white dark:bg-[#0e1e14] border border-[#e5e5e5] dark:border-[#1e3827] px-5 py-4">
      <button
        onClick={() => router.push("/my-portfolio")}
        className="flex items-center w-fit gap-2.5 h-10 px-4 text-[14px] font-semibold text-[#001011] dark:text-[#f0f0f0] bg-[#fff5f5] dark:bg-[#2a1515] border border-[#fca5a5] dark:border-[#7f1d1d] hover:opacity-90 transition-opacity cursor-pointer"
      >
        <span className="relative flex h-3 w-3 shrink-0">
          <span className="animate-ping absolute inline-flex rounded-full h-full w-full bg-red-400 opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
        </span>
        Start Live trading
      </button>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   PORTFOLIO BREAKDOWN CARD
════════════════════════════════════════════════════════════════ */

interface BreakdownItem {
  category:     string;
  label:        string;
  legend_color: string;
  base_color:   string;
  line_color:   string;
  pnl:          string;
  pct:          number;
  count:        number;
}

interface BreakdownData {
  growth_pct: number;
  breakdown:  BreakdownItem[];
}

const BAR_W = 40;
const BAR_GAP = 14;
const SVG_H = 100;

function BreakdownCard() {
  const [data, setData] = useState<BreakdownData | null>(null);

  useEffect(() => {
    api.get<BreakdownData>("/api/dashboard/portfolio-breakdown/")
      .then(setData)
      .catch(() => {/* silently ignore — show empty state */});
  }, []);

  const bars    = data?.breakdown ?? [];
  const isEmpty = bars.length === 0;
  const growth  = data?.growth_pct ?? 0;
  const growthStr = `${growth >= 0 ? "+" : ""}${growth.toFixed(1)}%`;
  const growthColor = growth >= 0
    ? "text-[#16a34a] dark:text-[#22c55e]"
    : "text-[#dc2626] dark:text-[#f87171]";

  const svgWidth = isEmpty ? 148 : bars.length * BAR_W + (bars.length - 1) * BAR_GAP;

  return (
    <div className="bg-white dark:bg-[#0e1e14] border border-[#e5e5e5] dark:border-[#1e3827] p-5">

      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 bg-[#1a1a1a] dark:bg-[#1e3827] flex items-center justify-center text-white">
          <PersonIcon />
        </div>
        <span className="text-[14px] font-semibold text-[#001011] dark:text-white">
          Portfolio breakdown
        </span>
      </div>

      {/* Growth % */}
      <div className="flex items-center gap-1.5 mb-0.5">
        <span className={`text-[30px] font-bold leading-none ${growthColor}`}>
          {data ? growthStr : "—"}
        </span>
        <WavyLineIcon />
      </div>
      <p className="text-[12px] text-[#888888] dark:text-[#4a6655] mb-5 leading-[1.6]">
        portfolio growth from<br />last month
      </p>

      {isEmpty ? (
        <p className="text-[12px] text-[#888888] dark:text-[#4a6655]">
          No trade data yet.
        </p>
      ) : (
        /* Legend (left) + Bar chart (right) — bottom-aligned row */
        <div className="flex items-end justify-between gap-3">

          {/* Legend */}
          <div className="flex flex-col gap-2 pb-1">
            {bars.map((item) => (
              <div key={item.category} className="flex items-center gap-2">
                <span className="w-3 h-3 shrink-0" style={{ backgroundColor: item.legend_color }} />
                <span className="text-[12px] text-[#555555] dark:text-[#8fa896]">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* SVG bar chart — dynamic bars with diagonal hatch texture */}
          <svg width={svgWidth} height={SVG_H} viewBox={`0 0 ${svgWidth} ${SVG_H}`} fill="none">
            <defs>
              {bars.map((item) => (
                <pattern
                  key={item.category}
                  id={`hatch-${item.category}`}
                  width="7" height="7"
                  patternUnits="userSpaceOnUse"
                  patternTransform="rotate(45)"
                >
                  <rect width="7" height="7" fill={item.base_color} />
                  <line x1="0" y1="0" x2="0" y2="7" stroke={item.line_color} strokeWidth="3.5" />
                </pattern>
              ))}
            </defs>
            {bars.map((item, i) => {
              const barH = Math.max(4, Math.round(item.pct));
              const x    = i * (BAR_W + BAR_GAP);
              const y    = SVG_H - barH;
              return (
                <rect
                  key={item.category}
                  x={x} y={y}
                  width={BAR_W} height={barH}
                  fill={`url(#hatch-${item.category})`}
                />
              );
            })}
          </svg>

        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   FOLLOWING CARD
════════════════════════════════════════════════════════════════ */

function FollowingCard({ copying }: { copying: CopyingTrader[] }) {
  const [search, setSearch] = useState("");

  const filtered = copying.filter((t) =>
    t.trader_name.toLowerCase().includes(search.toLowerCase())
  );

  const isEmpty = copying.length === 0;

  const getInitials = (name: string) =>
    name.split(" ").slice(0, 2).map((p) => p[0]).join("").toUpperCase();

  const formatRoi = (roi: string) => {
    const n = parseFloat(roi);
    return isNaN(n) ? roi : `${n >= 0 ? "+" : ""}${n.toFixed(2)}%`;
  };

  return (
    <div className="bg-white dark:bg-[#0e1e14] border border-[#e5e5e5] dark:border-[#1e3827] p-5">
      <h2 className="text-[16px] font-bold text-[#001011] dark:text-white mb-4">
        Following
      </h2>

      {/* Search */}
      <div className="relative mb-4">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#aaaaaa] dark:text-[#4a6655] pointer-events-none">
          <SearchIcon />
        </div>
        <input
          type="text"
          placeholder="Search for trader"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-9 pl-8 pr-3 border border-[#e5e5e5] dark:border-[#1e3827] bg-[#fafaf8] dark:bg-[#0b1c11] text-[13px] text-[#001011] dark:text-white placeholder-[#aaaaaa] dark:placeholder-[#4a6655] outline-none focus:border-[#B0D45A] dark:focus:border-[#B0D45A] transition-colors"
        />
      </div>

      {isEmpty ? (
        /* ── No experts followed ── */
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="w-[56px] h-[56px] rounded-full bg-[#f0f0ec] dark:bg-[#1a2a1e] flex items-center justify-center mb-3">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#888888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="dark:stroke-[#4a6655]">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <p className="text-[14px] font-bold text-[#001011] dark:text-white mb-1">No experts followed</p>
          <p className="text-[12px] text-[#888888] dark:text-[#4a6655] leading-relaxed mb-5 max-w-[200px]">
            Start copying expert traders to see them here
          </p>
          <a
            href="/traders"
            className="h-10 px-6 flex items-center justify-center text-[13px] font-bold text-[#001011] hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#C1E963" }}
          >
            Explore Traders
          </a>
        </div>
      ) : filtered.length === 0 ? (
        /* ── Search returned nothing ── */
        <p className="text-[13px] text-[#aaaaaa] dark:text-[#4a6655] text-center py-6">No traders match your search</p>
      ) : (
        /* ── Trader list ── */
        <div className="flex flex-col gap-3">
          {filtered.map((t) => (
            <a
              key={t.id}
              href={`/traders/${t.trader_id}`}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              {t.avatar_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={t.avatar_url}
                  alt={t.trader_name}
                  className="w-8 h-8 rounded-full object-cover shrink-0"
                />
              ) : (
                <div
                  className="w-8 h-8 flex items-center justify-center text-[11px] font-bold text-white shrink-0 rounded-full"
                  style={{ backgroundColor: t.avatar_color || "#4a7a6a" }}
                >
                  {getInitials(t.trader_name)}
                </div>
              )}
              <span className="flex-1 text-[13px] font-medium text-[#001011] dark:text-white truncate">
                {t.trader_name}
              </span>
              <span className={`text-[13px] font-semibold shrink-0 ${parseFloat(t.roi) >= 0 ? "text-[#16a34a] dark:text-[#22c55e]" : "text-[#dc2626] dark:text-[#f87171]"}`}>
                {formatRoi(t.roi)}
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   ICONS
════════════════════════════════════════════════════════════════ */

function GridIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="1" width="6" height="6" rx="1" />
      <rect x="9" y="1" width="6" height="6" rx="1" />
      <rect x="1" y="9" width="6" height="6" rx="1" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
    </svg>
  );
}

function TrendIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1,12 5,7 9,9 15,3" />
      <polyline points="11,3 15,3 15,7" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4,6 8,10 12,6" />
    </svg>
  );
}

function DollarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="7" r="3.5" />
      <path d="M3 18c0-3.3 3.1-6 7-6s7 2.7 7 6" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8.5" cy="8.5" r="5" />
      <line x1="12.5" y1="12.5" x2="17" y2="17" />
    </svg>
  );
}

function WavyLineIcon() {
  return (
    <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
      <path
        d="M1 10 C3 6, 5 10, 7 7 C9 4, 11 9, 13 6 C15 3, 17 7, 21 4"
        stroke="#16a34a"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MiniTrendIcon() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
      <polyline
        points="1,10 5,6 9,8 15,2"
        stroke="#22c55e"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FlashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <line x1="1" y1="1" x2="11" y2="11" />
      <line x1="11" y1="1" x2="1" y2="11" />
    </svg>
  );
}

function CurrencyBadge({ icon_url, symbol, size }: { icon_url: string | null; symbol: string; size: "sm" | "lg" }) {
  const sm = size === "sm";
  const dim = sm ? "w-6 h-6" : "w-14 h-14";
  if (icon_url) {
    return (
      <div className={`${dim} rounded-full overflow-hidden shrink-0 bg-[#f0f0ec] dark:bg-[#1a2a1e] flex items-center justify-center`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={icon_url} alt={symbol} className="w-full h-full object-contain" />
      </div>
    );
  }
  // Fallback: coloured circle with first letter of symbol
  const FALLBACK_COLORS: Record<string, string> = {
    BTC:  "#f59e0b", ETH: "#6366f1", USDT: "#16a34a", BNB: "#eab308",
    USDC: "#3b82f6", SOL: "#8b5cf6", XRP: "#0ea5e9",  LTC: "#6b7280",
    DOGE: "#ca8a04", TRX: "#ef4444", MATIC: "#a855f7", AVAX: "#ef4444",
    BCH:  "#22c55e",
  };
  const bg = FALLBACK_COLORS[symbol.toUpperCase()] ?? "#555555";
  return (
    <div
      className={`${dim} flex items-center justify-center text-white font-bold shrink-0 rounded-full`}
      style={{ backgroundColor: bg }}
    >
      <span className={sm ? "text-[9px]" : "text-[20px]"}>{symbol[0]}</span>
    </div>
  );
}

function CopyIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function SmallCheckIcon() {
  return (
    <svg width="9" height="7" viewBox="0 0 9 7" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1,3.5 3,5.5 8,1" />
    </svg>
  );
}

function BigCheckIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="5,17 13,25 29,9" />
    </svg>
  );
}

function SyncIcon({ color = "currentColor" }: { color?: string }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15,3 21,3 21,9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16,17 21,12 16,7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

function GreenCheckCircleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="#22c55e" strokeWidth="1.5" />
      <polyline points="8,12 11,15 16,9" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
