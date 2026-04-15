import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read the Veltrixsync Terms of Service. Understand your rights, responsibilities, and the conditions governing use of our copy trading platform.",
  openGraph: {
    title: "Terms of Service | Veltrixsync",
    description: "Read the Veltrixsync Terms of Service governing use of our copy trading platform.",
    url: "https://veltrixsync.com/terms",
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
