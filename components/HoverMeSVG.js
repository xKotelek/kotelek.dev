"use client";
import { useEffect, useState } from "react";

const HOVER_TEXT =
  "HOVER ME • HOVER ME • HOVER ME • HOVER ME • HOVER ME • HOVER ME • HOVER ME • HOVER ME •";
const TAP_TEXT =
  "CLICK ME • CLICK ME • CLICK ME • CLICK ME • CLICK ME • CLICK ME • CLICK ME • CLICK ME •";

export default function HoverMeSVG({ staticLabel = false }) {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    const sync = () => setIsTouch(mq.matches);

    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <svg
      viewBox="0 0 300 300"
      className="hover-ring absolute w-full h-full animate-spin-slow"
      aria-hidden="true"
    >
      <defs>
        <path
          id="circlePath"
          d="M 150, 150
             m -120, 0
             a 120,120 0 1,1 240,0
             a 120,120 0 1,1 -240,0"
        />
      </defs>
      <text
        className="hover-ring-label"
        data-active={!staticLabel}
        fill="#a855f7"
        fontSize={isTouch ? "16.9" : "15.6"}
        fontWeight="bold"
      >
        <textPath href="#circlePath" startOffset="0%">
          {isTouch ? TAP_TEXT : HOVER_TEXT}
        </textPath>
      </text>
      <text
        className="hover-ring-label"
        data-active={staticLabel}
        fill="#a855f7"
        fontSize={isTouch ? "16.9" : "15.6"}
        fontWeight="bold"
      >
        <textPath href="#circlePath" startOffset="0%">
          {"MY SKILLS • ".repeat(9)}
        </textPath>
      </text>
    </svg>
  );
}
