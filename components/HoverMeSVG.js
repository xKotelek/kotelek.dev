"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    async function detectDevice() {
      try {
        const res = await fetch("/api/isMobile");
        const data = await res.json();
        setIsMobile(data.isMobile);
      } catch(e) {
        console.error("Error fetching device type: ", e);
      }
    }

    detectDevice();
  }, []);

  const text = isMobile
    ? "CLICK ME • CLICK ME • CLICK ME • CLICK ME • CLICK ME • CLICK ME • CLICK ME • CLICK ME •"
    : "HOVER ME • HOVER ME • HOVER ME • HOVER ME • HOVER ME • HOVER ME • HOVER ME • HOVER ME •";

  const fontSize = isMobile
    ? "16.8"
    : "15.6"

  return (
    <svg
      viewBox="0 0 300 300"
      className="absolute w-full h-full duration-800 animate-spin-slow group-hover:animate-paused scale-100 group-hover:scale-0"
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
      <text fill="#a855f7" fontSize={fontSize} fontWeight="bold">
        <textPath href="#circlePath" startOffset="0%">
          {text}
        </textPath>
      </text>
    </svg>
  );
}
