import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leader Trader Guide",
  description:
    "Everything you need to know about becoming a Leader Trader on Veltrixsync. Set up your profile, manage followers, and maximise your performance fees.",
  openGraph: {
    title: "Leader Trader Guide | Veltrixsync",
    description:
      "Everything you need to know about becoming a Leader Trader. Set up your profile, manage followers, and maximise performance fees.",
    url: "https://veltrixsync.com/leader-guide",
  },
  twitter: {
    title: "Leader Trader Guide | Veltrixsync",
    description:
      "Everything you need to know about becoming a Leader Trader. Set up your profile, manage followers, and maximise performance fees.",
  },
};

export default function LeaderGuideLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
