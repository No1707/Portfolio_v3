import { ImageResponse } from "next/og";
import { defaultLocale, isLocale, locales, t, type Locale } from "@/lib/i18n";
import { fullName, profile } from "@/content/site";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const size = { width: 1200, height: 630 };

export function generateImageMetadata({ params }: { params: { lang: string } }) {
  const locale: Locale = isLocale(params.lang) ? params.lang : defaultLocale;
  return [
    {
      id: "card",
      alt: `${fullName} — ${t(profile.role, locale)}`,
      size,
      contentType: "image/png",
    },
  ];
}

const INK = "#0a0a0b";
const AMBER = "#fbbf24";
const ON_AMBER = "#1a1206";
const TEXT = "#ededf0";
const MUTED = "#a1a1aa";
const LINE = "#26262b";

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : defaultLocale;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: INK,
          padding: 72,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 76,
              height: 76,
              borderRadius: 17,
              background: AMBER,
              color: ON_AMBER,
              fontSize: 50,
              fontWeight: 700,
            }}
          >
            N
          </div>
          <div style={{ display: "flex", fontSize: 25, letterSpacing: 3, color: MUTED }}>
            VUE.JS · NUXT · REACT · NEXT.JS
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 62, lineHeight: 1.15, color: TEXT }}>
            {profile.name} —
          </div>
          <div style={{ display: "flex", fontSize: 62, lineHeight: 1.15, color: AMBER }}>
            {t(profile.role, locale)}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div style={{ display: "flex", width: "100%", height: 1, background: LINE }} />
          <div style={{ display: "flex", fontSize: 25, color: MUTED }}>
            {profile.email}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
