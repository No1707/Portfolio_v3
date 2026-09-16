import { t, type Locale } from "@/lib/i18n";
import { ui } from "./ui";
import { expertise, pageHref, services, type PageKind } from "./pages";

export type MenuSection = "about" | "services" | "projects" | "stack" | "contact";

export type MenuLink = { id: string; href: string; label: string };

export type MenuItem = { id: "home" | MenuSection; label: string; children?: MenuLink[] };

export const menuSectionOf: Record<PageKind, MenuSection> = {
  expertise: "about",
  service: "services",
};

export function buildMenu(locale: Locale): MenuItem[] {
  return [
    { id: "home", label: t(ui.nav.home, locale) },
    {
      id: "about",
      label: t(ui.nav.about, locale),
      children: expertise.map((page) => ({
        id: page.id,
        href: pageHref(page, locale),
        label: t(ui.navigation.expertise, locale).replace("{name}", page.keyword ?? t(page.name, locale)),
      })),
    },
    {
      id: "services",
      label: t(ui.nav.services, locale),
      children: services.map((page) => ({
        id: page.id,
        href: pageHref(page, locale),
        label: t(page.name, locale),
      })),
    },
    { id: "projects", label: t(ui.nav.projects, locale) },
    { id: "stack", label: t(ui.nav.stack, locale) },
    { id: "contact", label: t(ui.nav.contact, locale) },
  ];
}
