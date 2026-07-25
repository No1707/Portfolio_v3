"use client";

import { useEffect, useRef, useState } from "react";

/**
 * One shared, rAF-throttled scroll listener for every reveal on the page.
 *
 * Deliberately not IntersectionObserver: a plain geometry check is
 * deterministic, fires on the very first frame, and behaves identically in
 * embedded/headless browsers where IO callbacks are unreliable. Elements
 * unsubscribe as soon as they've been revealed, so the set stays small.
 */
type Subscriber = { el: Element; reveal: () => void };

const subscribers = new Set<Subscriber>();
let frame = 0;
let listening = false;

/** Reveal once the element's top edge has passed 88% of the viewport. */
const TRIGGER_RATIO = 0.88;

function viewportHeightPx() {
  return window.innerHeight || document.documentElement.clientHeight;
}

/** True once the element's top edge has crossed the trigger line. */
function hasReachedFold(el: Element) {
  // A negative `top` means the element is already scrolled past, which
  // also satisfies this check — nothing can stay hidden above the fold.
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

    // Anything already at the fold on mount reveals straight away, without
    // waiting for a frame — rAF is suspended in background tabs, and
    // above-the-fold content should never depend on one.
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
