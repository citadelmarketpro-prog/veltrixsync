import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Declaration of Consent",
  description:
    "Veltrixsync Declaration of Consent. Review the consents you provide when creating an account and using our copy trading services.",
  openGraph: {
    title: "Declaration of Consent | Veltrixsync",
    description:
      "Review the consents you provide when creating a Veltrixsync account and using our services.",
    url: "https://veltrixsync.com/declaration-of-consent",
  },
};

export default function DeclarationOfConsentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
