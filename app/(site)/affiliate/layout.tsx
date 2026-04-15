import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Programme",
  description:
    "Earn passive income by referring traders to Veltrixsync. Join our affiliate programme and receive competitive commissions for every active user you bring.",
  openGraph: {
    title: "Affiliate Programme | Veltrixsync",
    description:
      "Earn passive income by referring traders to Veltrixsync. Competitive commissions for every active user you bring.",
    url: "https://veltrixsync.com/affiliate",
  },
  twitter: {
    title: "Affiliate Programme | Veltrixsync",
    description:
      "Earn passive income by referring traders to Veltrixsync. Competitive commissions for every active user you bring.",
  },
};

export default function AffiliateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
