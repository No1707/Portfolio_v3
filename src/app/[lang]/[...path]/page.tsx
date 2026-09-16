import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { defaultLocale, isLocale, t } from "@/lib/i18n";
import { fullName } from "@/content/site";
import { findPage, pagePaths, pages } from "@/content/pages";
import { DetailPage } from "@/components/DetailPage";

export function generateStaticParams({ params }: { params: { lang: string } }) {
  const locale = isLocale(params.lang) ? params.lang : defaultLocale;
  return pages.map((page) => ({ path: page.slug[locale].split("/") }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/[...path]">): Promise<Metadata> {
  const { lang, path } = await params;
  if (!isLocale(lang)) return {};
  const page = findPage(lang, path);
  if (!page) return {};

  const title = t(page.metaTitle, lang);
  const description = t(page.description, lang);
  const paths = pagePaths(page);

  return {
    title,
    description,
    alternates: {
      canonical: paths[lang],
      languages: { ...paths, "x-default": paths[defaultLocale] },
    },
    openGraph: {
      type: "website",
      locale: lang === "fr" ? "fr_FR" : "en_US",
      alternateLocale: lang === "fr" ? "en_US" : "fr_FR",
      url: paths[lang],
      title,
      description,
      siteName: fullName,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function Page({ params }: PageProps<"/[lang]/[...path]">) {
  const { lang, path } = await params;
  if (!isLocale(lang)) notFound();
  const page = findPage(lang, path);
  if (!page) notFound();

  return <DetailPage page={page} locale={lang} />;
}
