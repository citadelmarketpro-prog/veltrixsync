import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Risk Disclaimer",
  description:
    "Important risk disclosure for Veltrixsync users. Copy trading involves financial risk. Please read this disclaimer before investing.",
  openGraph: {
    title: "Risk Disclaimer | Veltrixsync",
    description:
      "Important risk disclosure for Veltrixsync users. Copy trading involves financial risk.",
    url: "https://veltrixsync.com/risk-disclaimer",
  },
};

export default function RiskDisclaimerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
