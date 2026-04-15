import type { Metadata } from "next";

export const metadata: Metadata = {
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Veltrixsync",
  },
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
