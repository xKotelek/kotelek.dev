import Link from "next/link";
import Image from "next/image";
import TiltGroup from "@/components/TiltGroup";

const PROJECTS = [
  {
    title: "quickshop",
    description: "is a free item-shop maker.",
    href: "https://quickshop.kotelek.dev",
    image: "/projects/quickshop.png",
    icons: [
      "/icons/nextjs.svg",
      "/icons/tailwind.svg",
      "/icons/prisma.svg",
      "/icons/postgresql.svg",
      "/icons/stripe.svg",
    ],
  },
  {
    title: "quickpay",
    description: "is a free server-shop maker and payment gate.",
    href: "https://quickpay.kotelek.dev",
    image: "/projects/quickpay.png",
    icons: [
      "/icons/nextjs.svg",
      "/icons/tailwind.svg",
      "/icons/prisma.svg",
      "/icons/postgresql.svg",
      "/icons/stripe.svg",
    ],
  },
  {
    title: "ToDo!",
    description: "is an open-source task list.",
    href: "https://todo.kotelek.dev",
    image: "/projects/todo.png",
    icons: ["/icons/php.svg", "/icons/js2.svg", "/icons/html.svg", "/icons/css.svg"],
  },
  {
    title: "mbio",
    description: "is a free bio page maker.",
    href: "https://mbio.kotelek.dev",
    image: "/projects/mbio.png",
    icons: ["/icons/nextjs.svg", "/icons/tailwind.svg"],
  },
];

export default function Projects() {
  return (
    <div className="w-full min-h-dvh flex items-center justify-center bg-[var(--background)] text-[var(--foreground)]">
      <div className="text-center flex flex-col items-center justify-center gap-6 w-full">
        <h1 className="reveal text-4xl font-black text-purple-500">xKotelek</h1>
        <h2 className="reveal text-2xl font-bold" style={{ "--d": "120ms" }}>
          My Projects
        </h2>

        <TiltGroup
          id="projects-grid"
          className="grid grid-rows-auto md:grid-rows-2 grid-cols-1 md:grid-cols-2 max-h-88 md:max-h-120 min-w-22 overflow-y-auto overflow-x-hidden p-5 gap-3"
        >
          {PROJECTS.map((project, i) => (
            <div
              key={project.title}
              className="reveal h-full"
              style={{ "--d": `${240 + Math.floor(i / 2) * 120}ms` }}
            >
              <div
                data-tilt
                className="tilt project z-[1] flex flex-col gap-1 bg-[#15151550] hover:shadow-xl border border-[#222] p-5 rounded-2xl w-full h-full transition-[box-shadow] duration-700 ease-out"
              >
                <div>
                  <div className="flex justify-between items-center w-full">
                    <div className="flex items-center gap-2">
                      <Image
                        src={project.image}
                        width={64}
                        height={64}
                        alt={project.title}
                        className="rounded-full"
                      />
                      <span className="font-black text-xl">{project.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {project.icons.map((icon) => (
                        <Image key={icon} src={icon} width={32} height={32} alt="" />
                      ))}
                    </div>
                  </div>
                  <div className="text-left pl-2">
                    <b>{project.title}</b> {project.description}
                  </div>
                </div>
                <Link
                  href={project.href}
                  target="_blank"
                  className="mt-auto w-full px-4 py-2 bg-purple-700/50 hover:bg-purple-700/75 duration-300 border border-purple-700 font-bold rounded-xl"
                >
                  Check out!
                </Link>
              </div>
            </div>
          ))}
        </TiltGroup>

        <div className="reveal flex justify-center items-center" style={{ "--d": "500ms" }}>
          <Link
            className="px-4 py-2 font-bold bg-purple-700/25 hover:scale-110 hover:bg-purple-700/50 duration-300 border border-purple-700 rounded-2xl"
            href="/"
          >
            Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
