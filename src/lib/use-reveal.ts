"use client";

import { useEffect, useRef, useState } from "react";

type Subscriber = { el: Element; reveal: () => void };

const subscribers = new Set<Subscriber>();
let frame = 0;
let listening = false;

const TRIGGER_RATIO = 0.88;

function viewportHeightPx() {
  return window.innerHeight || document.documentElement.clientHeight;
}

function hasReachedFold(el: Element) {
  return el.getBoundingClientRect().top < viewportHeightPx() * TRIGGER_RATIO;
}

function check() {
  frame = 0;

  for (const subscriber of subscribers) {
    if (hasReachedFold(subscriber.el)) {
      subscribers.delete(subscriber);
      subscriber.reveal();
    }
  }

  if (subscribers.size === 0) stopListening();
}

function schedule() {
  if (frame) return;
  frame = requestAnimationFrame(check);
}

function startListening() {
  if (listening) return;
  listening = true;
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
}

function stopListening() {
  if (!listening) return;
  listening = false;
  window.removeEventListener("scroll", schedule);
  window.removeEventListener("resize", schedule);
}

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || hasReachedFold(el)) {
      setShown(true);
      return;
    }

    const subscriber: Subscriber = { el, reveal: () => setShown(true) };
    subscribers.add(subscriber);
    startListening();

    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) stopListening();
    };
  }, []);

  return { ref, shown };
}
