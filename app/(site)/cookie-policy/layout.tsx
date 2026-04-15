import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Veltrixsync Cookie Policy. Find out which cookies we use, why we use them, and how you can manage your cookie preferences.",
  openGraph: {
    title: "Cookie Policy | Veltrixsync",
    description: "Find out which cookies Veltrixsync uses and how to manage your preferences.",
    url: "https://veltrixsync.com/cookie-policy",
  },
};

export default function CookiePolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
