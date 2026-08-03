"use client";
import Image from "next/image";
import { useState } from "react";
import FloatingSkill from "@/components/FloatingSkill";
import HoverMeSVG from "@/components/HoverMeSVG";

const SKILLS = [
  { label: "HTML", icon: "/icons/html.svg", x: -120, y: 35, r: -10 },
  { label: "CSS", icon: "/icons/css.svg", x: -100, y: -10, r: -5 },
  { label: "Tailwind", icon: "/icons/tailwind.svg", x: -100, y: -50, r: 0 },
  { label: "Python", icon: "/icons/python.svg", x: -115, y: 75, r: -10 },
  { label: "Prisma", icon: "/icons/prisma.svg", x: -125, y: 115, r: -10 },
  { label: "Stripe", icon: "/icons/stripe.svg", x: -75, y: -135, r: 5 },
  { label: "Swift", icon: "/icons/swift.svg", x: -100, y: -95, r: 0 },
  { label: "JS", icon: "/icons/js.svg", x: 80, y: -60, r: 0 },
  { label: "Kotlin", icon: "/icons/kotlin.svg", x: 80, y: -105, r: 0 },
  { label: "Next", icon: "/icons/nextjs.svg", x: 85, y: -20, r: 5 },
  { label: "PHP", icon: "/icons/php.svg", x: 95, y: 20, r: 10 },
  { label: "Java", icon: "/icons/java.svg", x: 110, y: 60, r: 10 },
  { label: "PostgreSQL", icon: "/icons/postgresql.svg", x: 145, y: 100, r: 10 },
];

// The whole orbit finishes opening in a fixed window no matter how many skills
// are in the list. A per-item delay (index * 100ms) stretched the reveal every
// time a skill was added, so the last chips only landed ~1.8s after hover.
const STAGGER_WINDOW = 900;
const staggerFor = (i) => Math.round((i * STAGGER_WINDOW) / Math.max(SKILLS.length - 1, 1));

export default function SkillsOrbit() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="skills relative w-64 h-64"
      data-open={open}
      onPointerEnter={(e) => e.pointerType !== "touch" && setOpen(true)}
      onPointerLeave={(e) => e.pointerType !== "touch" && setOpen(false)}
      onPointerDown={(e) => e.pointerType === "touch" && setOpen((v) => !v)}
    >
      <HoverMeSVG />

      <div className="memoji-wrap w-full h-full rounded-full overflow-hidden relative z-10">
        <Image
          src="/memoji.png"
          width={256}
          height={256}
          alt="memoji"
          priority
          className="rounded-full scale-75 md:scale-100"
        />
      </div>

      {SKILLS.map((skill, i) => (
        <FloatingSkill key={skill.label} {...skill} delay={staggerFor(i)} />
      ))}
    </div>
  );
}
