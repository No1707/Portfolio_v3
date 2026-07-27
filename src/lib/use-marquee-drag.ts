"use client";

import { useEffect, useRef } from "react";

const FLICK_MIN = 0.18;
const DECAY = 0.91;
const STALE_MS = 90;
const VELOCITY_MIX = 0.4;

export function useMarqueeDrag<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const box = ref.current;
    const track = box?.querySelector<HTMLElement>(".marquee-track");
    if (!box || !track) return;

    let anim: Animation | null = null;
    let total = 0;

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

    const sign = track.dataset.direction === "right" ? 1 : -1;

    const speed = () => track.offsetWidth / 2 / total;

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

    const release = () => {
      if (!hovering && !dragging) anim?.play();
    };

    const glide = (now: number) => {
      frame = 0;
      if (!anim) return;

      const elapsed = Math.min(now - lastFrame, 40);
      lastFrame = now;
      velocity *= DECAY ** (elapsed / 16.7);

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
      }

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
