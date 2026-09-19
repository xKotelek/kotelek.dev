import SkillsOrbit from "@/components/SkillsOrbit";
import Link from "next/link";
import Image from "next/image";
import { getVersions } from "@/lib/versions";

const SOCIALS = [
  {
    href: "https://discord.com/users/803159847641284640",
    icon: "/icons/social/discord.svg",
    label: "Discord",
  },
  { href: "https://github.com/xKotelek", icon: "/icons/social/github.svg", label: "Github" },
  { href: "https://youtube.com/@xKotelek", icon: "/icons/social/youtube.svg", label: "YouTube" },
];

const LINKS = [
  { href: "/projects", label: "My Projects", external: false },
  { href: "https://status.kotelek.dev", label: "Status", external: true },
  { href: "/contact", label: "Contact", external: false },
];

export default function Home() {
  const versions = getVersions();

  return (
    <div className="w-full min-h-dvh flex justify-center items-center bg-[var(--background)] text-[var(--foreground)] px-5 py-12">
      <div className="flex w-full max-w-5xl flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8">
        <div className="font-bold min-w-0">
          <div className="reveal">
            <h1 className="text-4xl text-left">
              Hi, I&apos;m <span className="title font-black text-purple-500">xKotelek</span>
            </h1>
            <h2 className="text-2xl">Frontend &amp; backend developer</h2>
          </div>

          <div className="reveal flex mt-2.5 gap-4" style={{ "--d": "120ms" }}>
            {SOCIALS.map((social) => (
              <Link
                key={social.label}
                target="_blank"
                href={social.href}
                aria-label={social.label}
                className="group flex justify-center items-center w-16 h-16 rounded-full bg-purple-700/25 hover:bg-purple-700/50 duration-300 border border-purple-700"
              >
                <Image
                  className="group-hover:scale-125 duration-300"
                  src={social.icon}
                  width={28}
                  height={28}
                  alt={social.label}
                />
              </Link>
            ))}
          </div>

          <div className="reveal flex gap-2 mt-6" style={{ "--d": "240ms" }}>
            {LINKS.map((link) => (
              <Link
                key={link.href}
                className="px-4 py-2 bg-purple-700/25 hover:scale-110 hover:bg-purple-700/50 duration-300 border border-purple-700 rounded-2xl"
                href={link.href}
                {...(link.external ? { target: "_blank" } : {})}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <h3
            className="reveal mt-2 font-normal text-gray-500"
            style={{ "--d": "360ms" }}
          >
            This website is made in{" "}
            <Link
              href="https://nextjs.org/"
              target="_blank"
              className="text-purple-300 hover:text-purple-400 duration-300"
            >
              Next.js
            </Link>{" "}
            v{versions.next} with{" "}
            <Link
              href="https://tailwindcss.com/"
              target="_blank"
              className="text-purple-300 hover:text-purple-400 duration-300"
            >
              TailwindCSS
            </Link>{" "}
            v{versions.tailwind}
          </h3>
        </div>

        <div className="reveal shrink-0 max-w-full" style={{ "--d": "180ms" }}>
          <SkillsOrbit />
        </div>
      </div>
    </div>
  );
}
