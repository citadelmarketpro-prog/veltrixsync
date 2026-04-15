"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

function SessionSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  );
}

export default function DashboardGuard({ children }: { children: React.ReactNode }) {
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

  if (loading) return <SessionSpinner />;
  if (!user) return <SessionSpinner />;
  if (user.kyc_status === "not_submitted" && pathname !== "/kyc") return <SessionSpinner />;

  return <>{children}</>;
}
