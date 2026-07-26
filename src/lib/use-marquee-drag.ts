"use client";

import { useEffect, useRef } from "react";

/** A flick slower than this (px/ms) doesn't deserve any inertia. */
const FLICK_MIN = 0.18;
/** Fraction of the flick speed left after one 60fps frame. Lower = shorter
 *  throw; at 0.91 a hard flick coasts roughly half a screen before the
 *  automatic scroll takes back over. */
const DECAY = 0.91;
/** Pointer stalled for longer than this before release = no flick. */
const STALE_MS = 90;
/** Weight given to the newest sample when smoothing velocity. */
const VELOCITY_MIX = 0.4;

/**
 * Makes a marquee row draggable without giving up its CSS animation.
 *
 * The keyframes stay the single source of truth for where the row sits:
 * a drag scrubs their timeline through the Web Animations API rather than
 * layering a second transform on top. So the loop stays seamless, letting
 * go resumes from exactly where the reader left it, and the automatic
 * scroll keeps working untouched for anyone who never drags.
 *
 * Pause-on-hover is handled here too — it used to be a CSS
 * `animation-play-state`, but that and `Animation.pause()` racing over the
 * same animation is undefined enough to be worth avoiding.
 *
 * Under `prefers-reduced-motion` there is no animation to scrub (the row
 * is a static wrapped list); the hook then does nothing at all.
 */
export function useMarqueeDrag<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const box = ref.current;
    const track = box?.querySelector<HTMLElement>(".marquee-track");
    if (!box || !track) return;

    let anim: Animation | null = null;
    let total = 0;

    /** Resolve the row's CSS animation, once it exists. */
    const resolve = () => {
      if (anim) return anim;
      anim = track.getAnimations()[0] ?? null;
      if (!anim) return null;

      total = Number(anim.effect?.getComputedTiming().duration ?? 0);
      if (!total) {
        anim = null;
        return null;
      }

      box.dataset.draggable = "true";
      return anim;
    };

    // `marquee-left` runs the track from 0 to -50%, `marquee-right` the
    // other way, so dragging right advances one timeline and rewinds the
    // other.
    const sign = track.dataset.direction === "right" ? 1 : -1;

    /** Screen pixels the row travels per millisecond of its timeline. */
    const speed = () => track.offsetWidth / 2 / total;

    /** Move the row `dx` pixels by seeking its animation, wrapping the loop. */
    const scrub = (dx: number) => {
      if (!anim) return;
      const next = Number(anim.currentTime ?? 0) + (sign * dx) / speed();
      anim.currentTime = ((next % total) + total) % total;
    };

    let dragging = false;
    let hovering = false;
    let pointerId = -1;
    let lastX = 0;
    let lastMove = 0;
    let velocity = 0;
    let frame = 0;
    let lastFrame = 0;

    /** Hand the row back to its own animation, unless a hover holds it. */
    const release = () => {
      if (!hovering && !dragging) anim?.play();
    };

    /** Let a flick coast, then blend back into the automatic scroll. */
    const glide = (now: number) => {
      frame = 0;
      if (!anim) return;

      const elapsed = Math.min(now - lastFrame, 40);
      lastFrame = now;
      velocity *= DECAY ** (elapsed / 16.7);

      // Once the flick has bled down to the row's own pace there is
      // nothing left to add — resume and let the keyframes carry it.
      if (Math.abs(velocity) <= speed()) {
        release();
        return;
      }

      scrub(velocity * elapsed);
      frame = requestAnimationFrame(glide);
    };

    const stopGlide = () => {
      if (!frame) return;
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const onEnter = () => {
      hovering = true;
      resolve()?.pause();
    };

    const onLeave = () => {
      hovering = false;
      if (!frame) release();
    };

    const onDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      const animation = resolve();
      if (!animation) return;

      stopGlide();
      dragging = true;
      pointerId = event.pointerId;
      velocity = 0;
      lastX = event.clientX;
      lastMove = event.timeStamp;
      animation.pause();
      box.dataset.dragging = "true";
      try {
        box.setPointerCapture(event.pointerId);
      } catch {
        // The pointer can go away between the event and this call; the
        // drag still works, it just won't follow outside the row.
      }

      // Stops the pointer from starting a text selection across the pills.
      // Touch is left alone so `touch-action: pan-y` can still scroll.
      if (event.pointerType === "mouse") event.preventDefault();
    };

    const onMove = (event: PointerEvent) => {
      if (!dragging || event.pointerId !== pointerId) return;

      const dx = event.clientX - lastX;
      const elapsed = event.timeStamp - lastMove;
      lastX = event.clientX;
      lastMove = event.timeStamp;

      if (elapsed > 0) {
        velocity = velocity * (1 - VELOCITY_MIX) + (dx / elapsed) * VELOCITY_MIX;
      }
      scrub(dx);
    };

    const onUp = (event: PointerEvent) => {
      if (!dragging || event.pointerId !== pointerId) return;

      dragging = false;
      pointerId = -1;
      delete box.dataset.dragging;
      if (box.hasPointerCapture(event.pointerId)) {
        box.releasePointerCapture(event.pointerId);
      }

      // Holding still before letting go means "stop here", not "throw".
      if (event.timeStamp - lastMove > STALE_MS) velocity = 0;

      if (Math.abs(velocity) > FLICK_MIN) {
        lastFrame = performance.now();
        frame = requestAnimationFrame(glide);
      } else {
        release();
      }
    };

    resolve();

    box.addEventListener("pointerenter", onEnter);
    box.addEventListener("pointerleave", onLeave);
    box.addEventListener("pointerdown", onDown);
    box.addEventListener("pointermove", onMove);
    box.addEventListener("pointerup", onUp);
    box.addEventListener("pointercancel", onUp);

    return () => {
      stopGlide();
      box.removeEventListener("pointerenter", onEnter);
      box.removeEventListener("pointerleave", onLeave);
      box.removeEventListener("pointerdown", onDown);
      box.removeEventListener("pointermove", onMove);
      box.removeEventListener("pointerup", onUp);
      box.removeEventListener("pointercancel", onUp);
      delete box.dataset.draggable;
      delete box.dataset.dragging;
    };
  }, []);

  return ref;
}
