import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-white dark:bg-[#0b1c11]">
      {/* ── Left — form panel ── */}
      <div className="flex-1 flex flex-col px-6 py-10 sm:px-10 lg:px-16 xl:px-24 overflow-y-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center mb-10 shrink-0">
          <span className="font-bold text-[22px] text-[#001011] dark:text-white leading-none">
            Veltrix
          </span>
          <span className="font-bold text-[22px] text-[#B0D45A] leading-none">
            sync
          </span>
        </Link>

        {/* Slot for page-specific form */}
        <div className="flex-1 flex flex-col justify-center max-w-[420px] w-full mx-auto">
          {children}
        </div>
      </div>

      {/* ── Right — decorative image panel (hidden on small screens) ── */}
      <div className="hidden lg:block relative w-[48%] xl:w-[46%] shrink-0">
        <Image
          src="/account_creation.png"
          alt="VeltrixSync trading background"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Dark overlay tint */}
        <div className="absolute inset-0 bg-black/10 dark:bg-black/30" />
      </div>
    </div>
  );
}
