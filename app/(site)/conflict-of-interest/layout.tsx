import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conflict of Interest Policy",
  description:
    "Veltrixsync Conflict of Interest Policy. Learn how we identify, manage, and disclose potential conflicts of interest to protect our users.",
  openGraph: {
    title: "Conflict of Interest Policy | Veltrixsync",
    description:
      "Learn how Veltrixsync identifies, manages, and discloses potential conflicts of interest.",
    url: "https://veltrixsync.com/conflict-of-interest",
  },
};

export default function ConflictOfInterestLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
