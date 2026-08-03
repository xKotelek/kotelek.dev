"use client";
import { useEffect, useRef } from "react";

const FRAME = 1000 / 60;
const TILT_EASE = 0.14;
const MAX_TILT = 8;

// Applies a shared parallax tilt to every [data-tilt] descendant. The pointer
// handler only records a target; a single rAF loop eases toward it and parks
// itself once it arrives, so nothing writes layout on the input thread.
export default function TiltGroup({ children, ...props }) {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = Array.from(host.querySelectorAll("[data-tilt]"));
    if (!cards.length) return;

    const target = { rx: 0, ry: 0, s: 1 };
    const current = { rx: 0, ry: 0, s: 1 };

    let rect = null;
    let raf = 0;
    let last = 0;

    const step = (now) => {
      const dt = last ? Math.min(now - last, 80) : FRAME;
      last = now;
      const k = 1 - Math.pow(1 - TILT_EASE, dt / FRAME);

      current.rx += (target.rx - current.rx) * k;
      current.ry += (target.ry - current.ry) * k;
      current.s += (target.s - current.s) * k;

      const transform = `perspective(900px) rotateX(${current.rx.toFixed(
        3
      )}deg) rotateY(${current.ry.toFixed(3)}deg) scale(${current.s.toFixed(4)})`;
      for (const card of cards) card.style.transform = transform;

      const settled =
        Math.abs(target.rx - current.rx) < 0.01 &&
        Math.abs(target.ry - current.ry) < 0.01 &&
        Math.abs(target.s - current.s) < 0.0005;

      if (settled) {
        raf = 0;
        last = 0;
        return;
      }
      raf = requestAnimationFrame(step);
    };

    const wake = () => {
      if (raf || document.hidden) return;
      last = 0;
      raf = requestAnimationFrame(step);
    };

    const onMove = (e) => {
      // getBoundingClientRect is cached; reading it per pointermove forces a
      // synchronous layout on every single event.
      if (!rect) rect = host.getBoundingClientRect();

      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;

      target.ry = px * 2 * MAX_TILT;
      target.rx = py * -2 * MAX_TILT;
      target.s = 1.04 - Math.min(Math.hypot(px * 2, py * 2), 1.5) * 0.035;
      wake();
    };

    const onLeave = () => {
      target.rx = 0;
      target.ry = 0;
      target.s = 1;
      wake();
    };

    const invalidate = () => {
      rect = null;
    };

    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", invalidate, { passive: true });
    window.addEventListener("scroll", invalidate, { passive: true });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", invalidate);
      window.removeEventListener("scroll", invalidate);
    };
  }, []);

  return (
    <div ref={hostRef} {...props}>
      {children}
    </div>
  );
}
