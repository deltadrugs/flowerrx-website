import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { BaseHrefLock } from "@/components/BaseHrefLock";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HERO_DESKTOP_MEDIA, photoUrl, photos } from "@/lib/photos";
import { baseTagScript } from "@/lib/deploy";
import { seo } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

const display = localFont({
  src: "../fonts/engebrechtreex-bold.woff2",
  variable: "--font-enge-ex",
  weight: "700",
  style: "normal",
  display: "swap",
  adjustFontFallback: false,
  preload: true,
  fallback: ["Palatino Linotype", "Palatino", "Georgia", "serif"],
});

const text = localFont({
  src: "../fonts/engebrechtrerg-regular.woff2",
  variable: "--font-enge-rg",
  weight: "400",
  style: "normal",
  display: "swap",
  adjustFontFallback: false,
  preload: true,
  fallback: ["Palatino Linotype", "Palatino", "Georgia", "serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: seo.title,
  description: seo.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: site.name,
    title: seo.title,
    description: seo.description,
    images: [
      {
        url: "/photos/hero-storefront-wide.jpg",
        width: photos.heroStorefrontWide.width,
        height: photos.heroStorefrontWide.height,
        alt: photos.heroStorefrontWide.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: ["/photos/hero-storefront-wide.jpg"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#63292A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${text.variable}`}>
      <head>
        <base id="site-base" href="/" />
        <script id="site-base-script" dangerouslySetInnerHTML={{ __html: baseTagScript }} />
        <link
          rel="preload"
          as="image"
          href={photoUrl(photos.heroStorefrontWide, "webp")}
          type="image/webp"
          media={HERO_DESKTOP_MEDIA}
        />
        <link
          rel="preload"
          as="image"
          href={photoUrl(photos.entranceFrontDoors, "webp")}
          type="image/webp"
          media="(max-width: 799px)"
        />
      </head>
      <body>
        <BaseHrefLock />
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
