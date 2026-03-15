"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-[#0b1c11] border-b border-[#e5e5e5] dark:border-[#1e3827]">
      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-[80px] h-[70px] lg:h-[80px] flex items-center justify-between">

        {/* ── Logo ── */}
        <Link href="/" className="flex items-center shrink-0">
          <span className="font-extrabold leading-none text-[22px] lg:text-[24px] text-[#001011] dark:text-white">
            Signal
          </span>
          <span className="font-extrabold leading-none text-[22px] lg:text-[24px] text-[#B0D45A]">
            sync
          </span>
        </Link>

        {/* ── Desktop nav links — absolutely centered ── */}
        <nav className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          <Link
            href="#features"
            className="text-[15px] font-medium text-[#444444] dark:text-[#8fa896] hover:text-[#001011] dark:hover:text-white transition-colors whitespace-nowrap"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-[15px] font-medium text-[#444444] dark:text-[#8fa896] hover:text-[#001011] dark:hover:text-white transition-colors whitespace-nowrap"
          >
            How it works
          </Link>
          <Link
            href="#pricing"
            className="text-[15px] font-medium text-[#444444] dark:text-[#8fa896] hover:text-[#001011] dark:hover:text-white transition-colors whitespace-nowrap"
          >
            Pricing
          </Link>
        </nav>

        {/* ── Right side actions ── */}
        <div className="flex items-center gap-2.5 shrink-0">

          {/* Sign In — visible md+ only */}
          <Link
            href="/sign-in"
            className="hidden md:inline-flex items-center justify-center h-[44px] px-6 text-[14px] font-bold transition-opacity hover:opacity-80
              text-[#001011] bg-white border border-[#d8ead8]
              dark:text-white dark:bg-[#132b1a] dark:border-[#2a4a34]"
          >
            Sign In
          </Link>

          {/* Get Started */}
          <Link
            href="/sign-up"
            className="inline-flex items-center justify-center h-[44px] px-6 text-[14px] font-bold transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#C1E963", color: "#001011" }}
          >
            Get Started
          </Link>

          {/* Theme toggle — plain icon in light mode, icon-in-circle in dark mode */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center justify-center transition-opacity hover:opacity-80
                w-9 h-9 text-[#001011]
                dark:w-10 dark:h-10 dark:rounded-full dark:bg-[#132b1a] dark:border dark:border-[#2a4a34] dark:text-white"
              aria-label="Toggle theme"
            >
              <span className="dark:hidden"><MoonIcon /></span>
              <span className="hidden dark:inline"><SunIcon /></span>
            </button>
          )}

          {/* Hamburger — visible below lg */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex items-center justify-center w-9 h-9 text-[#001011] dark:text-white"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* ── Mobile / tablet drawer ── */}
      {mobileOpen && (
        <div className="lg:hidden bg-white dark:bg-[#0b1c11] border-t border-[#e5e5e5] dark:border-[#1e3827] px-6 py-5 flex flex-col gap-1">
          <Link
            href="#features"
            onClick={() => setMobileOpen(false)}
            className="py-3 text-[14px] font-medium text-[#001011] dark:text-white border-b border-[#f0f0f0] dark:border-[#1e3827]"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            onClick={() => setMobileOpen(false)}
            className="py-3 text-[14px] font-medium text-[#001011] dark:text-white border-b border-[#f0f0f0] dark:border-[#1e3827]"
          >
            How it works
          </Link>
          <Link
            href="#pricing"
            onClick={() => setMobileOpen(false)}
            className="py-3 text-[14px] font-medium text-[#001011] dark:text-white"
          >
            Pricing
          </Link>

          <div className="pt-4 flex gap-3">
            <Link
              href="/sign-in"
              className="flex-1 inline-flex items-center justify-center h-[44px] text-[14px] font-bold
                text-[#001011] bg-white border border-[#d8ead8]
                dark:text-white dark:bg-[#132b1a] dark:border-[#2a4a34]"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="flex-1 inline-flex items-center justify-center h-[44px] text-[14px] font-bold"
              style={{ backgroundColor: "#C1E963", color: "#001011" }}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

/* ── Icons ──────────────────────────────────────────────────── */

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4.5" />
      <line x1="12" y1="2" x2="12" y2="4" />
      <line x1="12" y1="20" x2="12" y2="22" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="2" y1="12" x2="4" y2="12" />
      <line x1="20" y1="12" x2="22" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
