"use client";
import FloatingSkill from "@/components/FloatingSkill";
import HoverMeSVG from "@/components/HoverMeSVG";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getVersions } from "@/lib/versions";

export default function Home() {
  const versions = getVersions();
  const [skillsHover, setSkillsHover] = useState(false);

  const skillsData = [
    { label: "HTML", icon: "/icons/html.svg", x: -120, y: 35, r: -10 },
    { label: "CSS", icon: "/icons/css.svg", x: -100, y: -10, r: -5 },
    { label: "Tailwind", icon: "/icons/tailwind.svg", x: -100, y: -50, r: 0 },
    { label: "Python", icon: "/icons/python.svg", x: -115, y: 75, r: -10 },
    { label: "Swift", icon: "/icons/swift.svg", x: -100, y: -95, r: 0 },
    { label: "JS", icon: "/icons/js.svg", x: 80, y: -60, r: 0 },
    { label: "Kotlin", icon: "/icons/kotlin.svg", x: 80, y: -105, r: 0 },
    { label: "Next", icon: "/icons/nextjs.svg", x: 85, y: -20, r: 5 },
    { label: "PHP", icon: "/icons/php.svg", x: 95, y: 20, r: 10 },
    { label: "Java", icon: "/icons/java.svg", x: 110, y: 60, r: 10 },
  ];

  const [showTitle, setShowTitle] = useState(false);
  const [showSocials, setShowSocials] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [showBtns, setShowBtns] = useState(false);
  const [showMade, setShowMade] = useState(false);

  useEffect(() => {
    setTimeout(() => { setShowTitle(true) }, 100);
    setTimeout(() => { setShowSocials(true) }, 300);
    setTimeout(() => { setShowSkills(true) }, 500);
    setTimeout(() => { setShowBtns(true) }, 700);
    setTimeout(() => { setShowMade(true) }, 900);
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center bg-[var(--background)] text-[var(--foreground)] overflow-hidden">
      <div className="flex flex-col md:flex-row items-center gap-16">
        <div className="font-bold">
          <div className={`${showTitle ? "opacity-100 translate-y-0 blur-none" : "opacity-0 -translate-y-12 blur-[8px]"} duration-800`}>
            <h1 className="text-4xl text-left">
              Hi, I'm <span className="title font-black text-purple-500">xKotelek</span>
            </h1>
            <h2 className="text-2xl">Frontend & backend developer</h2>
          </div>

          <div className={`${showSocials ? "opacity-100 translate-y-0 blur-none" : "opacity-0 -translate-y-12 blur-[8px]"} duration-800 flex mt-2.5 gap-4`}>
            <Link target="_blank" href="https://discord.com/users/803159847641284640" className="group flex justify-center items-center w-16 h-16 rounded-full bg-purple-700/25 hover:bg-purple-700/50 duration-300 border border-purple-700">
              <Image className="group-hover:scale-125 duration-300" src="/icons/social/discord.svg" width={28} height={28} alt="Discord"/>
            </Link>
            <Link target="_blank" href="https://github.com/xKotelek" className="group flex justify-center items-center w-16 h-16 rounded-full bg-purple-700/25 hover:bg-purple-700/50 duration-300 border border-purple-700">
              <Image className="group-hover:scale-125 duration-300" src="/icons/social/github.svg" width={28} height={28} alt="Github"/>
            </Link>
            <Link target="_blank" href="https://youtube.com/@xKotelek" className="group flex justify-center items-center w-16 h-16 rounded-full bg-purple-700/25 hover:bg-purple-700/50 duration-300 border border-purple-700">
              <Image className="group-hover:scale-125 duration-300" src="/icons/social/youtube.svg" width={28} height={28} alt="YouTube"/>
            </Link>
          </div><br/>
          <div className={`${showBtns ? "opacity-100 translate-y-0 blur-none" : "opacity-0 -translate-y-12 blur-[8px]"} duration-800 flex gap-2`}>
            <Link className="px-4 py-2 bg-purple-700/25 hover:scale-110 hover:bg-purple-700/50 duration-300 border border-purple-700 rounded-2xl" href="/projects">My Projects</Link>
            <Link className="px-4 py-2 bg-purple-700/25 hover:scale-110 hover:bg-purple-700/50 duration-300 border border-purple-700 rounded-2xl" href="https://status.kotelek.dev" target="_blank">Status</Link>
            <Link className="px-4 py-2 bg-purple-700/25 hover:scale-110 hover:bg-purple-700/50 duration-300 border border-purple-700 rounded-2xl" href="/contact">Contact</Link>
          </div>
          <h3 className={`${showMade ? "opacity-100 translate-y-0 blur-none" : "opacity-0 -translate-y-12 blur-[8px]"} duration-800 mt-2 font-normal text-gray-500`}>
            This website is made in <Link href="https://nextjs.org/" target="_blank" className="text-purple-300 hover:text-purple-400 duration-300">Next.js</Link> v{versions.next} with <Link href="https://tailwindcss.com/" target="_blank" className="text-purple-300 hover:text-purple-400 duration-300">TailwindCSS</Link> v{versions.tailwind}
          </h3>
        </div>

        <div
          className={`${showSkills ? "opacity-100 translate-y-0 blur-none" : "opacity-0 -translate-y-12 blur-[8px]"} duration-800 skills relative w-64 h-64 group`}
          onMouseEnter={() => setSkillsHover(true)}
          onMouseLeave={() => setSkillsHover(false)}
        >
          <HoverMeSVG />

          <div className="group-hover:scale-110 duration-300 w-full h-full rounded-full overflow-hidden relative z-10">
            <Image
              src="/memoji.png"
              width={256}
              height={256}
              alt="memoji"
              className="rounded-full scale-75 md:scale-100"
            />
          </div>

          {skillsData.map((skill, i) => (
            <FloatingSkill
              key={i}
              label={skill.label}
              icon={skill.icon}
              x={skill.x}
              y={skill.y}
              r={skill.r}
              visible={skillsHover}
              index={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
