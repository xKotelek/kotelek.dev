"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

const TRAIL_COUNT = 5;

export default function CursorComponent() {
  const cursorRef = useRef(null);
  const trailRefs = useRef([]);
  const glowRef = useRef(null);

  const isClickedRef = useRef(false);
  const isOverProjectsGridRef = useRef(false);

  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isOverSkills, setIsOverSkills] = useState(false);
  const [isOverLink, setIsOverLink] = useState(false);
  const [isOverProject, setIsOverProject] = useState(false);

  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const trailPositions = useRef(
    Array.from({ length: TRAIL_COUNT }, () => ({ x: 0, y: 0 }))
  );

  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);

    if (isTouch) return; // nie uruchamiaj logiki na mobilkach

    const onMouseMove = (e) => {
      targetPos.current = { x: e.clientX, y: e.clientY };

      const el = document.elementFromPoint(e.clientX, e.clientY);
      setIsOverSkills(!!el?.closest(".skills"));
      setIsOverLink(!!el?.closest("a"));
      setIsOverProject(!!el?.closest(".project"));
      isOverProjectsGridRef.current = !!el?.closest("#projects-grid");
    };

    const handleMouseDown = () => {
      isClickedRef.current = true;
    };
    const handleMouseUp = () => {
      isClickedRef.current = false;
    };

    const animate = () => {
      const { x: tx, y: ty } = targetPos.current;
      const { x: cx, y: cy } = currentPos.current;

      const dx = tx - cx;
      const dy = ty - cy;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const speed = 0.2 + Math.min(distance / 150, 0.4);

      currentPos.current.x += dx * speed;
      currentPos.current.y += dy * speed;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px) translate(-50%, -50%) scale(${isClickedRef.current ? 1.25 : 1})`;
      }

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${currentPos.current.x - 100}px, ${currentPos.current.y - 100}px)`;
        glowRef.current.style.opacity = isOverProjectsGridRef.current ? "1" : "0";
      }

      trailPositions.current.forEach((pos, i) => {
        const prev = i === 0 ? currentPos.current : trailPositions.current[i - 1];
        const dx = prev.x - pos.x;
        const dy = prev.y - pos.y;
        pos.x += dx * 0.2;
        pos.y += dy * 0.2;

        const el = trailRefs.current[i];
        if (el) {
          el.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
        }
      });

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Blur glow */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 z-[0] w-[200px] h-[200px] rounded-full pointer-events-none bg-purple-500/25 backdrop-blur-[6px] blur-2xl transition-opacity duration-300"
        style={{ opacity: 0 }}
        aria-hidden="true"
      />

      {/* Cursor */}
      <div
        ref={cursorRef}
        className={`fixed pointer-events-none z-[9999] select-none bg-purple-700 duration-150
          flex items-center justify-center font-bold text-purple-100 leading-none ease-out origin-center
          ${
            isOverSkills || isOverLink || isOverProject
              ? "w-6 h-6 rounded-xl text-xl"
              : "w-3 h-3 rounded-full text-0"
          }
        `}
        style={{
          transition:
            "transform 0.1s ease-out, width 0.2s ease, height 0.2s ease, background-color 0.2s ease, scale 0.2s ease",
        }}
        aria-hidden="true"
      >
        {isOverLink ? (
          <Image src="/icons/arrow.svg" width={24} height={24} alt="arrow" />
        ) : isOverSkills || isOverProject ? (
          <span>+</span>
        ) : null}
      </div>

      {/* Trail */}
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) trailRefs.current[i] = el;
          }}
          className="fixed pointer-events-none z-[9998] w-2 h-2 rounded-full bg-purple-500 opacity-75 blur-sm"
          style={{ transition: "transform 0.1s ease-out" }}
        />
      ))}
    </>
  );
}
