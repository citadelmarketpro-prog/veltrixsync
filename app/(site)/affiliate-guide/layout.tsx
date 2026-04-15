import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Guide",
  description:
    "Step-by-step guide to the Veltrixsync Affiliate Programme. Learn how to share your link, track referrals, and maximise your commission earnings.",
  openGraph: {
    title: "Affiliate Guide | Veltrixsync",
    description:
      "Step-by-step guide to the Veltrixsync Affiliate Programme. Learn how to track referrals and maximise commission earnings.",
    url: "https://veltrixsync.com/affiliate-guide",
  },
  twitter: {
    title: "Affiliate Guide | Veltrixsync",
    description:
      "Step-by-step guide to the Veltrixsync Affiliate Programme. Learn how to track referrals and maximise commission earnings.",
  },
};

export default function AffiliateGuideLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
