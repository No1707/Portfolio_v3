"use client";

import { useRef, useState } from "react";
import { Check, Copy } from "@phosphor-icons/react";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/content/ui";
import { profile } from "@/content/site";

export function CopyEmail({ locale }: { locale: Locale }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);

  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(
    t(ui.contact.subject, locale),
  )}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      return;
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <span className="inline-flex items-center gap-1">
      <a
        href={mailto}
        className="text-sm text-muted underline decoration-line underline-offset-4 transition-colors duration-200 hover:text-accent hover:decoration-accent"
      >
        {profile.email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={t(ui.contact.copy, locale)}
        title={t(copied ? ui.contact.copied : ui.contact.copy, locale)}
        className="grid size-9 cursor-pointer place-items-center rounded-full text-muted transition-colors duration-200 hover:text-accent"
      >
        {copied ? (
          <Check size={15} weight="bold" aria-hidden className="text-accent" />
        ) : (
          <Copy size={15} aria-hidden />
        )}
      </button>
      <span role="status" className="sr-only">
        {copied ? t(ui.contact.copied, locale) : ""}
      </span>
    </span>
  );
}
