"use client";
import { useEffect, useRef, useState } from "react";

const TRAIL_COUNT = 22;
const TRAIL_EASE = 0.35;
// Hard cap on the gap between two links. A plain lerp chain settles at a gap of
// v*dt*(1-k)/k, which at speed is far wider than a dot — that is what made the
// trail read as separate dots instead of one line. Clamping the segment length
// keeps every dot overlapping its neighbour no matter how fast the pointer moves.
const TRAIL_HEAD_SIZE = 13;
const TRAIL_TAIL_SIZE = 3;
// Each link's cap is a fraction of its own dot, so a thin tail dot sits closer
// to its neighbour than a fat head one. A single shared cap would leave gaps at
// the tail, where the dots are too small to bridge it.
const TRAIL_OVERLAP = 0.7;
const FRAME = 1000 / 60;

// Size, blur and link length depend only on the dot's index, so they are
// computed once at module load rather than per frame.
const TRAIL_DOTS = Array.from({ length: TRAIL_COUNT }, (_, i) => {
  const t = TRAIL_COUNT > 1 ? i / (TRAIL_COUNT - 1) : 0;
  const size = TRAIL_HEAD_SIZE - (TRAIL_HEAD_SIZE - TRAIL_TAIL_SIZE) * Math.pow(t, 0.85);
  return {
    segment: size * TRAIL_OVERLAP,
    style: {
      width: `${size}px`,
      height: `${size}px`,
      marginLeft: `${-size / 2}px`,
      marginTop: `${-size / 2}px`,
      filter: `blur(${(size * 0.3).toFixed(2)}px)`,
    },
  };
});

const LINK_SELECTOR = "a, button, [data-cursor='link']";
const SOFT_SELECTOR = ".skills, .project";

