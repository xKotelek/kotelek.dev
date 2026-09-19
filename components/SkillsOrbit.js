"use client";
import Image from "next/image";
import { useState } from "react";
import FloatingSkill from "@/components/FloatingSkill";
import HoverMeSVG from "@/components/HoverMeSVG";
import useMediaQuery from "@/components/useMediaQuery";

const SKILLS = [
  { label: "HTML", icon: "/icons/html.svg" },
  { label: "CSS", icon: "/icons/css.svg" },
  { label: "Tailwind", icon: "/icons/tailwind.svg" },
  { label: "Python", icon: "/icons/python.svg" },
  { label: "Prisma", icon: "/icons/prisma.svg" },
  { label: "Stripe", icon: "/icons/stripe.svg" },
  { label: "Swift", icon: "/icons/swift.svg" },
  { label: "JS", icon: "/icons/js.svg" },
  { label: "PostgreSQL", icon: "/icons/postgresql.svg" },
  { label: "PHP", icon: "/icons/php.svg" },
  { label: "Kotlin", icon: "/icons/kotlin.svg" },
  { label: "Next", icon: "/icons/nextjs.svg" },
  { label: "Java", icon: "/icons/java.svg" },
];

// Keep the stagger short even when more skills are added.
const STAGGER_WINDOW = 260;
const staggerFor = (i) => Math.round((i * STAGGER_WINDOW) / Math.max(SKILLS.length - 1, 1));

export default function SkillsOrbit() {
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const open = reduced || hovered || pinned;

  return (
    <div
      className="skills"
      data-open={open}
      onPointerEnter={(e) => e.pointerType !== "touch" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <button
        type="button"
        className="skills-toggle"
        aria-label={reduced ? "My skills" : "Toggle skills orbit"}
        aria-expanded={open}
        aria-controls="skills-list"
        aria-disabled={reduced}
        onClick={() => !reduced && setPinned((value) => !value)}
      >
        <HoverMeSVG staticLabel={open} />
        <div className="memoji-wrap w-full h-full rounded-full overflow-hidden relative z-10">
          <Image
            src="/memoji.png"
            width={256}
            height={256}
            alt="xKotelek's memoji"
            priority
            className="rounded-full"
          />
        </div>
      </button>
      <ul id="skills-list" className="skills-list" aria-label="Skills" aria-hidden={!open}>
        {SKILLS.map((skill, i) => (
          <FloatingSkill
            key={skill.label}
            {...skill}
            angle={(i * 360) / SKILLS.length - 90}
            delay={staggerFor(i)}
          />
        ))}
      </ul>
    </div>
  );
}
