import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Preloader from "@/components/Preloader";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-sans",
  preload: true,
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1c11" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://veltrixsync.com"),
  title: {
    default: "Veltrixsync — Copy Trading Platform",
    template: "%s | Veltrixsync",
  },
  description:
    "Copy top traders automatically with Veltrixsync. Real-time trade copying, smart portfolio management, and AutoGuard risk protection for every investor.",
  keywords: [
    "copy trading",
    "social trading",
    "trade signals",
    "portfolio management",
    "forex copy trading",
    "stock copy trading",
    "auto trading",
    "investment platform",
    "Veltrixsync",
  ],
  authors: [{ name: "Veltrixsync", url: "https://veltrixsync.com" }],
  creator: "Veltrixsync",
  publisher: "Veltrixsync",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      { rel: "android-chrome-192x192", url: "/android-chrome-192x192.png" },
      { rel: "android-chrome-512x512", url: "/android-chrome-512x512.png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://veltrixsync.com",
    siteName: "Veltrixsync",
    title: "Veltrixsync — Copy Trading Platform",
    description:
      "Copy top traders automatically with Veltrixsync. Real-time trade copying, smart portfolio management, and AutoGuard risk protection.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Veltrixsync — Copy Trading Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Veltrixsync — Copy Trading Platform",
    description:
      "Copy top traders automatically with Veltrixsync. Real-time trade copying, smart portfolio management, and AutoGuard risk protection.",
    images: ["/opengraph-image.png"],
    creator: "@veltrixsync",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "finance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={poppins.variable}>
      <body className={`${poppins.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Preloader />
            {children}
            <Toaster richColors position="top-center" />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
