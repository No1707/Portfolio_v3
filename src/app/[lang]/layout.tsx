import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import { isLocale, locales, t, type Locale } from "@/lib/i18n";
import { siteUrl } from "@/lib/site-url";
import { profile } from "@/content/site";
import { ThemeProvider } from "@/components/ThemeProvider";

const sans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans-var",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  variable: "--font-mono-var",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";

  const title = `${profile.name} — ${t(profile.role, locale)}`;
  const description = t(profile.tagline, locale);

  return {
    metadataBase: siteUrl,
    title: { default: title, template: `%s · ${profile.name}` },
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `/${l}`])),
        "x-default": "/",
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? "en_US" : "fr_FR",
      url: `/${locale}`,
      title,
      description,
      siteName: profile.name,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html
      lang={lang}
      className={`${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html: "[data-reveal]{opacity:1;transform:none}",
            }}
          />
        </noscript>
      </head>
      <body className="bg-bg text-text">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
