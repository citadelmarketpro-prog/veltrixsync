import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Become a Leader Trader",
  description:
    "Share your trading strategy on Veltrixsync and earn performance fees. Apply to become a Leader Trader and let others follow your success.",
  openGraph: {
    title: "Become a Leader Trader | Veltrixsync",
    description:
      "Share your trading strategy and earn performance fees. Apply to become a Leader Trader on Veltrixsync.",
    url: "https://veltrixsync.com/leader",
  },
  twitter: {
    title: "Become a Leader Trader | Veltrixsync",
    description:
      "Share your trading strategy and earn performance fees. Apply to become a Leader Trader on Veltrixsync.",
  },
};

export default function LeaderLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
