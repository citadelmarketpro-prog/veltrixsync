"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    // Session expired or not logged in — redirect to sign-in
    if (!user) {
      router.replace(`/sign-in?next=${encodeURIComponent(pathname)}`);
      return;
    }

    // If KYC not yet submitted, force user to /kyc regardless of where they try to go
    if (user.kyc_status === "not_submitted" && pathname !== "/kyc") {
      router.replace("/kyc");
    }
  }, [user, loading, pathname, router]);

  // While loading or redirecting, render nothing to avoid flash
  if (loading) return null;
  if (!user) return null;
  if (user.kyc_status === "not_submitted" && pathname !== "/kyc") return null;

  return <>{children}</>;
}
