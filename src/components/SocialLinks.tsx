"use client";

import { EnvelopeSimple, GithubLogo, LinkedinLogo } from "@phosphor-icons/react";
import { profile } from "@/content/site";

const icons = {
  github: GithubLogo,
  linkedin: LinkedinLogo,
  mail: EnvelopeSimple,
} as const;

export function SocialLinks({ size = 19 }: { size?: number }) {
  return (
    <ul className="flex items-center gap-1">
      {profile.socials.map((social) => {
        const Icon = icons[social.icon];
        const external = social.href.startsWith("http");
        return (
          <li key={social.label}>
            <a
              href={social.href}
              aria-label={social.label}
              title={social.label}
              {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
              className="grid size-11 place-items-center rounded-full text-muted transition-colors duration-200 hover:text-accent"
            >
              <Icon size={size} weight="regular" aria-hidden />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
