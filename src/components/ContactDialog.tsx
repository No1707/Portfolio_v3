"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, X } from "@phosphor-icons/react";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/content/ui";
import { profile } from "@/content/site";

type Status = "idle" | "sending" | "sent" | "error";

const FIELD =
  "mt-2.5 w-full rounded-xl border border-line bg-surface/40 px-4 text-text transition-colors duration-200 hover:border-line-strong focus:border-accent focus-visible:outline-1 focus-visible:outline-offset-0";

export function ContactDialog({ locale }: { locale: Locale }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    const unlock = () => (document.documentElement.style.overflow = "");
    element.addEventListener("close", unlock);
    return () => {
      element.removeEventListener("close", unlock);
      unlock();
    };
  }, []);

  const open = () => {
    if (status === "sent") setStatus("idle");
    document.documentElement.style.overflow = "hidden";
    dialog.current?.showModal();
  };

  const close = () => dialog.current?.close();

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!response.ok) throw new Error(String(response.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        className="group inline-flex h-12 cursor-pointer items-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-accent-contrast transition-colors duration-200 hover:bg-accent-hover"
      >
        {t(ui.contact.cta, locale)}
        <ArrowRight
          size={16}
          weight="bold"
          aria-hidden
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </button>

      <dialog
        ref={dialog}
        aria-labelledby="contact-form-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        className="m-auto w-[min(34rem,calc(100%-2.5rem))] rounded-2xl border border-line bg-bg p-0 text-text shadow-2xl transition duration-200 backdrop:bg-bg/70 backdrop:backdrop-blur-sm starting:translate-y-3 starting:opacity-0"
      >
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between gap-6">
            <h3 id="contact-form-title" className="text-h3 font-medium">
              {t(ui.contact.cta, locale)}
            </h3>
            <button
              type="button"
              onClick={close}
              aria-label={t(ui.form.close, locale)}
              className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-full border border-line text-muted transition-colors duration-200 hover:border-line-strong hover:text-text"
            >
              <X size={16} weight="bold" aria-hidden />
            </button>
          </div>

          {status === "sent" ? (
            <p
              role="status"
              className="mt-8 rounded-xl border border-accent/40 bg-accent/10 p-4 text-sm"
            >
              {t(ui.form.sent, locale)}
            </p>
          ) : (
            <form onSubmit={submit} className="mt-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="label text-faint">{t(ui.form.name, locale)}</span>
                  <input
                    name="name"
                    required
                    maxLength={100}
                    autoComplete="name"
                    className={`h-12 ${FIELD}`}
                  />
                </label>
                <label className="block">
                  <span className="label text-faint">{t(ui.form.email, locale)}</span>
                  <input
                    name="email"
                    type="email"
                    required
                    maxLength={200}
                    autoComplete="email"
                    className={`h-12 ${FIELD}`}
                  />
                </label>
              </div>

              <label className="block">
                <span className="label text-faint">{t(ui.form.message, locale)}</span>
                <textarea
                  name="message"
                  required
                  minLength={10}
                  maxLength={5000}
                  rows={5}
                  className={`block resize-y py-3 ${FIELD}`}
                />
              </label>

              <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label>
                  Company
                  <input name="company" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              {status === "error" && (
                <p role="alert" className="text-sm text-muted">
                  {t(ui.form.error, locale)}{" "}
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-accent underline underline-offset-4"
                  >
                    {profile.email}
                  </a>
                  .
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex h-12 cursor-pointer items-center rounded-full bg-accent px-6 text-sm font-medium text-accent-contrast transition-colors duration-200 hover:bg-accent-hover disabled:cursor-wait disabled:opacity-70"
              >
                {t(status === "sending" ? ui.form.sending : ui.form.send, locale)}
              </button>
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}
