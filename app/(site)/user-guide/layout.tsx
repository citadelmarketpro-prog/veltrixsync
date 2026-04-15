import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Guide",
  description:
    "Get started with Veltrixsync. Our user guide covers account setup, finding traders to copy, managing your portfolio, and using AutoGuard risk tools.",
  openGraph: {
    title: "User Guide | Veltrixsync",
    description:
      "Get started with Veltrixsync. Account setup, finding traders to copy, portfolio management, and AutoGuard risk tools.",
    url: "https://veltrixsync.com/user-guide",
  },
  twitter: {
    title: "User Guide | Veltrixsync",
    description:
      "Get started with Veltrixsync. Account setup, finding traders to copy, portfolio management, and AutoGuard risk tools.",
  },
};

export default function UserGuideLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
