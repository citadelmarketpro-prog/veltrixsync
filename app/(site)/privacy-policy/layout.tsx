import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Veltrixsync Privacy Policy. Learn how we collect, use, and protect your personal data in compliance with applicable data protection regulations.",
  openGraph: {
    title: "Privacy Policy | Veltrixsync",
    description:
      "Learn how Veltrixsync collects, uses, and protects your personal data.",
    url: "https://veltrixsync.com/privacy-policy",
  },
};

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