export default function CursorComponent() {
  const [enabled, setEnabled] = useState(false);

  const cursorRef = useRef(null);
  const glowRef = useRef(null);
  const trailsRef = useRef(null);
  const trailRefs = useRef([]);

  // Device capability instead of a network round-trip to /api/isMobile.
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setEnabled(mq.matches);

    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const root = document.documentElement;
    root.dataset.cursor = "on";

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { ...target };
    const trail = Array.from({ length: TRAIL_COUNT }, () => ({ ...target }));

    let raf = 0;
    let last = 0;
    let primed = false;
    let mode = "default";
    let glowOn = false;

    const step = (now) => {
      const dt = last ? Math.min(now - last, 80) : FRAME;
      last = now;
      const frames = dt / FRAME;

      const dx = target.x - current.x;
      const dy = target.y - current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Same easing curve as before, but corrected for the real frame time so a
      // 120Hz Mac and a 60Hz display travel at identical speed.
      const speed = 0.2 + Math.min(distance / 150, 0.4);
      const k = reduced ? 1 : 1 - Math.pow(1 - speed, frames);
      current.x += dx * k;
      current.y += dy * k;

      const head = `translate3d(${current.x}px, ${current.y}px, 0)`;
      if (cursorRef.current) cursorRef.current.style.transform = head;
      if (glowRef.current) glowRef.current.style.transform = head;

      const kt = reduced ? 1 : 1 - Math.pow(1 - TRAIL_EASE, frames);
      let prev = current;
      for (let i = 0; i < TRAIL_COUNT; i++) {
        const pos = trail[i];

        // Ease toward the previous link, so the trail retracts into the cursor
        // once the pointer stops instead of leaving a worm lying on screen...
        pos.x += (prev.x - pos.x) * kt;
        pos.y += (prev.y - pos.y) * kt;

        // ...then clamp the link length, so the line can never pull apart into
        // separate dots however fast the pointer is thrown around.
        const lx = pos.x - prev.x;
        const ly = pos.y - prev.y;
        const gap = Math.sqrt(lx * lx + ly * ly);
        const maxGap = TRAIL_DOTS[i].segment;
        if (gap > maxGap) {
          const shrink = maxGap / gap;
          pos.x = prev.x + lx * shrink;
          pos.y = prev.y + ly * shrink;
        }

        const el = trailRefs.current[i];
        if (el) el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
        prev = pos;
      }

      const tail = trail[TRAIL_COUNT - 1];
      const settled =
        Math.abs(dx) < 0.1 &&
        Math.abs(dy) < 0.1 &&
        Math.abs(target.x - tail.x) < 0.1 &&
        Math.abs(target.y - tail.y) < 0.1;

      // Park the loop once everything has caught up — idle CPU drops to zero.
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

    const setVisible = (value) => {
      const flag = String(value);
      cursorRef.current?.setAttribute("data-visible", flag);
      trailsRef.current?.setAttribute("data-visible", flag);
    };

    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;

      if (!primed) {
        primed = true;
        current.x = target.x;
        current.y = target.y;
        for (const pos of trail) {
          pos.x = target.x;
          pos.y = target.y;
        }
        setVisible(true);
      }
      wake();
    };

    // pointerover only fires when the element under the pointer changes, so
    // hover detection costs nothing while the pointer moves within one element.
    // The old code ran document.elementFromPoint() on every mousemove instead.
    const onOver = (e) => {
      const el = e.target instanceof Element ? e.target : null;

      const nextMode = !el
        ? "default"
        : el.closest(LINK_SELECTOR)
        ? "link"
        : el.closest(SOFT_SELECTOR)
        ? "soft"
        : "default";
      const nextGlow = !!el?.closest("#projects-grid");

      if (nextMode !== mode) {
        const cursor = cursorRef.current;
        if (cursor) {
          if (nextMode === "link") cursor.dataset.icon = "in";
          else if (mode === "link") cursor.dataset.icon = "out";
          cursor.dataset.mode = nextMode;
        }
        mode = nextMode;
      }
      if (nextGlow !== glowOn) {
        glowOn = nextGlow;
        glowRef.current?.setAttribute("data-glow", String(glowOn));
      }
    };

    const setDown = (value) => cursorRef.current?.setAttribute("data-down", String(value));
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);
    const onEnter = () => primed && setVisible(true);
    const onLeave = () => setVisible(false);

    const onVisibility = () => {
      if (document.hidden) {
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
      } else {
        wake();
      }
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("pointerup", onUp, { passive: true });
    root.addEventListener("pointerenter", onEnter);
    root.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerup", onUp);
      root.removeEventListener("pointerenter", onEnter);
      root.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      delete root.dataset.cursor;
    };
  }, [enabled]);

  if (!enabled) return null;

  // Rendered once and then never re-rendered — every visual state change after
  // mount goes through data-attributes and CSS.
  return (
    <>
      <div ref={glowRef} className="cursor-glow" data-glow="false" aria-hidden="true" />

      <div ref={trailsRef} className="cursor-trails" data-visible="false" aria-hidden="true">
        {TRAIL_DOTS.map((dot, i) => (
          <span
            key={i}
            ref={(el) => {
              trailRefs.current[i] = el;
            }}
            className="cursor-trail"
            style={dot.style}
          />
        ))}
      </div>

      <div
        ref={cursorRef}
        className="cursor-layer"
        data-mode="default"
        data-visible="false"
        data-down="false"
        aria-hidden="true"
      >
        <div className="cursor-box">
          <span className="cursor-icon cursor-icon-arrow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.175 13H5q-.425 0-.712-.288T4 12t.288-.712T5 11h11.175l-4.9-4.9q-.3-.3-.288-.7t.313-.7q.3-.275.7-.288t.7.288l6.6 6.6q.15.15.213.325t.062.375t-.062.375t-.213.325l-6.6 6.6q-.275.275-.687.275T11.3 19.3q-.3-.3-.3-.712t.3-.713z" />
            </svg>
          </span>
          <span className="cursor-icon cursor-icon-plus">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 12H20M12 4V20" />
            </svg>
          </span>
        </div>
      </div>
    </>
  );
}
